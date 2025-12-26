import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { account, ID } from "../lib/appwrite.ts";
import type { Models } from "appwrite";

type CurrentUser = Models.User<Models.Preferences> | null;

interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //useState
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState<CurrentUser | false>(null);

  async function init() {
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
    await init(); // Re-fetch user to update state
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
    init();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
