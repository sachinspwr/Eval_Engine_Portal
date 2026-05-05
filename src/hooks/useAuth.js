import { useState, useEffect, useCallback, useRef } from "react";
import { getClientByEmail } from "../api/evalApi";

// ─── Session Storage Layer ────────────────────────────────────────────────────
// Strategy:
//   sessionStorage → accessToken  (cleared when browser/tab closes)
//   localStorage   → userEmail + lightweight user profile (non-sensitive, enables auto-login)
//   React memory   → full user object during active session
//
// On return visit: email found in localStorage → silently re-fetch profile from
// backend → restore session without asking for credentials again.
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const session = {
  // Token lives in sessionStorage — JS accessible but cleared on browser close
  setToken: (token) => sessionStorage.setItem("accessToken", token),
  getToken: () => sessionStorage.getItem("accessToken"),
  removeToken: () => sessionStorage.removeItem("accessToken"),

  // Email + expiry in localStorage — only used to silently restore session
  setIdentity: (email, name) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("sessionExpiry", Date.now() + SESSION_DURATION_MS);
  },
  getEmail: () => localStorage.getItem("userEmail"),
  getName: () => localStorage.getItem("userName"),

  isExpired: () => {
    const expiry = localStorage.getItem("sessionExpiry");
    if (!expiry) return true;
    return Date.now() > parseInt(expiry, 10);
  },

  clearAll: () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("sessionExpiry");
  },
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  // Restore session on mount — runs once
  useEffect(() => {
    const restoreSession = async () => {
      // If session is expired, clear everything and stop
      if (session.isExpired()) {
        session.clearAll();
        setLoading(false);
        return;
      }

      const email = session.getEmail();
      const name = session.getName();

      if (!email) {
        setLoading(false);
        return;
      }

      // Show cached identity immediately so UI doesn't flash blank
      if (name && email) {
        setUser({ name, email });
      }

      // If token is already in sessionStorage (same tab session), skip re-fetch
      if (session.getToken() && fetchedRef.current) {
        setLoading(false);
        return;
      }

      fetchedRef.current = true;

      try {
        // Silently re-fetch full profile from backend using stored email
        const clientData = await getClientByEmail(email);

        const restoredUser = {
          name: clientData.name || name,
          email: clientData.email || email,
          tier: clientData.tier || "FREE",
          dailyLimit: clientData.dailyLimit || 10,
          hitsUsed: clientData.hitsUsed || 0,
          hitsRemaining: (clientData.dailyLimit || 10) - (clientData.hitsUsed || 0),
        };

        // Put the token back into sessionStorage for this browser session
        if (clientData.accessToken) {
          session.setToken(clientData.accessToken);
        }

        // Refresh the expiry window on each successful restore
        session.setIdentity(restoredUser.email, restoredUser.name);

        setUser(restoredUser);
      } catch (err) {
        console.error("Session restore failed:", err);
        setError(err.message);
        // Keep the partial cached identity (name/email) so UI still shows something
        if (email && name) {
          setUser({ name, email });
        }
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const logout = useCallback(() => {
    fetchedRef.current = false;
    session.clearAll();
    setUser(null);
    setError(null);
    window.location.href = "/";
  }, []);

  const updateUser = useCallback((newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      // Keep localStorage identity in sync (non-sensitive fields only)
      if (updated.email) {
        session.setIdentity(updated.email, updated.name || "");
      }
      return updated;
    });
  }, []);

  const refreshUserData = useCallback(async () => {
    const email = session.getEmail();
    if (!email) return;

    try {
      const clientData = await getClientByEmail(email);
      const updatedUser = {
        name: clientData.name,
        email: clientData.email,
        tier: clientData.tier || "FREE",
        dailyLimit: clientData.dailyLimit || 10,
        hitsUsed: clientData.hitsUsed || 0,
        hitsRemaining: (clientData.dailyLimit || 10) - (clientData.hitsUsed || 0),
      };

      if (clientData.accessToken) {
        session.setToken(clientData.accessToken);
      }

      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error("Failed to refresh user data:", err);
      throw err;
    }
  }, []);

  return {
    user,
    loading,
    error,
    logout,
    updateUser,
    refreshUserData,
    isAuthenticated: !session.isExpired() && !!session.getEmail(),
  };
};
