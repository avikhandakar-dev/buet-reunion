import admin from "@lib/firebaseAdmin";

export default async (req, res) => {
  if (req.method === "POST") {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "Bad request!" });
    }
    try {
      const userRecord = await admin.auth().getUser(uid);
      console.log(userRecord);
      return res.status(200).json({ data: userRecord });
    } catch (error) {
      return res.status(400).json({ error: "Invalid user!" });
    }
  } else {
    return res.status(400).json({ error: "Bad request!" });
  }
};
