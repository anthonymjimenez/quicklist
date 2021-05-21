async function returnError(res, error) {
  return res.status(400).json({
    success: false,
    error: error.toString(),
    status: 400,
  });
}

exports.errorStatus = returnError;
