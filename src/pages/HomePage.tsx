import serviceApi from "@/apis/service";
import ModelBase from "@/components/global/Model/ModelBase";
import ServiceV2 from "@/components/global/Service/ServiceV2";
import Skeleton from "@/components/global/Skeleton/Skeleton";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import { IServiceGroupResponse } from "@/types/response/service.type";
import { Box, Center, Img, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function HomePage() {
  const serviceListQuery = useQuery({
    queryKey: ["serviceList"],
    queryFn: () => serviceApi.servieList(),
    retry: false,
    cacheTime: 120000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <PopupHome />
      {serviceListQuery.isLoading ? (
        <SkeletonServiceGroupHomePage />
      ) : (
        serviceListQuery.data?.data.data.map((item) => (
          <ServiceGroupHomePage key={item.id} data={item} />
        ))
      )}
    </>
  );
}

function PopupHome() {
  const dataInformation = useInformationShopData();
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    console.log(dataInformation?.plugin?.message_popup);

    if (
      dataInformation?.plugin?.message_popup &&
      dataInformation?.plugin?.message_popup !== ""
    ) {
      onOpen();
    }
  }, [dataInformation?.plugin]);
  return (
    <>
      <ModelBase
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        TextData={
          <Box
            dangerouslySetInnerHTML={{
              __html: dataInformation?.plugin?.message_popup ?? "",
            }}
          />
        }
        children={null}
      />
    </>
  );
}

function ServiceGroupHomePage({
  data,
}: {
  data: IServiceGroupResponse | undefined;
}) {
  return (
    <>
      <Center mb="2rem">
        <Img src={data?.image} alt={data?.name} />
      </Center>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        gap={{ base: 3, lg: 4 }}
        px={{ base: 2, lg: 0 }}
        mb="3rem"
      >
        {data?.serviceList.map((service) => (
          <ServiceV2 key={service.id} data={service} />
        ))}
      </SimpleGrid>
    </>
  );
}

function SkeletonServiceGroupHomePage() {
  return (
    <>
      <Center mb="2rem">
        <Skeleton height="45px" w={{ base: "50%", lg: "25%" }} />
      </Center>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        gap={{ base: 3, lg: 4 }}
        px={{ base: 2, lg: 0 }}
      >
        {Array(10)
          .fill(0)
          .map((_, key) => (
            <ServiceV2.loading key={key} />
          ))}
      </SimpleGrid>
    </>
  );
}
