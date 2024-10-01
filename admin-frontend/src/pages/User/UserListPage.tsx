import { userApi } from "@/apis/user";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Badge, Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

export default function UserListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const userListQuery = useQuery({
    queryKey: ["user-list", filter, page],
    queryFn: () => userApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <CardCollection title="Quản lý khách" fontSize="25px">
        <Text>Quản lý khách đăng nhập tại shop</Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableCustom
          thead={[
            "ID",
            "Provider ID",
            "Tên",
            "Tiền(hiển thị)",
            "Trạng thái",
            "Thao tác",
          ]}
        >
          {userListQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>
                <Text>ID Provider: {vl.provider_id}</Text>
                <Text>
                  Domain:
                  <Badge colorScheme="red" marginLeft="5px">
                    {vl.shop.domain}
                  </Badge>
                </Text>
                <Text>
                  Đăng nhập:
                  <Badge colorScheme="red" marginLeft="5px">
                    {vl.login_type}
                  </Badge>
                </Text>
              </Td>
              <Td>
                <Text w="230px" className="break-word">
                  Tên hiển thị: {vl.name}
                </Text>
                <Text>
                  Tên đăng nhập:
                  <Badge colorScheme="purple" marginLeft="5px">
                    {vl.username}
                  </Badge>
                </Text>
              </Td>
              <Td>{numberFormat(vl.price_temporary)}</Td>
              <Td>
                <Text>
                  Chặn:{" "}
                  {vl.block === "on" ? (
                    <Badge colorScheme="red">Đã chặn</Badge>
                  ) : (
                    <Badge colorScheme="green">Bình thường</Badge>
                  )}
                </Text>
                <Text>
                  Kích hoạt:{" "}
                  {vl.active === "on" ? (
                    <Badge colorScheme="green">Đã kích hoạt</Badge>
                  ) : (
                    <Badge colorScheme="red">Chưa kích hoạt</Badge>
                  )}
                </Text>
                <Text>
                  Ngày tạo: {moment(vl.created_at).format("DD/MM/yy hh:mm")}
                </Text>
              </Td>
              <Td>
                <ActionList actions={["EDIT"]} linkUpdate={"./" + vl.id} />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate
          paginate={userListQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

function FormSearch({ setFilter, filter, setPage }: IFormSearchProps) {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tên hiển thị",
      name: "name",
      type: "INPUT",
    },
    {
      label: "ID Người dùng",
      name: "id",
      type: "INPUT",
    },
    {
      label: "ID hiển thị (Provider)",
      name: "provider_id",
      type: "INPUT",
    },
    {
      label: "Sắp xếp theo tiền",
      name: "sortPrice",
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
        CustomComponent={CustomStyleFilter}
        hiddenLable={true}
        icon={<FiSearch />}
        dataDefault={filter}
      />
    </>
  );
}
