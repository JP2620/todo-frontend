import { createContext } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
}

export type UserContextType = {
  user: User;
  setUsername: React.Dispatch<React.SetStateAction<User>>;
} | null;
export const UserContext = createContext<UserContextType | null>(null);
