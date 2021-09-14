import admin from "@lib/firebaseAdmin";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token, uid, role } = req.body;
    if (!uid || !token || !role) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
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
    if (requestedBy.admin === true) {
      try {
        await admin.auth().setCustomUserClaims(uid, { [role]: true });
        return res.status(200).json({
          statusCode: 200,
          message: "success",
        });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({
          statusCode: 500,
          message: err.message,
        });
      }
    } else {
      return res.status(500).json({
        statusCode: 500,
        message: "Access denied!",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
