// /* eslint-disable react/prop-types */
// import { createContext, useEffect, useState } from 'react';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   updateProfile,
//   onAuthStateChanged,
//   signOut,
// } from 'firebase/auth';

// import { toast } from 'sonner';
// import { auth } from '@/config/firebase.init';
// import { getAuthErrorMessage } from '@/constants/authErrors';
// import axiosInstance from '@/lib/axiosInstance';

// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext(null);

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // REGISTER: new user
//   const signUpUser = async (email, password, name, photoURL) => {
//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );

//       await updateProfile(result.user, {
//         displayName: name?.trim() || null,
//         photoURL: photoURL?.trim() || null,
//       });

//       // Get the Firebase ID token
//       const token = await result.user.getIdToken();

//       // Call your backend to create the user in MongoDB
//       const response = await fetch('http://localhost:5000/api/v1/users', {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           email,
//           name: name?.trim() || null,
//           photoURL: photoURL?.trim() || null,
//           role: 'user',
//           createdAt: new Date(),
//         }),
//       });
//       console.log("responsce:", response);
//       if (!response.ok) {
//         throw new Error('Failed to create user profile');
//       }

//       setUser(result.user);
//       toast.success('Account created successfully!');
//       return result.user;
//     } catch (error) {
//       const message = getAuthErrorMessage(error);
//       toast.error(message);
//       throw error;
//     }
//   };

//   // SIGN IN: sign in with email
//   const signInUser = async (email, password) => {
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       await result.user.reload();

//       // ISEMAIL VARIFY: check email varified
//       // if (!result.user.emailVerified) {
//       //   toast.error(
//       //     'Please verify your email before signing in. Check your inbox for the verification link.',
//       //     { duration: 5000 },
//       //   );
//       //   return null;
//       // }

//       // Get Firebase ID token here
//       const token = await result.user.getIdToken();

//       // Save token to localStorage
//       localStorage.setItem('jwt_token', token);

//       // UPDATE: current user
//       setUser(result.user);
//       toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
//       return result.user;
//     } catch (error) {
//       const message = getAuthErrorMessage(error);
//       toast.error(message);
//       throw error;
//     }
//   };

//   // SOCIAL LOGIN: (Google, GitHub)
//   const socialLogin = async (provider) => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       // Get Firebase ID token here
//       const token = await result.user.getIdToken();

//       // Save token to localStorage
//       localStorage.setItem('jwt_token', token);

//       setUser(result.user);
//       toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
//       return result.user;
//     } catch (error) {
//       // ERROR HANDLE:  specific social login errors
//       if (error.code === 'auth/popup-closed-by-user') {
//         toast.error('Sign-in was cancelled.');
//       } else if (error.code === 'auth/popup-blocked') {
//         toast.error('Pop-up was blocked. Please allow pop-ups and try again.');
//       } else {
//         const message = getAuthErrorMessage(error);
//         toast.error(message);
//       }
//       throw error;
//     }
//   };

//   // RESET PASSWORD
//   const resetPassword = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       toast.success('Password reset email sent! Please check your inbox.', {
//         duration: 5000,
//       });
//     } catch (error) {
//       const message = getAuthErrorMessage(error);
//       toast.error(message);
//       throw error;
//     }
//   };

//   // LOGOUT
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       toast.success('See you later!');
//     } catch (error) {
//       const message = getAuthErrorMessage(error);
//       toast.error(message);
//       throw error;
//     }
//   };

//   // LISTENER: Auth state listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setLoading(true);

//       if (!currentUser) {
//         localStorage.removeItem('jwt_token');
//         setUser(null);
//         setLoading(false);
//         return; // Exit early if not logged in
//       }

//       try {
//         const token = await currentUser.getIdToken();
//         localStorage.setItem('jwt_token', token);

//         const { data } = await axiosInstance.get('/users/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setUser(data);
//       } catch (err) {
//         if (err.response?.status !== 404) {
//           toast.error(err.response?.data?.error || 'Failed to fetch user');
//         }
//         setUser(currentUser);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         signInUser,
//         signUpUser,
//         logout,
//         socialLogin,
//         resetPassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

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

  // 🔹 Helper: Sync user with DB
  const fetchCurrentUserFromDB = async (token) => {
    try {
      const { data } = await axiosInstance.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      return data;
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error(err.response?.data?.error || 'Failed to fetch user');
      }
      return null;
    }
  };

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

      const token = await result.user.getIdToken();

      // Create user in DB
      await axiosInstance.post(
        '/users',
        {
          email,
          name: name?.trim() || null,
          photoURL: photoURL?.trim() || null,
          role: 'user',
          createdAt: new Date(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // ✅ Immediately fetch DB user with role
      const dbUser = await fetchCurrentUserFromDB(token);

      localStorage.setItem('jwt_token', token);
      toast.success('Account created successfully!');
      return dbUser;
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

      const token = await result.user.getIdToken();
      localStorage.setItem('jwt_token', token);

      const dbUser = await fetchCurrentUserFromDB(token);

      toast.success(`Welcome back, ${dbUser?.displayName || 'User'}!`);
      return dbUser;
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
      const token = await result.user.getIdToken();

      // Ensure user exists in DB
      await axiosInstance.post(
        '/users',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // ✅ Fetch DB user with role
      const dbUser = await fetchCurrentUserFromDB(token);

      localStorage.setItem('jwt_token', token);
      toast.success(`Welcome back, ${dbUser?.displayName || 'User'}!`);
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
      localStorage.removeItem('jwt_token');
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
        await fetchCurrentUserFromDB(token);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
