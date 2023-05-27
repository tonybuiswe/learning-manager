export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3456/api"
    : "placeholder";

export const LOGIN_TOKEN = "LOGIN_TOKEN";

export const PostFetched = {
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};