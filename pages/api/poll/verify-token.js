import { verifyToken } from "@lib/jwt";
import { setCookies } from "cookies-next";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    if (!token) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
      });
    }
    try {
      const decodedToken = verifyToken(token);
      if (decodedToken) {
        setCookies("token", token, { req, res, maxAge: 2629746 });
        return res.status(200).json({
          statusCode: 200,
          pollId: decodedToken.pollId,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid token!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong!",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
