import { firestoreToJSON } from "@lib/firebase";
import admin from "@lib/firebaseAdmin";

const db = admin.firestore();
export default async (req, res) => {
  if (req.method === "POST") {
    const { token, uid } = req.body;
    if (!token) {
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
        const donationsQuery = db
          .collection("donations")
          .where("donorInfo.uid", "==", requestedBy.uid);
        const donations = (await donationsQuery.get()).docs.map(
          firestoreToJSON
        );
        return res.status(200).json({
          statusCode: 200,
          data: donations,
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
