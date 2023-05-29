import { POST_ENUM } from "../utils/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_ENUM.FETCH_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    case POST_ENUM.FETCH_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };
    case POST_ENUM.ADD_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    default:
      return state;
  }
};