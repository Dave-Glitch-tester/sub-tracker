import AppError from "./AppError.js";

class unAuthenticatedError extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default unAuthenticatedError;
