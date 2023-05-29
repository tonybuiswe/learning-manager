import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl, POST_ENUM } from "../utils/constants";

const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });

  const [isShowToast, setIsShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const [isAddPostModalVisible, setIsAddPostModalVisible] = useState(false);
  const openAddPostModal = () => setIsAddPostModalVisible(true);
  const closeAddPostModal = () => setIsAddPostModalVisible(false);
  // Get all posts

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POST_ENUM.FETCH_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (e) {
      dispatch({
        type: POST_ENUM.FETCH_FAIL,
      });
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: POST_ENUM.ADD_SUCCESS,
          payload: response.data.post,
        });

        return response.data;
      }
    } catch (e) {
      return e.response.data
        ? e.response.data
        : {
            success: false,
            message: "Server error",
          };
    }
  };

  const postContextValue = {
    postState,
    getPosts,
    addPost,
    isAddPostModalVisible,
    openAddPostModal,
    closeAddPostModal,
  };

  return (
    <PostContext.Provider value={postContextValue}>
      {children}
    </PostContext.Provider>
  );
};

export function usePosts() {
  return useContext(PostContext);
}