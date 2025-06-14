import { unAuthenticatedError } from "../Errors/index.js";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      throw new unAuthenticatedError(
        "You need to provide a token to access this routes"
      );

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
export default Authenticate;
