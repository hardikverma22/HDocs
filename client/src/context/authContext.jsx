import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import {
  Suspense,
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../../auth/firebase";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
// import Login from "../components/Login/Login";
const Login = lazy(() => import("../components/Login/Login"));

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(false);

  const signIn = () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
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
      {!loading &&
        (loggedInUser ? (
          children
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ))}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
