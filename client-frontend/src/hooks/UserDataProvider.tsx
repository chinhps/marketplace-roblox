import { IInfoUserResponse } from "@/types/response/auth.type";
import { createContext, useContext } from "react";

const UserDataContext = createContext(null);

export default function UserDataProvider({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: any;
}) {
  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData(): {
  isLoading: boolean;
  status: string;
  data: IInfoUserResponse;
} | null {
  return useContext(UserDataContext);
}
