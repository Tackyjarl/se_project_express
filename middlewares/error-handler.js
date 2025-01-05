module.exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error has occured on the server";
  return res.status(statusCode).send({ message });
};
