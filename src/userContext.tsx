import { createContext } from "react";

export type UserContextType = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}
export const UserContext = createContext<UserContextType | null>(null);
