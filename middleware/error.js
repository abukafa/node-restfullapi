// kelas untuk membuat pesan error
class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// menangani error
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // jika pesan error diinstansiasi
  if (err instanceof CustomError) {
    res.status(statusCode).json({ error: message });
  } else {
    res.status(statusCode).json({ error: "Something went wrong" });
  }
};

module.exports = { CustomError, errorHandler };
