import admin from "@lib/firebaseAdmin";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token, uid } = req.body;
    // let user = null;
    // try {
    //   const decodedToken = await admin.auth().verifyIdToken(token);
    //   user = decodedToken;
    // } catch (error) {
    //   return res.status(400).json({ error: "Invalid user!" });
    // }
    admin
      .auth()
      .setCustomUserClaims(uid, { admin: true })
      .then(() => {
        return res.status(200).json({ message: "Success!" });
      });
  } else {
    return res.status(400).json({ error: "Bad request!" });
  }
};
