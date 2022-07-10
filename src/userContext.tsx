import { createContext } from "react";

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
}

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
