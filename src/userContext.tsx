import { createContext } from "react";

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
}

export type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
