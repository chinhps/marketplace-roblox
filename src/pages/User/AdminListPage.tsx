import { adminApi } from "@/apis/admin";
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
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

export default function AdminListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const adminListQuery = useQuery({
    queryKey: ["admin-list", filter, page],
    queryFn: () => adminApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  return (
    <>
      <CardCollection title="Quản lý Admin" fontSize="25px">
        <Text>Quản lý Admin, KOC, Support, Cộng tác viên</Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableCustom
          thead={[
            "ID",
            "Provider ID",
            "Tên",
            "Đang treo",
            "Tiền",
            "Trạng thái",
            "Thao tác",
          ]}
        >
          {adminListQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>
                <Text>Loại: {vl.admin_type}</Text>
                <Text>ID USER: {vl.user_id ?? "Không có"}</Text>
                <Text>
                  Domain:
                  <Badge
                    colorScheme={vl.shop?.domain ? "green" : "red"}
                    marginLeft="5px"
                  >
                    {vl.shop?.domain ?? "Không có"}
                  </Badge>
                </Text>
              </Td>
              <Td>
                <Text>Tên: {vl.name}</Text>
                <Text>Tên đăng nhập: {vl.username}</Text>
              </Td>
              <Td>{vl.accounts_count}</Td>
              <Td>{numberFormat(vl.purchase_histories_sum_price ?? 0)}</Td>
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
              </Td>

              <Td>
                <ActionList actions={["EDIT", "DELETE"]} />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate
          paginate={adminListQuery.data?.data.paginate}
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
      label: "ID người dùng ngoài shop",
      name: "user_id",
      type: "INPUT",
    },
    {
      label: "ID Admin",
      name: "id",
      type: "INPUT",
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
