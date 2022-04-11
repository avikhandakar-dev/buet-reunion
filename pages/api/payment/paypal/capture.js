import paypalClient from "@lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import admin from "@lib/firebaseAdmin";

const db = admin.firestore();
export default async function handle(req, res) {
  //Capture order to complete payment
  const { orderID, address, project } = req.body;
  if (!orderID || !address) {
    return res.status(500).json({
      statusCode: 500,
      message: "Invalid data!",
    });
  }
  const PaypalClient = paypalClient();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    res.status(500);
  }

  //   console.log(JSON.stringify(response.result, null, 4));

  if (response.result.status === "COMPLETED") {
    const id = response.result.id;
    const amount = Number(
      response.result.purchase_units[0].payments.captures[0].amount.value
    );
    const refId = response.result.purchase_units[0].reference_id;
    const payerEmail = response.result.payer.email_address;

    let uid = null;
    let name = null;
    let email = null;
    let country = null;
    if (!address.anonymous) {
      uid = address.uid || null;
      name = address.name || null;
      email = address.email || null;
      country = address.country || null;
    } else {
      email = payerEmail;
    }

    const data = {
      id: refId,
      amount: amount,
      projectId: project.id,
      sessionId: id,
      paymentMethod: "Paypal",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      projectInfo: {
        projectId: project.id,
        projectTitle: project.title,
      },
      donorInfo: {
        anonymous: address.anonymous ? true : false,
        uid,
        name,
        email,
        country,
      },
    };
    if (process.env.NODE_ENV === "production") {
      const donationRef = db.collection("donations").doc(refId);
      const donationData = await donationRef.get();
      if (!donationData.exists) {
        const batch = db.batch();
        batch.set(donationRef, {
          ...data,
        });

        const projectRef = db.collection("projects").doc(project.id);
        batch.update(projectRef, {
          raised: admin.firestore.FieldValue.increment(amount),
        });

        const aggregationRef = db.collection("aggregations").doc("donations");
        batch.update(aggregationRef, {
          total: admin.firestore.FieldValue.increment(amount),
        });

        if (uid) {
          const userRef = db.collection("users").doc(uid);
          batch.update(userRef, {
            totalDonation: admin.firestore.FieldValue.increment(amount),
          });
        }

        await batch.commit();
      }
    }

    console.log(data);
    return res.status(200).json({
      statusCode: 200,
      message: "Payment completed!",
      data: data,
    });
  } else {
    return res.status(500).json({
      statusCode: 500,
      message: "Payment failed!",
    });
  }
  // Update payment to PAID status once completed
}
