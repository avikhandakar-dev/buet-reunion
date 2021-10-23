import { firestoreToJSON } from "@lib/firebase";
import admin from "@lib/firebaseAdmin";
import { verifyToken } from "@lib/jwt";
import { getCookie } from "cookies-next";

const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "POST") {
    const { uid, pollId } = req.body;
    const token = getCookie("token", { req, res });
    if (!pollId) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
      });
    }
    if (!uid && !token) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid user!",
      });
    }

    try {
      const pollRef = db.collection("polls").doc(pollId);
      const pollData = await pollRef.get();
      if (!pollData.exists) {
        return res.status(500).json({
          statusCode: 500,
          message: "Poll not found!",
        });
      }
      let userRecord = null;
      if (uid) {
        userRecord = await admin.auth().getUser(uid);
      } else if (token) {
        userRecord = verifyToken(token);
      }
      if (!userRecord) {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid user!",
        });
      }
      if (uid) {
        if (!userRecord.customClaims?.member) {
          return res.status(500).json({
            statusCode: 500,
            message: "Access denied!",
          });
        }
      }
      if (pollData.data().voters?.includes(userRecord.email)) {
        return res.status(200).json({
          statusCode: 200,
          poll: pollData.data(),
        });
      } else {
        return res.status(500).json({
          statusCode: 500,
          message: "Access denied!",
        });
      }
    } catch (error) {
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
