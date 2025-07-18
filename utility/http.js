// utils/statusCodes.js or constants/statusCodes.js

module.exports= {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,

  // Custom (if needed)
  VALIDATION_ERROR: 422,
  TOO_MANY_REQUESTS: 429,
};


