import axios from "axios";
import { createContext, useReducer, useEffect, useContext } from "react";
import { apiUrl, LOGIN_TOKEN } from "../utils/constants";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const logOutUser = () => {
    localStorage.removeItem(LOGIN_TOKEN);
    // TODO: Read the code below again

    // This step may not be necessary, just a safeguard
    setAuthToken(null);

    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  const authenticateUser = async () => {
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
      logOutUser();
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  //   Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
        await authenticateUser();
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

  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
        await authenticateUser();
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
  const authContextData = { loginUser, authState, registerUser, logOutUser };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}