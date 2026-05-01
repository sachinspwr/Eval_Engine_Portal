// import { useState, useEffect, useCallback } from "react";
// import { getUserProfile } from "../api/evalApi";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("accessToken");
//   const userData = localStorage.getItem("user");

//   const fetchProfile = useCallback(async () => {
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const profile = await getUserProfile();
//       setUser(profile);
//       localStorage.setItem("user", JSON.stringify(profile));
//     } catch (err) {
//       console.error("Failed to fetch profile:", err);
//       setError(err.message);
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [token, userData]);

//   useEffect(() => {
//     if (userData && !user) {
//       setUser(JSON.parse(userData));
//     }
//     fetchProfile();
//   }, [fetchProfile, userData, user]);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return {
//     user,
//     loading,
//     error,
//     logout,
//     fetchProfile,
//     isAuthenticated: !!token,
//   };
// };

import { useState, useEffect, useCallback, useRef } from "react";
import { getClientByEmail } from "../api/evalApi";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const token = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("user");
  const userEmail = localStorage.getItem("userEmail");

  const fetchProfile = useCallback(async () => {
    if (!token || !userEmail || fetchedRef.current) {
      setLoading(false);
      return;
    }

    fetchedRef.current = true;

    try {
      const clientData = await getClientByEmail(userEmail);

      const updatedUser = {
        ...JSON.parse(userData || "{}"),
        ...clientData,
        hitsRemaining:
          (clientData.dailyLimit || 10) - (clientData.hitsUsed || 0),
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError(err.message);

      // Fall back to cached user data
      if (userData) {
        const cached = JSON.parse(userData);
        setUser({
          ...cached,
          hitsRemaining: (cached.dailyLimit || 10) - (cached.hitsUsed || 0),
        });
      }
    } finally {
      setLoading(false);
    }
  }, [token, userEmail]); // Remove userData from dependencies

  useEffect(() => {
    // Load cached data immediately for fast display
    if (userData && !user) {
      const cached = JSON.parse(userData);
      setUser({
        ...cached,
        hitsRemaining: (cached.dailyLimit || 10) - (cached.hitsUsed || 0),
      });
    }
  }, []); // Run only once

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const logout = () => {
    fetchedRef.current = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    setUser(null);
    window.location.href = "/";
  };

  const updateUser = useCallback((newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshUserData = useCallback(async () => {
    if (userEmail) {
      try {
        const clientData = await getClientByEmail(userEmail);
        const updatedUser = {
          ...JSON.parse(userData || "{}"),
          ...clientData,
          hitsRemaining:
            (clientData.dailyLimit || 10) - (clientData.hitsUsed || 0),
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      } catch (err) {
        console.error("Failed to refresh user data:", err);
        throw err;
      }
    }
  }, [userEmail, userData]);

  return {
    user,
    loading,
    error,
    logout,
    fetchProfile,
    updateUser,
    refreshUserData,
    isAuthenticated: !!token,
  };
};
