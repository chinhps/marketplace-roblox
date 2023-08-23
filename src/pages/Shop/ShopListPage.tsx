import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { IFormInput } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import moment from "moment";
import { SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ShopListPage() {
  const data = [
    {
      id: 1,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 2,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 3,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 4,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 5,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 6,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 7,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 8,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 9,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
    {
      id: 10,
      prioritize: 3,
      nameShop: "abc1232",
      favicon: "https://anhbaphairoblox.vn/icon.ico",
      domain: "asdasdsd.com",
      newCashForUser: 100000,
      created_at: "2023-07-31 19:57:04",
    },
  ];
  return (
    <>
      <CardCollection
        title="DANH SÁCH CÁC SHOP"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              THÊM MỚI
            </Button>
          </Link>
        }
      >
        <Text>Danh sách các shop vệ tinh</Text>
        <FormSearch />
        <TableCustom
          thead={[
            "ID",
            "Ưu tiên",
            "Tên shop",
            "Domain",
            "Tiền người dùng mới",
            "Ngày khởi tạo",
            "Thao tác",
          ]}
        >
          {data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>{vl.prioritize}</Td>
              <Td>
                <Flex alignItems="center" gap="1rem">
                  <Image
                    width="30px"
                    rounded="50%"
                    src={vl.favicon}
                    alt="hihi"
                  />
                  <Text>{vl.nameShop}</Text>
                </Flex>
              </Td>
              <Td>{vl.domain}</Td>
              <Td>{numberFormat(vl.newCashForUser)}</Td>
              <Td>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Td>
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
      label: "Tìm kiếm bằng tên miền",
      name: "id",
      type: "INPUT",
    },
    {
      label: "Sắp xếp theo ID",
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
      label: "Sắp xếp theo Ưu tiên",
      name: "sort",
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
