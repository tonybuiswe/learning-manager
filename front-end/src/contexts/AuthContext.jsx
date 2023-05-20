import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import { apiUrl, LOGIN_TOKEN } from "../utils/constants";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOGIN_TOKEN]) {
      setAuthToken(localStorage[LOGIN_TOKEN]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (e) {
      localStorage.removeItem(LOGIN_TOKEN);
      // TODO: Read the code below again
      setAuthToken(null);

      // This step may not be necessary, just a safeguard
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  //   Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
      }
      return response.data;
    } catch (e) {
      if (e.response.data) return e.response.data;
      return {
        success: false,
        message: e.message,
      };
    }
  };

  //   Context data
  const authContextData = { loginUser, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};