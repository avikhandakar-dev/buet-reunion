import admin from "@lib/firebaseAdmin";

const superUser = [
  "avikhandakar@gmail.com",
  "khmizan@yahoo.com",
  "shahnaz.afroz@gmail.com",
];
export default async (req, res) => {
  if (req.method === "POST") {
    const { token, uid, role, revoke } = req.body;
    if (!uid || !token || !role) {
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
        const userRecord = await admin.auth().getUser(uid);

        if (role == "admin") {
          if (!superUser.includes(requestedBy.email)) {
            return res.status(500).json({
              statusCode: 500,
              message: "Access denied!",
            });
          }

          if (userRecord.email == requestedBy.email) {
            return res.status(500).json({
              statusCode: 500,
              message:
                "You can't do this to youeself! Please contact other admin",
            });
          }

          if (!userRecord.customClaims?.member) {
            return res.status(500).json({
              statusCode: 500,
              message: "Only accepted member could be admin!",
            });
          }
        }

        const prevRole = userRecord.customClaims;
        prevRole[role] = revoke ? false : true;
        await admin.auth().setCustomUserClaims(uid, {
          ...prevRole,
        });
        return res.status(200).json({
          statusCode: 200,
          message: "success",
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
