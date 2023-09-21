import CardCollection from "@/components/globals/CardCollection";
import Chart from "@/components/globals/Chart";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import {
  Center,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";

export default function HomePage() {
  return (
    <Flex flexDirection="column" gap="1rem">
      <SimpleGrid columns={{ base: 1, lg: 24 }} gap="1rem">
        <GridItem colSpan={{ base: 1, lg: 14 }}>
          <CardCollection title="Thống kê dịch vụ">
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
            <ItemTextMain>450</ItemTextMain>
            <Text fontWeight="500">Đang truy cập</Text>
          </CardCollection>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="1rem">
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <CardCollection title="Biểu đồ doanh thu">
            <Chart />
          </CardCollection>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <CardCollection title="Biểu đồ lượng truy cập">
            <Chart />
          </CardCollection>
        </GridItem>
      </SimpleGrid>
      <CardCollection title="Lịch sử mua tài khoản gần đây">
        <Text>Lịch sử mua tài khoản gần đây</Text>
        <HistoryPurechase />
      </CardCollection>
    </Flex>
  );
}

function HistoryPurechase() {
  const data = [
    {
      id: 1,
      shop: "chinh.dev",
      name: "Phạm Hoàng Chính",
      serviceName: "Vòng quay hiha",
      quantity: 10,
      price: 100000,
      time: "2023-07-31 20:07:15",
    },
    {
      id: 2,
      shop: "chinh.dev",
      name: "Phạm Hoàng Chính",
      serviceName: "Vòng quay hiha",
      quantity: 10,
      price: 100000,
      time: "2023-07-31 20:07:15",
    },
    {
      id: 3,
      shop: "chinh.dev",
      name: "Phạm Hoàng Chính",
      serviceName: "Vòng quay hiha",
      quantity: 10,
      price: 100000,
      time: "2023-07-31 20:07:15",
    },
  ];
  return (
    <>
      <TableCustom
        thead={[
          "ID",
          "Shop",
          "Tên khách hàng",
          "Dịch vụ",
          "Số lượng",
          "Giá tiền",
          "Thời gian",
        ]}
      >
        {data.map((vl) => (
          <Tr key={vl.id}>
            <Td>{vl.id}</Td>
            <Td>{vl.shop}</Td>
            <Td>
              <Flex alignItems="center" gap="1rem">
                <Image
                  width="30px"
                  rounded="50%"
                  src={"https://ui-avatars.com/api/?name=" + vl.name}
                  alt={vl.name}
                />
                <Text>{vl.name}</Text>
              </Flex>
            </Td>
            <Td>{vl.serviceName}</Td>
            <Td>{vl.quantity} Lượt</Td>
            <Td>{numberFormat(vl.price)}</Td>
            <Td>{moment(vl.time).format("DD/MM/yyyy hh:mm")}</Td>
          </Tr>
        ))}
      </TableCustom>
    </>
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
  return (
    <>
      <SimpleGrid columns={5}>
        <StatisticalItem value={200} text="Mua tài khoản" />
        <StatisticalItem value={502} text="Sử dụng dịch vụ" />
        <StatisticalItem value={1203} text="Nạp thẻ" />
        <StatisticalItem value={121} text="Mua dịch vụ" />
        <StatisticalItem value={300} text="Tài khoản mới" />
      </SimpleGrid>
    </>
  );
}

function Revenue() {
  return (
    <>
      <ItemTextMain>90.000.000đ</ItemTextMain>
      <Flex flexDirection="column">
        <Flex justifyContent="space-between">
          <Text fontWeight="500">Hôm qua</Text>
          <Text fontWeight="500">50.000.000đ</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontWeight="500">Tháng 7</Text>
          <Text fontWeight="500">150.000.000đ</Text>
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
          {value}
        </Text>
        <Text fontWeight="500" fontSize="14px" color="main.item">
          {text}
        </Text>
      </Center>
    </>
  );
}
