const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATE_ERROR = 11000;

const OWNER_REQUIRED = "Owner is required";
const SERVER_ERROR = "An error has occured on the server";
const ITEM_NOT_FOUND = "Item not found";
const INVALID_ITEM_ID = "Invalid item ID";
const USER_NOT_FOUND = "User not found";
const ROUTER_NOT_FOUND = "Router not found";
const CONFLICT_ERROR = "Email already exists, please use a different email";
const INVALID_ENTRY_ERROR = "Invalid email or password";

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OWNER_REQUIRED,
  SERVER_ERROR,
  ITEM_NOT_FOUND,
  INVALID_ITEM_ID,
  USER_NOT_FOUND,
  ROUTER_NOT_FOUND,
  CONFLICT_ERROR,
  DUPLICATE_ERROR,
  UNAUTHORIZED,
  INVALID_ENTRY_ERROR,
  FORBIDDEN,
};
