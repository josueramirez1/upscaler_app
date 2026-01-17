import { useState, useEffect, type ReactNode } from "react";
import { account, ID } from "../lib/appwrite";
import { AuthContext } from "./AuthContext";
import type { Models } from "appwrite";

type CurrentUser = Models.User<Models.Preferences> | null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      console.error("There was a problem logging in", error);
    }

    const currentUser = await account.get();
    setUser(currentUser);
  };

  const logout = async () => {
    try {
      await account.deleteSession({
        sessionId: "current",
      });
    } catch (error) {
      console.error("There was a problem logging out", error);
    }

    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await account.create({ userId: ID.unique(), email, password, name });
      await account.createEmailPasswordSession({ email, password });
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error("There was a problem registering", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
