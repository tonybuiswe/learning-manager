import axios from "axios";
import {createContext, useReducer} from "react";
import { apiUrl, LOCAL_TOKEN } from "../constants";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  },);

  //   Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`);
      if (response.data.success) {
        localStorage.setItem(LOCAL_TOKEN, response.data.accessToken);
        return response.data.accessToken;
      }
      return response.data;
    } catch (e) {
      if (e.response.data) return e.response.data;
      return {
        success: "false",
        message: e.message,
      };
    }
  };

  //   Context data
  const authContextData = { loginUser };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};