import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import { Badge, Button, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { accountApi } from "@/apis/account";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormBase from "@/components/globals/FormBase";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { FiSearch } from "react-icons/fi";
import Paginate from "@/components/globals/Paginate";
import BadgeCustom from "@/components/globals/BadgeCustom";

export default function AccoutListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const accountListQuery = useQuery({
    queryKey: ["account-list", filter, page],
    queryFn: () => accountApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const accountDeleteMutation = useMutation({
    mutationFn: (id: number) => accountApi.delete(id),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      accountListQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <CardCollection
        title="Quản lý tài khoản"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              Đăng tài khoản
            </Button>
          </Link>
        }
      >
        <Text>Tài khoản đã bán không thể xóa</Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableCustom
          thead={[
            "ID",
            "Tên dịch vụ",
            "Thông tin(Public)",
            "Trạng thái",
            "Giá",
            "Thao tác",
          ]}
        >
          {accountListQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>
                <Text>Tên DV: {vl.service.note}</Text>
                <Text>ADMIN: {vl.admin.name}</Text>
              </Td>
              <Td>
                {vl.detail_public.map((value, i) => (
                  <Text key={i}>
                    {value.name}:
                    <BadgeCustom colorScheme="purple">
                      {value.value}
                    </BadgeCustom>
                  </Text>
                ))}
              </Td>
              <Td>
                <Text>
                  Kích hoạt:{" "}
                  {vl.active === "YES" ? (
                    <Badge colorScheme="green">Đã kích hoạt</Badge>
                  ) : (
                    <Badge colorScheme="red">Chưa kích hoạt</Badge>
                  )}
                </Text>
                <Text>
                  Trạng thái:{" "}
                  {vl.status === "NOTSELL" ? (
                    <Badge colorScheme="green">Chưa bán</Badge>
                  ) : (
                    <Badge colorScheme="red">Đã bán</Badge>
                  )}
                </Text>
              </Td>
              <Td>{numberFormat(vl.price ?? 0)}</Td>
              <Td>
                <ActionList
                  actions={["EDIT", "DELETE"]}
                  linkUpdate={"./update/" + vl.id}
                  onClickExits={() => accountDeleteMutation.mutate(vl.id)}
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate
          paginate={accountListQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

function FormSearch({ setFilter, filter, setPage }: IFormSearchProps) {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tên dịch vụ(note)",
      name: "service_note",
      type: "INPUT",
    },
    {
      label: "Tên CTV",
      name: "admin_name",
      type: "INPUT",
    },
    {
      label: "Thông tin (Private)",
      name: "private_info",
      type: "INPUT",
    },
    {
      label: "ID Account",
      name: "id",
      type: "INPUT",
    },
    {
      label: "Trạng thái",
      name: "status",
      type: "SELECT",
      selects: [
        {
          label: `Đã bán`,
          value: "1",
        },
        {
          label: `Chưa bán`,
          value: "2",
        },
      ],
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
