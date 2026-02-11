import { useState, useEffect, type ReactNode } from "react";
import { account, ID, ensureUserBoard } from "../lib/appwrite";
import { AuthContext } from "./AuthContext";
import type { Models } from "appwrite";

type CurrentUser = Models.User<Models.Preferences> | null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);

      const board = await ensureUserBoard(loggedIn.$id);
      setBoardId(board.$id);
    } catch {
      setUser(null);
      setBoardId(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      try {
        // Only attempt to delete if we think we might have a user
        const currentSession = await account.getSession({
          sessionId: "current",
        });
        if (currentSession) {
          await account.deleteSession({ sessionId: "current" });
        }
      } catch {
        // If getSession fails, it means no session exists.
        // We can just proceed without doing anything.
      }

      await account.createEmailPasswordSession({ email, password });

      const currentUser = await account.get();
      setUser(currentUser);

      const board = await ensureUserBoard(currentUser.$id);
      setBoardId(board.$id);
    } catch (error) {
      console.error("There was a problem logging in", error);
    }
  };

  const logout = async () => {
    try {
      await account.getSession({
        sessionId: "current",
      });
      await account.deleteSession({ sessionId: "current" });
    } catch {}

    setUser(null);
    setBoardId(null);
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      await account.createEmailPasswordSession({ email, password });

      const currentUser = await account.get();
      setUser(currentUser);

      const board = await ensureUserBoard(currentUser.$id);
      setBoardId(board.$id);
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
        boardId,
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
