import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { toast } from 'sonner';
import { auth } from '@/config/firebase.init';
import { getAuthErrorMessage } from '@/constants/authErrors';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REGISTER: new user
  const signUpUser = async (email, password, name, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // UPDATE: user profile
      await updateProfile(result.user, {
        displayName: name?.trim() || null,
        photoURL: photoURL?.trim() || null,
      });

      // SEND EMAIL VARIFICATION LINK: Send verification email
      await sendEmailVerification(result.user);
      setUser(result.user);
      toast.success(
        'Account created successfully! Please check your email to verify your account.',
        { duration: 5000 },
      );
      return result.user;
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
      throw error;
    }
  };

  // SIGN IN: sign in with email
  const signInUser = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await result.user.reload();

      // ISEMAIL VARIFY: check email varified
      if (!result.user.emailVerified) {
        toast.error(
          'Please verify your email before signing in. Check your inbox for the verification link.',
          { duration: 5000 },
        );
        return null;
      }

      // UPDATE: current user
      setUser(result.user);
      toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
      return result.user;
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
      throw error;
    }
  };

  // SOCIAL LOGIN: (Google, GitHub)
  const socialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
      return result.user;
    } catch (error) {
      // ERROR HANDLE:  specific social login errors
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in was cancelled.');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Pop-up was blocked. Please allow pop-ups and try again.');
      } else {
        const message = getAuthErrorMessage(error);
        toast.error(message);
      }
      throw error;
    }
  };

  // RESET PASSWORD
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.', {
        duration: 5000,
      });
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('See you later!');
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
      throw error;
    }
  };

  // LISTENER: Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInUser,
        signUpUser,
        logout,
        socialLogin,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
