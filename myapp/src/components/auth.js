import React, { useEffect, useState } from "react";
import { auth, googleProvider } from '../config/firebase.mjs';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import Save from './Save'; // Import the Save component

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
    const [userid, setUserid] = useState(""); // State to hold the user ID

    // Effect to listen for changes in authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Set the current user in state
            if (user) {
                console.log("User UID:", user.uid); // Log the user's UID if signed in
                setUserid(user.uid); // Set the userid state
            } else {
                console.log("User signed out");
            }
        });

        // Cleanup function
        return () => {
            unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
        };
    }, []);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            {currentUser ? (
                <button className="logout-btn" onClick={logout}> Logout </button>
            ) : (
                <div className="login-form">
                    <h1 className="h1login">Please Login</h1>
                    <input 
                        className="input-field" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-btn" onClick={signIn}> Sign In </button>
                    <button className="google-btn" onClick={signInWithGoogle}> Sign In With Google </button>
                </div>
            )}
        </div>
    );
      
};
export default Auth;
