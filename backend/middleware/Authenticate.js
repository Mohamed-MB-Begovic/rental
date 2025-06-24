import jwt from "jsonwebtoken";
import { JWT_SECRET  } from "../config/config.js";
export const Authenticate = (req, res, next) => {
  const token = req.cookies.token ;
  // console.log(" token is for " + token);
  if (!token) return res.status(403).send("Anuthorized access please login");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};