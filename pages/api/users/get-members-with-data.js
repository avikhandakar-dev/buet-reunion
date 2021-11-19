import admin from "@lib/firebaseAdmin";

const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    let user = null;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      user = decodedToken;
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid user!",
      });
    }
    if (user.member === true || user.admin === true) {
      try {
        const allUsers = await admin.auth().listUsers();
        let data = [];
        if (allUsers) {
          const members = allUsers.users.filter((user) => {
            if (user.customClaims?.member) {
              return user;
            }
          });
          if (members) {
            const ref = db.collection("users");
            const usersData = (await ref.get()).docs;
            members.forEach((member) => {
              const profileData = usersData.find(
                (item) => item.data().email === member.email
              );
              data.push({ authData: member, profile: profileData?.data() });
            });
          }
        }
        return res.status(200).json({
          statusCode: 200,
          data,
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
