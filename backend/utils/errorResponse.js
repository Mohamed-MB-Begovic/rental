// utils/errorResponse.js
class ErrorResponse extends Error {
    constructor(message, statusCode, details = null) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;
      this.isOperational = true; // This is to distinguish operational errors from programming errors
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ErrorResponse);
      }
  
      // Set the prototype explicitly (needed for some TypeScript/ES5 compatibility)
      Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
  
    // Static method to create a bad request error (400)
    static badRequest(message = 'Bad Request', details = null) {
      return new ErrorResponse(message, 400, details);
    }
  
    // Static method to create an unauthorized error (401)
    static unauthorized(message = 'Unauthorized', details = null) {
      return new ErrorResponse(message, 401, details);
    }
  
    // Static method to create a forbidden error (403)
    static forbidden(message = 'Forbidden', details = null) {
      return new ErrorResponse(message, 403, details);
    }
  
    // Static method to create a not found error (404)
    static notFound(message = 'Not Found', details = null) {
      return new ErrorResponse(message, 404, details);
    }
  
    // Static method to create a validation error (422)
    static validationError(message = 'Validation Error', details = null) {
      return new ErrorResponse(message, 422, details);
    }
  
    // Static method to create a server error (500)
    static serverError(message = 'Internal Server Error', details = null) {
      return new ErrorResponse(message, 500, details);
    }
  
    // Method to serialize error for API response
    serialize() {
      return {
        success: false,
        error: {
          message: this.message,
          code: this.statusCode,
          details: this.details,
          stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
        }
      };
    }
  }
  
//   module.exports = ErrorResponse;
export default ErrorResponse;