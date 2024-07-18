import { statisticalApi } from "@/apis/statistical";
import CardCollection from "@/components/globals/CardCollection";
import Chart from "@/components/globals/Chart";
import { numberFormat } from "@/utils/function";
import { Center, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const chartsQuery = useQuery({
    queryKey: ["chart"],
    queryFn: () => statisticalApi.charts(),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <Flex flexDirection="column" gap="1rem">
      <SimpleGrid columns={{ base: 1, lg: 24 }} gap="1rem">
        <GridItem colSpan={{ base: 1, lg: 14 }}>
          <CardCollection title="Thống kê dịch vụ tháng">
            <Statistical />
          </CardCollection>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <CardCollection title="Doanh thu hôm nay">
            <Revenue />
          </CardCollection>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 4 }}>
          <CardCollection title="Đang truy cập">
            <ItemTextMain>...</ItemTextMain>
            <Text fontWeight="500">Đang truy cập</Text>
          </CardCollection>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="1rem">
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <CardCollection title="Biểu đồ doanh thu">
            <Chart
              name="Vnđ"
              data={chartsQuery.data?.data.data.recharge_chart ?? []}
              lables={new Array(7)
                .fill(0)
                .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
            />
          </CardCollection>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <CardCollection title="Biểu đồ người dùng mới">
            <Chart
              name="Người"
              data={chartsQuery.data?.data.data.user_chart ?? []}
              lables={new Array(7)
                .fill(0)
                .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
            />
          </CardCollection>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
}

function ItemTextMain({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Text fontSize="30px" fontWeight="bold" color="main.item" mb="0.5rem">
        {children}
      </Text>
    </>
  );
}

function Statistical() {
  const statisticalQuery = useQuery({
    queryKey: ["statistical"],
    queryFn: () => statisticalApi.service(),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <SimpleGrid columns={5}>
        {statisticalQuery.data?.data.data.map((statis, index) => (
          <StatisticalItem
            key={index}
            value={statis.value ?? 0}
            text={statis.label}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

function Revenue() {
  const revenueQuery = useQuery({
    queryKey: ["revenue"],
    queryFn: () => statisticalApi.revenue(),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <ItemTextMain>
        {numberFormat(revenueQuery.data?.data.data.day ?? 0)}
      </ItemTextMain>
      <Flex flexDirection="column">
        <Flex justifyContent="space-between">
          <Text fontWeight="500">Tháng hiện tại</Text>
          <Text fontWeight="500">
            {numberFormat(revenueQuery.data?.data.data.month ?? 0)}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

function StatisticalItem({ text, value }: { text: string; value: number }) {
  return (
    <>
      <Center flexDirection="column" my="1rem">
        <Text fontWeight="bold" fontSize="20px" color="main.item">
          {numberFormat(value, false)}
        </Text>
        <Text fontWeight="500" fontSize="14px" color="main.item">
          {text}
        </Text>
      </Center>
    </>
  );
}
