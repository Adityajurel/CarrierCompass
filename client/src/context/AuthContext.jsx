import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { logoutUser } from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
  console.log("LOGIN:", userData);
  setUser(userData);
};

const logout = async () => {
  console.log("LOGOUT CALLED");
  try {
    await logoutUser();
  } finally {
    setUser(null);
  }
};

useEffect(() => {
  const fetchCurrentUser = async () => {
    console.log("FETCH CURRENT USER START");

    try {
      const response = await getCurrentUser();
      console.log("FETCH SUCCESS:", response.data);
      setUser(response.data);
    } catch (err) {
      console.log("FETCH FAILED:", err.response?.status, err.response?.data);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchCurrentUser();
}, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };