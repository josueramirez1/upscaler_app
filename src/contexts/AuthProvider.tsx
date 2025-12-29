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
    await account.createEmailPasswordSession(email, password);
    await init();
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    await account.create(ID.unique(), email, password);
    await login(email, password);
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
