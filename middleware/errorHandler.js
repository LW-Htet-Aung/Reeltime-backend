// middleware/errorHandler.js
const createError = (message, statusCode = 500) => {
  return {
    statusCode,
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    message,
  };
};

const errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    status: err.status || "error",
    message: err.message,
  };
  console.log(error.statusCode, "code");
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { createError, errorHandler };
