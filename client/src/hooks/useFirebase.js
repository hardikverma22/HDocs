import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useFirebase = () => {
    const [loggedInUser, setloggedInUser] = useState(null);
    const [isloggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setloggedInUser(user);
            } else {
                setIsLoggedIn(false);
                setloggedInUser(null);
            }
        });

        return () => {
            unsub();
        };
    }, []);

    return [loggedInUser, isloggedIn, setIsLoggedIn, setloggedInUser];

}
