import admin from "@lib/firebaseAdmin";
import { verifyToken } from "@lib/jwt";
import { getCookie } from "cookies-next";

const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "POST") {
    const { uid, poll, selectedOptions } = req.body;
    const token = getCookie("token", { req, res });

    if (!poll || !selectedOptions?.length) {
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
      const pollRef = db.collection("polls").doc(poll.id);
      const aggregationRef = db.collection("aggregations").doc("polls");
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
      console.log(userRecord);

      if (pollData.data().voters?.includes(userRecord.email)) {
        return res.status(500).json({
          statusCode: 500,
          message: "You already voted on this poll!",
        });
      }

      if (pollData.data().access == "emails") {
        if (!pollData.data().whiteList?.includes(userRecord.email)) {
          return res.status(500).json({
            statusCode: 500,
            message: "You can't vote on this poll!",
          });
        }
      }

      if (pollData.data().access == "members") {
        if (!userRecord.customClaims?.member) {
          return res.status(500).json({
            statusCode: 500,
            message: "You can't vote on this poll!",
          });
        }
      }

      const batch = db.batch();
      selectedOptions.forEach((option) =>
        batch.update(pollRef, {
          [`votes.${option}`]: admin.firestore.FieldValue.increment(1),
          totalVotes: admin.firestore.FieldValue.increment(1),
          voters: admin.firestore.FieldValue.arrayUnion(userRecord.email),
        })
      );
      batch.update(aggregationRef, {
        totalVotes: admin.firestore.FieldValue.increment(1),
      });

      await batch.commit();
      res.status(200).json({ message: "Thanks for your vote!" });
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
