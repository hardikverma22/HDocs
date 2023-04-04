import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../../auth/firebase";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Login from "../components/Login/Login";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(false);

  const signIn = () => {
    return signInWithPopup(auth, provider);
  };

  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    loggedInUser,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingSpinner />}
      {!loading && (loggedInUser ? children : <Login />)}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
