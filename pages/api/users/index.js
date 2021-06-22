import admin from "@lib/firebaseAdmin";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    let user = null;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      user = decodedToken;
    } catch (error) {
      return res.status(400).json({ error: "Invalid user!" });
    }
    if (user.admin === true) {
      try {
        const allUsers = await admin.auth().listUsers();
        console.log(allUsers);
        return res.status(200).json({ data: allUsers });
      } catch (error) {
        return res.status(500).json({ error: "Server error!" });
      }
    } else {
      return res.status(400).json({ error: "Access denied!" });
    }
  } else {
    return res.status(400).json({ error: "Bad request!" });
  }
};
