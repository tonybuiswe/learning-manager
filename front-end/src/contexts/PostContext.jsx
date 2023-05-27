import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl, PostFetched } from "../utils/constants";

const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });

  // Get all posts

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: PostFetched.SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (e) {
      dispatch({
        type: PostFetched.FAIL,
      });
    }
  };
  return (
    <PostContext.Provider value={{ postState, getPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export function usePosts() {
  return useContext(PostContext);
}