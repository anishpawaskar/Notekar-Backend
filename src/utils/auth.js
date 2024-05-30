import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHashPassword = async (password) => {
  return bcrypt.hash(password, parseInt(process.env.HASH_SALT_ROUND));
};

export const compareHashPassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const generateJwt = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "5h",
  });
  return token;
};

export const verifyJwt = (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
