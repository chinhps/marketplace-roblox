import GameApi from "@/apis/games/gameApi";
import Account from "@/components/global/Service/Account";
import ServiceUnit from "@/components/global/Service/ServiceUnit";
import Skeleton from "@/components/global/Skeleton/Skeleton";
import { styleTextShadow } from "@/utils/const";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const gameApi = new GameApi();

export default function UnitSellPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      gameApi.setSlug(slug);
    }
  }, []);
  const serviceInfoQuery = useQuery({
    queryKey: ["service", slug],
    queryFn: () => gameApi.getData(),
    enabled: !!slug,
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const unitsQuery = useQuery({
    queryKey: ["service-units", slug],
    queryFn: () => gameApi.getDataUnit(),
    enabled: !!slug,
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  return (
    <>
      <Box as="header" mt="1rem" px={{ base: 5, lg: 0 }}>
        <Text size="sm" color="white.100">
          Danh mục
        </Text>
        <Heading
          as="h1"
          textTransform="uppercase"
          fontSize="35px"
          mb={5}
          sx={styleTextShadow}
        >
          {serviceInfoQuery.isLoading ? (
            <Skeleton height="40px" width="40%" rounded="md" />
          ) : (
            serviceInfoQuery.data?.data.data.service_image.name
          )}
        </Heading>
        <Box mb="1rem">
          {serviceInfoQuery.isLoading ? (
            <Skeleton height="20px" width="30%" rounded="md" />
          ) : (
            <Box
              color="white.100"
              dangerouslySetInnerHTML={{
                __html:
                  serviceInfoQuery.data?.data.data.notification ??
                  "Chưa có thông báo",
              }}
            />
          )}
        </Box>
      </Box>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        gap={5}
        px={{ base: 2, lg: 0 }}
        mt={{ base: "2rem", lg: 0 }}
      >
        {unitsQuery.isLoading
          ? new Array(10)
              .fill(0)
              .map((_, index) => <Account.loading key={index} />)
          : unitsQuery.data?.data.data.map((unit) => (
              <ServiceUnit
                key={unit.id}
                id={unit.id}
                gamepass_type={
                  serviceInfoQuery.data?.data.data.unit_type ?? "UNIT"
                }
                price={unit.price}
                thumb={unit.image}
                unitName={unit.name}
              />
            ))}
      </SimpleGrid>
    </>
  );
}
