import { eventApi } from "@/apis/event";
import serviceApi from "@/apis/service";
import ModelBase from "@/components/global/Model/ModelBase";
import ServiceV2 from "@/components/global/Service/ServiceV2";
import Skeleton from "@/components/global/Skeleton/Skeleton";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import { IServiceGroupResponse } from "@/types/response/service.type";
import { customToast, token } from "@/utils/const";
import {
  Box,
  Center,
  IconButton,
  Img,
  SimpleGrid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

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
      <GiveGift />
    </>
  );
}

function GiveGift() {
  const toast = useToast(customToast);
  const [isShow, setIsShow] = useState<boolean>(true);
  const eventQuery = useQuery({
    queryKey: ["event"],
    queryFn: () => {
      if (token()) {
        return eventApi.get();
      }
      return eventApi.getGhost();
    },
    retry: false,
    cacheTime: 120000,
    refetchOnWindowFocus: false,
  });
  const eventClaimMutate = useMutation({
    mutationFn: () => eventApi.claim(),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      setIsShow(false);
    },
  });

  return (
    <>
      {isShow && eventQuery.data?.data.data.image ? (
        <Box position="fixed" left={3} bottom={3} zIndex={10}>
          <IconButton
            aria-label="close"
            variant="blue"
            position="absolute"
            p="10px"
            onClick={() => setIsShow(false)}
            icon={<FaTimes />}
          />
          <Box cursor="pointer">
            <Img
              src={eventQuery.data?.data.data.image}
              width={{ base: "70%", md: "85%" }}
              alt="give gift roblox"
              onClick={() => eventClaimMutate.mutate()}
            />
          </Box>
        </Box>
      ) : null}
    </>
  );
}

function PopupHome() {
  const dataInformation = useInformationShopData();
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
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
