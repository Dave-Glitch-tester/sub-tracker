import AppError from "./AppError.js";

class NotFound extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFound;
