import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY;

export const createToken = (payload, duration = 2629746) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: duration });
  return token;
};

export function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
}
