import { sendViaGmail } from "@lib/gmail";

export default async (req, res) => {
  if (req.method === "GET") {
    const res = await sendViaGmail(
      "avikhandakar@gmail.com",
      "Test mail",
      "Test"
    );
    if (res) {
      return res.status(200).json({
        statusCode: 200,
        message: "Send mail successfully!",
      });
    } else {
      return res.status(500).json({
        statusCode: 500,
        message: "Failed",
      });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
