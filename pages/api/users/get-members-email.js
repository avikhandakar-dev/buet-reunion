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
        let emails = [];
        if (allUsers) {
          const members = allUsers.users.filter((user) => {
            if (user.customClaims?.member) {
              return user;
            }
          });
          if (members) {
            members.forEach((member) => {
              emails.push(member.email);
            });
          }
        }
        emails.forEach((email) => {
          if (email.includes("yahoo.com")) {
            console.log(email);
          }
        });
        return res.status(200).json({
          statusCode: 200,
          emails,
        });
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: error.message,
        });
      }
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Access denied!",
      });
    }
  } else {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request!",
    });
  }
};
