import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { account, ID, Models } from "./lib/appwrite.ts";

type CurrentUser = Models.User<Models.Preferences> | null;

interface AuthContextType {
  user: CurrentUser;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within Auth Provider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState<CurrentUser>(null);

  async function start() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    await start(); // Re-fetch user to update state
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    await account.create(ID.unique(), email, password);
    await login(email, password); // Log in immediately after registration
  };

  useEffect(() => {
    start();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
