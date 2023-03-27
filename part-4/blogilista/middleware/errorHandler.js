// virheellisten pyyntöjen käsittely
module.exports = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400);
  }

  return response.json({ error: error.message });
};
