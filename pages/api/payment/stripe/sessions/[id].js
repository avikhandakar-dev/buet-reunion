import Stripe from "stripe";
import admin from "@lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-03-02",
});
const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      if (!id.startsWith("cs_")) {
        throw Error("Incorrect CheckoutSession ID.");
      }
      const checkout_session = await stripe.checkout.sessions.retrieve(id, {
        expand: ["payment_intent"],
      });
      if (checkout_session.payment_intent?.status === "succeeded") {
        const sessionId = checkout_session.id;
        const donationId = checkout_session.metadata.id;
        const amount = (Number(checkout_session.amount_total) / 100).toFixed(2);
        const projectId = checkout_session.metadata.projectId;
        const projectTitle = checkout_session.metadata.projectTitle;
        const anonymous = checkout_session.metadata.anonymous;
        let uid = null;
        let name = null;
        let email = null;
        let country = null;
        if (anonymous === "false") {
          uid = checkout_session.metadata.uid || null;
          name = checkout_session.metadata.name || null;
          email = checkout_session.metadata.email || null;
          country = checkout_session.metadata.country || null;
        } else {
          email = checkout_session.customer_details?.email;
        }

        if (process.env.NODE_ENV === "production") {
          const donationRef = db.collection("donations").doc(donationId);
          const donationData = await donationRef.get();

          if (!donationData.exists) {
            const batch = db.batch();
            batch.set(donationRef, {
              id: donationId,
              amount: Number(amount),
              projectId,
              sessionId,
              paymentMethod: "Stripe",
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              projectInfo: {
                projectId,
                projectTitle,
              },
              donorInfo: {
                anonymous: anonymous === "true" ? true : false,
                uid,
                name,
                email,
                country,
              },
            });

            const projectRef = db.collection("projects").doc(projectId);
            batch.update(projectRef, {
              raised: admin.firestore.FieldValue.increment(Number(amount)),
            });

            const aggregationRef = db
              .collection("aggregations")
              .doc("donations");
            batch.update(aggregationRef, {
              total: admin.firestore.FieldValue.increment(Number(amount)),
            });

            if (uid) {
              const userRef = db.collection("users").doc(uid);
              batch.update(userRef, {
                totalDonation: admin.firestore.FieldValue.increment(
                  Number(amount)
                ),
              });
            }

            await batch.commit();
          }
        }
      }

      res.status(200).json(checkout_session);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
