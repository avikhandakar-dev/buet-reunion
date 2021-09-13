import admin from "@lib/firebaseAdmin";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token, uid } = req.body;
    if (!uid || !token) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
      });
    }
    let requestedBy = null;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      requestedBy = decodedToken;
      console.log("admin : ", requestedBy);
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid user!",
      });
    }
    if (requestedBy.admin === true) {
      try {
        const userRecord = await admin.auth().getUser(uid);
        console.log(userRecord);
        return res.status(200).json({
          statusCode: 200,
          data: userRecord,
        });
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "User not found!",
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
