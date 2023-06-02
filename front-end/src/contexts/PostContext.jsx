import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl, POST_ENUM } from "../utils/constants";

const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postToEdit: null,
    posts: [],
    postsLoading: true,
  });

  const [toast, setToast] = useState({
    isShow: false,
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

  const deletePost = async (postId) => {
    console.log("this");
    console.log(this);
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: POST_ENUM.DELETE_SUCCESS,
          payload: postId,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({
          type: POST_ENUM.UPDATE_SUCCESS,
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

  const editPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    if (post) {
      dispatch({ type: POST_ENUM.EDIT, payload: post });
    }
  };

  const noEditPost = () =>
    dispatch({
      type: POST_ENUM.NO_EDIT,
    });

  const postContextValue = {
    postState,
    getPosts,
    addPost,
    deletePost,
    isAddPostModalVisible,
    openAddPostModal,
    closeAddPostModal,
    toast,
    setToast,
    editPost,
    updatePost,
    noEditPost,
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