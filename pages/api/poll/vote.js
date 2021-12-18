import admin from "@lib/firebaseAdmin";
import { dateExpired } from "@lib/healper";
import { verifyToken } from "@lib/jwt";
import { getCookie } from "cookies-next";

const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "POST") {
    const { poll, selectedOptions } = req.body;
    const token = getCookie("token", { req, res });

    if (!poll || !selectedOptions?.length) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
      });
    }
    if (!token) {
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

      const userRecord = verifyToken(token);

      if (!userRecord) {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid token!",
        });
      }

      if (!pollData.data().active) {
        return res.status(500).json({
          statusCode: 500,
          message: "Sorry voting is closed!",
        });
      }

      if (!pollData.data().id == userRecord.pollId) {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid token!",
        });
      }

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

      if (pollData.data().allowMultiSelect) {
        if (selectedOptions.length > pollData.data().choicesLimit) {
          return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong!",
          });
        }
      } else {
        if (selectedOptions.length > 1) {
          return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong!",
          });
        }
      }

      if (pollData.data().endDate) {
        const endDate = new Date(pollData.data().endDate);
        const today = new Date();
        if (dateExpired(endDate, today)) {
          return res.status(500).json({
            statusCode: 500,
            message: "Sorry voting is closed!",
          });
        }
      }

      const batch = db.batch();
      selectedOptions.forEach((option) =>
        batch.update(pollRef, {
          [`votes.${option}`]: admin.firestore.FieldValue.increment(1),
          totalVotes: admin.firestore.FieldValue.increment(1),
        })
      );
      batch.update(pollRef, {
        voters: admin.firestore.FieldValue.arrayUnion(userRecord.email),
      });
      batch.update(aggregationRef, {
        totalVotes: admin.firestore.FieldValue.increment(1),
      });

      await batch.commit();
      return res.status(200).json({
        statusCode: 200,
        message: "Thanks for your vote!",
      });
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
