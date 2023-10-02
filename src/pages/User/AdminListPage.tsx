import { adminApi } from "@/apis/admin";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Badge, Button, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const adminListQuery = useQuery({
    queryKey: ["admin-list", filter, page],
    queryFn: () => adminApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const adminDeleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(id),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      adminListQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const handleDelete = (id: number) => {
    adminDeleteMutation.mutate(id);
  };
  return (
    <>
      <CardCollection
        title="Quản lý Admin"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              THÊM MỚI
            </Button>
          </Link>
        }
      >
        <Text>Quản lý Admin, KOC, Support, Cộng tác viên</Text>
        <Text>Chỉ có thể xóa KOC.</Text>

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
                <Text>Provider ID: {vl.user?.provider_id ?? "Không có"}</Text>
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
                <ActionList
                  actions={["EDIT", "DELETE"]}
                  linkUpdate={"./update/" + vl.id}
                  onClickExits={() => handleDelete(vl.id)}
                />
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
      label: "ID Provider (Ngoài shop)",
      name: "provider_id",
      type: "INPUT",
    },
    {
      label: "ID Admin",
      name: "id",
      type: "INPUT",
    },
    {
      label: "Loại admin",
      name: "admin_type",
      type: "SELECT",
      placeholder: "-- Chọn loại admin --",
      selects: [
        { label: "KOC", value: "KOC" },
        { label: "Quản trị viên", value: "ADMIN" },
        { label: "Cộng tác viên", value: "CTV" },
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
