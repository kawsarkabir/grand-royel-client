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

      await updateProfile(result.user, {
        displayName: name?.trim() || null,
        photoURL: photoURL?.trim() || null,
      });

      // Get the Firebase ID token
      const token = await result.user.getIdToken();

      // Call your backend to create the user in MongoDB
      const response = await fetch('http://localhost:5000/api/v1/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name?.trim() || null,
          photoURL: photoURL?.trim() || null,
          role: 'user', // default role
          createdAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user profile');
      }

      setUser(result.user);
      toast.success('Account created successfully!');
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
      // if (!result.user.emailVerified) {
      //   toast.error(
      //     'Please verify your email before signing in. Check your inbox for the verification link.',
      //     { duration: 5000 },
      //   );
      //   return null;
      // }

      // Get Firebase ID token here
      const token = await result.user.getIdToken();

      // Save token to localStorage
      localStorage.setItem('jwt_token', token);

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
      // Get Firebase ID token here
      const token = await result.user.getIdToken();

      // Save token to localStorage
      localStorage.setItem('jwt_token', token);

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
  const fetchUserFromDB = async (token) => {
    const res = await fetch('http://localhost:5000/api/v1/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return res.json();
  };
  // LISTENER: Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem('jwt_token', token);

        // Fetch from MongoDB
        try {
          const dbUser = await fetchUserFromDB(token);
          setUser(dbUser); // Store full DB user, not just Firebase user
        } catch (err) {
          setUser(currentUser); // Fallback
          toast.error(err);
        }
      } else {
        localStorage.removeItem('jwt_token');
        setUser(null);
      }

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
