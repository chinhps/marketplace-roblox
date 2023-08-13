import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { IFormInput } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Badge, Flex, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

export default function PurchaseHistoryPage() {
  const data_public = [
    {
      key: "CHAMPS",
      name: "Tướng",
      value: 28,
    },
    {
      key: "SKINS",
      name: "Trang phục",
      value: 518,
    },
  ];
  return (
    <>
      <CardCollection title="Lịch sử mua tài khoản" fontSize="25px">
        <Text>
          Lịch sử mua tài khoản. Ấn vào ID để có thể xem nhiều thông tin hơn
        </Text>
        <FormSearch />
        <TableCustom
          thead={[
            "ID",
            "Tên người dùng",
            "Tài khoản",
            "Thông tin(Private)",
            "Thời gian",
            "Hoàn tiền",
            "Thao tác",
          ]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>#1</Td>
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
                <Text>ACC: #123</Text>
                <Text>
                  <Badge colorScheme="green">{numberFormat(1900000)}</Badge>
                </Text>
              </Td>
              <Td>
                {data_public.map((detail, index) => (
                  <Text key={index}>
                    {detail.name}: {detail.value}
                  </Text>
                ))}
              </Td>
              <Td>
                <Text>12/12/2023</Text>
                <Text>10:30:30</Text>
              </Td>
              <Td>
                <Badge colorScheme="red">Hoàn tiền</Badge>
              </Td>
              <Td>
                <ActionList />
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
      label: "#ID ACCOUNT",
      name: "id_account",
      type: "INPUT",
    },
    {
      label: "Trạng thái",
      name: "status",
      type: "SELECT",
      selects: [
        {
          label: `Hoàn tiền`,
          value: "1",
        },
        {
          label: `Hoàn thành`,
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
