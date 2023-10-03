const HttpStatusCode = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  InternalServerError: 500,
};

const Status = {
  Success: 'success',
  Failure: 'failure',
};

module.exports = { HttpStatusCode, Status };
