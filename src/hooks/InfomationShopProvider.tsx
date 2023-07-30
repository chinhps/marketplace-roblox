import { IBaseResponseDetail } from "@/types/response/base.type";
import { IShopInformation } from "@/types/response/shop.type";
import { createContext, useContext } from "react";

const InfomationShopContext = createContext(null);

export default function InfomationShopProvider({
  children,
  infomationData,
}: {
  children: React.ReactNode;
  infomationData: any;
}) {
  return (
    <InfomationShopContext.Provider value={infomationData}>
      {children}
    </InfomationShopContext.Provider>
  );
}

export function useInformationShopData(): {
  isLoading: boolean;
  status: string;
  data: IBaseResponseDetail<IShopInformation>;
} | null {
  return useContext(InfomationShopContext);
}
