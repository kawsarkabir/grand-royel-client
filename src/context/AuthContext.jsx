/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '@/config/firebase.init';
import { getAuthErrorMessage } from '@/constants/authErrors';
import axiosInstance from '@/lib/axiosInstance';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------
  // Helper: Save user to DB
  // -------------------
  const saveUserToDB = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken();

    try {
      const { data } = await axiosInstance.post(
        '/users',
        {
          email: firebaseUser.email,
          name: firebaseUser.displayName || null,
          photoURL: firebaseUser.photoURL || null,
          role: 'user',
          createdAt: new Date(),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return data; // DB user
    } catch (error) {
      // If the user already exists, ignore 409 conflict
      if (error.response?.status !== 409) {
        throw error;
      }
    }
  };

  // -------------------
  // Helper: Fetch DB user
  // -------------------
  const fetchUserFromDB = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken();

    const { data } = await axiosInstance.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  };

  // -------------------
  // Register: Email/password
  // -------------------
  const signUpUser = async (email, password, name, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(result.user, {
        displayName: name?.trim() || null,
        photoURL: photoURL?.trim() || null,
      });

      await saveUserToDB(result.user);
      const dbUser = await fetchUserFromDB(result.user);

      setUser(dbUser);
      toast.success('Account created successfully!');
      return dbUser;
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
      throw error;
    }
  };

  // -------------------
  // Sign In: Email/password
  // -------------------
  const signInUser = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await result.user.reload();

      let dbUser;
      try {
        dbUser = await fetchUserFromDB(result.user);
      } catch (err) {
        if (err.response?.status === 404) {
          await saveUserToDB(result.user);
          dbUser = await fetchUserFromDB(result.user);
        } else {
          throw err;
        }
      }

      setUser(dbUser);
      toast.success(`Welcome back!`);
      return dbUser;
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
      throw error;
    }
  };

  // -------------------
  // Social Login
  // -------------------
  const socialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);

      let dbUser;
      try {
        dbUser = await fetchUserFromDB(result.user);
      } catch (err) {
        if (err.response?.status === 404) {
          await saveUserToDB(result.user);
          dbUser = await fetchUserFromDB(result.user);
        } else {
          throw err;
        }
      }

      setUser(dbUser);
      toast.success(`Welcome back, ${dbUser.name || 'User'}!`);
      return dbUser;
    } catch (error) {
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

  // -------------------
  // Reset Password
  // -------------------
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

  // -------------------
  // Logout
  // -------------------
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

  // -------------------
  // Refresh user manually
  // -------------------
  const refreshUser = async () => {
    if (!auth.currentUser) return;
    const dbUser = await fetchUserFromDB(auth.currentUser);
    setUser(dbUser);
  };

  // -------------------
  // Listen to Auth changes
  // -------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (!currentUser) {
        localStorage.removeItem('jwt_token');
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const token = await currentUser.getIdToken();
        localStorage.setItem('jwt_token', token);

        let dbUser;
        try {
          dbUser = await fetchUserFromDB(currentUser);
        } catch (err) {
          if (err.response?.status === 404) {
            await saveUserToDB(currentUser);
            dbUser = await fetchUserFromDB(currentUser);
          } else {
            throw err;
          }
        }

        setUser(dbUser);
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to fetch user');
        setUser(currentUser);
      } finally {
        setLoading(false);
      }
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
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
