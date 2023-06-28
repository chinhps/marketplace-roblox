import serviceApi from "@/apis/service";
import Service from "@/components/global/Service/Service";
import Skeleton from "@/components/global/Skeleton/Skeleton";
import { IServiceGroupResponse } from "@/types/response/service.type";
import { Center, Img, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const serviceListQuery = useQuery({
    queryKey: ["serviceList"],
    queryFn: () => serviceApi.servieList(),
  });

  return (
    <>
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
          <Service key={service.id} data={service} />
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
            <Service.loading key={key} />
          ))}
      </SimpleGrid>
    </>
  );
}
