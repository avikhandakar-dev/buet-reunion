import admin from "@lib/firebaseAdmin";
import { superUser } from "./set-role";

export default async (req, res) => {
  if (req.method === "DELETE") {
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
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid user!",
      });
    }
    if (requestedBy.admin === true) {
      if (!superUser.includes(requestedBy.email)) {
        return res.status(500).json({
          statusCode: 500,
          message: "Access denied!",
        });
      }
      try {
        const userToDelete = await admin.auth().getUser(uid);
        if (userToDelete.email == requestedBy.email) {
          return res.status(500).json({
            statusCode: 500,
            message: "You can't delete yourself!",
          });
        }
        await admin.auth().deleteUser(uid);
        return res.status(200).json({
          statusCode: 200,
          message: "Success!",
        });
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Can't delete user!",
        });
      }
    } else {
      return res.status(500).json({
        statusCode: 500,
        message: "Access denied!",
      });
    }
  } else {
    res.setHeader("Allow", "DELETE");
    res.status(405).end("Method Not Allowed");
  }
};
