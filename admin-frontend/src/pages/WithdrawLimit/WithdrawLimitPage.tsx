import { withdrawLimitApi } from "@/apis/withdrawLimit";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import UserInfo from "@/components/globals/UserInfo";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Button, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function WithdrawLimitPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const withdrawLimitQuery = useQuery({
    queryKey: ["withdrawal-limits", filter, page],
    queryFn: () => withdrawLimitApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const withdrawLimitDeleteMutation = useMutation({
    mutationFn: (id: number) => withdrawLimitApi.delete(id),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      withdrawLimitQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  return (
    <>
      <CardCollection
        title="QUẢN LÝ GIỚI HẠN RÚT trong tháng"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              THÊM MỚI
            </Button>
          </Link>
        }
      >
        <Text>Danh sách những người bị quản lý rút</Text>
        <Text>
          Lưu ý: Nếu admin không được quản lý rút thì sẽ bị chặn rút theo mặc
          định
        </Text>
        <Text>
          Lưu ý: Giới hạn là giới hạn trong tháng đó, Qua tháng sau thì số lượng
          đã rút về 0
        </Text>

        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableCustom
          thead={[
            "ID",
            "Tên người dùng",
            "Loại chặn",
            "Đã/Đang rút",
            "Giới hạn",
            "Kích hoạt",
            "Thao tác",
          ]}
        >
          {withdrawLimitQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>
                <UserInfo shop={vl.user.shop} user={vl.user} />
              </Td>
              <Td>{vl.withdraw_type.name}</Td>
              <Td>{numberFormat(vl.user_withdraw_sum_value,false)}</Td>
              <Td>{numberFormat(vl.withdraw_limit,false)}</Td>
              <Td>{vl.active}</Td>
              <Td>
                <ActionList
                  actions={["EDIT", "DELETE"]}
                  linkUpdate={"./update/" + vl.id}
                  onClickExits={() => withdrawLimitDeleteMutation.mutate(vl.id)}
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate
          paginate={withdrawLimitQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

function FormSearch({ setFilter, filter, setPage }: IFormSearchProps) {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tìm kiếm bằng tên miền",
      name: "domain",
      type: "INPUT",
    },
    {
      label: "Provider ID",
      name: "provider_id",
      type: "INPUT",
    },
    {
      label: "Tên người dùng",
      name: "username",
      type: "INPUT",
    },
    {
      label: "Sắp xếp theo ID",
      name: "sort_id",
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
