export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3456/api"
    : "placeholder";

export const LOGIN_TOKEN = "LOGIN_TOKEN";

export const POST_ENUM = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",
  ADD_SUCCESS: "ADD_SUCCESS",
};