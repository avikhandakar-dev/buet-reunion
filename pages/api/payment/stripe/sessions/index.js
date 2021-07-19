import { formatAmountForStripe } from "@lib/healper";
import { nanoid } from "nanoid";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-03-02",
});
export default async (req, res) => {
  if (req.method === "POST") {
    const { amount, project, address } = req.body;
    if (!amount || !project || !address) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid amount or you dont select a project!",
      });
    }
    if (!address.anonymous) {
      if (!address.name || !address.email || !address.country) {
        return res
          .status(500)
          .json({ statusCode: 500, message: "Invalid address!" });
      }
    }
    try {
      const params = {
        submit_type: "donate",
        payment_method_types: ["card"],
        line_items: [
          {
            name: `${project.title}`,
            amount: formatAmountForStripe(amount, "usd"),
            currency: "usd",
            quantity: 1,
            ...(project.coverImage && {
              images: [project.coverImage.thumbDownloadUrl],
            }),
          },
        ],
        metadata: {
          id: nanoid(),
          projectId: project.id,
          ...address,
        },
        success_url: `${req.headers.origin}/donate/stripe/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
