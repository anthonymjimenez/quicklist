async function returnError(res, error) {
  return res.status(400).json({
    error: error.toString(),
    status: 400,
  });
}

exports.errorStatus = returnError;
