// import AppError from "./AppError.js";
const errorHandler = (err, req, res, next) => {
  let customError = {
    msg: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  // if (err instanceof AppError) {
  //     return res.status(err.statusCode).render("error", { err: err.message })
  // }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  res.status(customError.statusCode).json({ err: customError.msg });
  next();
};

export default errorHandler;
