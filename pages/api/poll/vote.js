import admin from "@lib/firebaseAdmin";

const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "POST") {
    const { uid, poll, selectedOptions } = req.body;
    if (!uid || !poll || !selectedOptions?.length) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
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
      const userRecord = await admin.auth().getUser(uid);
      if (pollData.data().voters?.includes(userRecord.email)) {
        return res.status(500).json({
          statusCode: 500,
          message: "You already voted on this poll!",
        });
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
