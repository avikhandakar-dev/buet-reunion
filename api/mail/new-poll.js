import admin from "@lib/firebaseAdmin";
import { createToken } from "@lib/jwt";
import sgMail from "@lib/sendgrid";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token, emails, pollId, title } = req.body;
    if (!token || !emails || !pollId || !title) {
      return res.status(500).json({
        statusCode: 500,
        message: "Can't send email. Invalid data!",
      });
    }
    let requestedBy = null;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      requestedBy = decodedToken;
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid user!",
      });
    }
    if (!requestedBy.admin) {
      return res.status(500).json({
        statusCode: 500,
        message: "Access denied!",
      });
    }

    const messages = [];

    emails.forEach((email) => {
      const token = createToken({ email, pollId });
      messages.push({
        to: email,
        from: "Buetian 89 <buetian89@gmail.com>",
        subject: `${title} - vote now at buetian89na.org`,
        html: `
        <h1>${title}</h1> 
        <p>Please vote by clicking the following link.</p> 
        <div style="margin-bottom: 20px">
          <a style="padding:6px 16px; background:lightseagreen; color:white; border-radius: 4px; text-decoration: none; font-weight: 600" href="${process.env.BASE_URL}/poll/vote/${token}">Vote Now</a>
        </div>
        `,
      });
    });

    try {
      await sgMail.send(messages);
      return res.status(200).json({
        statusCode: 200,
        message: "Send mail successfully!",
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
