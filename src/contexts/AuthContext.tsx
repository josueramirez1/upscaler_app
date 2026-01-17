import { createContext } from "react";
import type { Models } from "appwrite";

type CurrentUser = Models.User<Models.Preferences> | null;

export interface AuthContextType {
  user: CurrentUser;
  loading: boolean;
  session: CurrentUser;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
