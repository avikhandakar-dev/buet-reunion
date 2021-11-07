import { sendViaGmail } from "@lib/gmail";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;
    if (!email || !subject || !message) {
      return res.status(500).json({
        statusCode: 500,
        message: "Can't send email. Invalid data!",
      });
    }
    try {
      await sendViaGmail(email, subject, message);
      return res.status(200).json({
        statusCode: 200,
        message: "Send mail successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Can't send email!",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
