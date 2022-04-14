import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "lib/paypal";
import { nanoid } from "nanoid";

export default async function handle(req, res) {
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
  const PaypalClient = paypalClient();
  const request = new paypal.orders.OrdersCreateRequest();
  request.headers["prefer"] = "return=representation";
  request.requestBody({
    intent: "CAPTURE",
    payment_method: {
      payee_preferred: "UNRESTRICTED",
    },
    purchase_units: [
      {
        reference_id: nanoid(8),
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
  });
  const response = await PaypalClient.execute(request);
  if (response.statusCode !== 201) {
    return res.status(500).json({
      statusCode: 500,
      message: "Invalid data!",
    });
  }
  //Once order is created store the data using Prisma

  res.json({ orderID: response.result.id });
}
