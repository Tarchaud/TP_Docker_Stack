const HttpError = require("http-errors");

exports.HandlerError = async (error, req, res, next) => {
	console.log(error); // just to see the error 
	let errorMessage = "An unknow error occurred";
	let statusCode = 500;
	if(HttpError.isHttpError(error)){
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({error : errorMessage});
}
