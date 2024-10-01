import { pluginApi } from "@/apis/plugin";
import { shopApi } from "@/apis/shopApi";
import InfomationShopProvider from "@/hooks/InfomationShopProvider";
import { useQuery } from "@tanstack/react-query";

export default function Default({
  children,
}: {
  children: React.ReactElement;
}) {
  const informationQuery = useQuery({
    queryKey: ["infomation"],
    queryFn: () => shopApi.infomation(),
    retry: false,
    cacheTime: 1200000,
    refetchOnWindowFocus: false,
  });

  const pluginQuery = useQuery({
    queryKey: ["plugin"],
    queryFn: () => pluginApi.all(),
    retry: false,
    cacheTime: 1200000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <InfomationShopProvider
        infomationData={{
          status: informationQuery?.status,
          plugin: pluginQuery.data?.data.data,
          ...informationQuery.data,
        }}
      >
        {children}
      </InfomationShopProvider>
    </>
  );
}
