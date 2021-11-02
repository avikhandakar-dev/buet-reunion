import { sendViaGmail } from "@lib/gmail";
import sgMail from "@lib/sendgrid";

export default async (req, res) => {
  if (req.method === "POST") {
    const { attachment, email } = req.body;
    if (!attachment || !email) {
      return res.status(500).json({
        statusCode: 500,
        message: "Can't send email. Invalid data!",
      });
    }
    const msg = {
      to: email,
      from: "Buetian 89 NA <buetian89@gmail.com>",
      subject: "Thank you for your donation",
      html: `
        <p>Thank you for your donation. Attached is the donation receipt you can use for tax deduction.</p>
      `,
      attachments: [
        {
          content: attachment.replace(
            "data:application/octet-stream;base64,",
            ""
          ),
          filename: "Receipt.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    try {
      if (msg.to.includes("yahoo.com")) {
        await sendViaGmail(msg.to, msg.subject, msg.html, msg.attachments);
      } else {
        await sgMail.send(msg);
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Send mail successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
