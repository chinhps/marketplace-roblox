import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { IFormInput } from "@/types/form.type";
import {
  Badge,
  Flex,
  HStack,
  Image,
  List,
  ListItem,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

export default function BuyServiceHistoryPage() {
  return (
    <>
      <CardCollection title="Lịch sử dịch vụ" fontSize="25px">
        <Text>
          Lịch sử dịch vụ bao gồm: Rút kim cương, mua/rút robux, gamepass,...
        </Text>

        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>TẤT CẢ</Tab>
            <Tab>RÚT KIM CƯƠNG</Tab>
            <Tab>RÚT / MUA ROBUX</Tab>
            <Tab>Mua Gamepass</Tab>
          </TabList>

          <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
          <FormSearch />
          <TabPanels>
            <TabPanel>
              <TableList />
            </TabPanel>
            <TabPanel>
              <TableList />
            </TabPanel>
            <TabPanel>
              <TableList />
            </TabPanel>
            <TabPanel>
              <TableList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardCollection>
    </>
  );
}

function TableList() {
  return (
    <TableCustom
      thead={[
        "ID",
        "Tên người dùng",
        "Loại",
        "Thông tin",
        "Trạng thái",
        "Thời gian",
        "Thao tác",
      ]}
    >
      {new Array(7).fill(0).map((vl, index) => (
        <Tr key={index}>
          <Td>#{index + 1}</Td>
          <Td>
            <Flex alignItems="center" gap="1rem">
              <Image
                width="30px"
                rounded="50%"
                src="https://ui-avatars.com/api/?name=chinh"
                alt="hihi"
              />
              <VStack alignItems="flex-start" gap={0} fontWeight="normal">
                <Text>Domain: chinh.dev</Text>
                <Text>UID: 12312312312312</Text>
                <Text>Phạm Hoàng Chính</Text>
              </VStack>
            </Flex>
          </Td>
          <Td>Rút kim cương</Td>
          <Td>
            <HStack>
              <Badge colorScheme="purple">Giá trị: 8286</Badge>
              <Badge colorScheme="blue">Cost: 8286</Badge>
            </HStack>
            <Text>Đường dẫn: http://asdsa.cn/ed...</Text>
          </Td>
          <Td>
            <Badge colorScheme="green">Thành công</Badge>
            <Text>Task: 12312312</Text>
          </Td>
          <Td>
            <Text>12/12/2023</Text>
            <Text>10:30:30</Text>
          </Td>
          <Td>
            <ActionList />
          </Td>
        </Tr>
      ))}
    </TableCustom>
  );
}

type InputsFormSearch = {
  id: number;
  price: string;
  sort: string;
};

function FormSearch() {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tên miền",
      name: "domain",
      type: "INPUT",
    },
    {
      label: "#UID",
      name: "uid",
      type: "INPUT",
    },
    {
      label: "Sắp xếp theo trạng thái",
      name: "price",
      type: "SELECT",
      selects: [
        {
          label: `Thấp đến cao`,
          value: "1",
        },
        {
          label: `Cao đến thấp`,
          value: "2",
        },
      ],
    },
    {
      label: "Trạng thái",
      name: "status",
      type: "SELECT",
      selects: [
        {
          label: `Thấp đến cao`,
          value: "1",
        },
        {
          label: `Cao đến thấp`,
          value: "2",
        },
      ],
    },
  ];

  // Handle
  const onSubmit: SubmitHandler<InputsFormSearch> = async (data) => {
    // setPage(1);
    // setFilter(data);
    // updateQueryParameters(data);
  };

  return (
    <>
      <FormBase
        dataForm={dataForm}
        onSubmit={onSubmit}
        textBtn="Tìm kiếm"
        CustomComponent={CustomStyle}
        hiddenLable={true}
        icon={<FiSearch />}
        // dataDefault={filter}
      />
    </>
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        mt="1rem"
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: 0, lg: 3 }}
      >
        {children}
      </Flex>
    </>
  );
}
