import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

export const AuthContext = createContext()

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignInUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    const resetPassword = (email) => {
          return sendPasswordResetEmail(auth,email)
      };      

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // if (currentUser) {
            //     try {
            //       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, { email: currentUser.email });
            //       const token = response.data.token;
            //       localStorage.setItem('access-token', token);
            //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Add this line to set the authorization header
            //     } catch (error) {
            //       console.log('Failed to obtain JWT token:', error);
            //     }
            //   } else {
            //     // signOutUser()
            //     // .then(()=>{})
            //     localStorage.removeItem('access-token');
            //     delete axios.defaults.headers.common['Authorization']; // Remove the authorization header
            //   }
              
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        googleSignInUser,
        signOutUser,
        resetPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;