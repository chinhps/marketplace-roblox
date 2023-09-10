import shopApi from "@/apis/shop";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { IFormInput } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Button, Flex, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ShopListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const shopQuery = useQuery({
    queryKey: ["shop-list", filter, page],
    queryFn: () => shopApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/
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
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableCustom
          thead={[
            "ID",
            "Logo",
            "Tên shop",
            "Tiền người dùng mới",
            "Ngày khởi tạo",
            "Thao tác",
          ]}
        >
          {shopQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>
                <Image
                  w="50px"
                  src={vl.shop_detail.information.logo_url}
                  alt="logo"
                />
              </Td>
              <Td>
                <Flex alignItems="center" gap="1rem">
                  <Image
                    width="30px"
                    rounded="50%"
                    src={vl.shop_detail.information.favicon_url}
                    alt="hihi"
                  />
                  <VStack align="flex-start">
                    <Text>Domain: {vl.domain}</Text>
                    <Text w="300px" className="break-word" noOfLines={1}>
                      {vl.shop_detail.shop_title}
                    </Text>
                  </VStack>
                </Flex>
              </Td>
              <Td>{numberFormat(vl.shop_detail.cash_new_user)}</Td>
              <Td>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Td>
              <Td>
                <ActionList
                  actions={["EDIT"]}
                  linkUpdate={"./update/" + vl.id}
                  onClickExits={() => alert(1)}
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate paginate={shopQuery.data?.data.paginate} action={setPage} />
      </CardCollection>
    </>
  );
}

function FormSearch({
  setFilter,
  filter,
  setPage,
}: {
  setFilter: (data: object) => void;
  filter: object;
  setPage: (page: number) => void;
}) {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tìm kiếm bằng tên miền",
      name: "domain",
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
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setPage(1);
    setFilter(data);
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
        dataDefault={filter}
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
