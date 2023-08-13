import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { IFormInput } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Badge, Flex, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

export default function ServiceHistoryPage() {
  const data = {
    default: "Tổng lượt quay: x7 | Tổng phần thưởng nhận được: 78",
    details: [
      {
        name: "Chúc mừng bạn đã trúng: 5",
        service_gift_id: 1,
      },
      {
        name: "Chúc mừng bạn đã trúng: 10",
        service_gift_id: 1,
      },
      {
        name: "Chúc mừng bạn đã trúng: 10",
        service_gift_id: 1,
      },
      {
        name: "Chúc mừng bạn đã trúng: 8",
        service_gift_id: 1,
      },
      {
        name: "Chúc mừng bạn đã trúng: 6",
        service_gift_id: 1,
      },
      {
        name: "Chúc mừng bạn đã trúng: 5",
        service_gift_id: 1,
      },
      {
        name: "Chúc mừng bạn đã trúng: 6",
        service_gift_id: 1,
      },
    ],
  };
  return (
    <>
      <CardCollection title="Lịch sử trò chơi" fontSize="25px">
        <Text>Lịch sử trò chơi</Text>
        <FormSearch />
        <TableCustom
          thead={["ID", "Tên người dùng", "Thông tin", "Giá trị", "Thời gian"]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>1</Td>
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
              <Td>
                <VStack alignItems="flex-start">
                  <Badge colorScheme="purple">
                    Tên dịch vụ: Giovanna Macejkovic
                  </Badge>
                  <Badge>Thông tin: {data.default}</Badge>
                  <Badge colorScheme="orange">Số lượng: 10</Badge>
                </VStack>
              </Td>
              <Td>
                <Badge colorScheme="green">{numberFormat(100000)}</Badge>
              </Td>
              <Td>
                <Text>12/12/2023</Text>
                <Text>10:30:30</Text>
              </Td>
            </Tr>
          ))}
        </TableCustom>
      </CardCollection>
    </>
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
      label: "Tên dịch vụ",
      name: "id_account",
      type: "INPUT",
    },
    {
      label: "Tên quà nhận được",
      name: "id_account",
      type: "INPUT",
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
