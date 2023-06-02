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
    case POST_ENUM.DELETE_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== payload),
      };
    case POST_ENUM.UPDATE_SUCCESS:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );

      return {
        ...state,
        postToEdit: null,
        posts: newPosts,
      };

    case POST_ENUM.EDIT:
      return {
        ...state,
        postToEdit: payload,
      };

    case POST_ENUM.NO_EDIT:
      return {
        ...state,
        postToEdit: null,
      };
    default:
      return state;
  }
};