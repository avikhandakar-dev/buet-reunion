import Stripe from "stripe";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    return res.status(400).json({ error: "Bad request!" });
  }
};
