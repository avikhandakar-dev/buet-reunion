import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-03-02",
});
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

      res.status(200).json(checkout_session);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
