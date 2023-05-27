import { PostFetched } from "../utils/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PostFetched.SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    case PostFetched.FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };
    default:
      return state;
  }
};