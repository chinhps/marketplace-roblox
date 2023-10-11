import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Badge, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiCornerUpRight, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { purchaseApi } from "@/apis/history";
import { PurchaseResponse } from "@/types/response/history.type";
import moment from "moment";
import Paginate from "@/components/globals/Paginate";
import UserInfo from "@/components/globals/UserInfo";

export default function PurchaseHistoryPage({ idUser }: { idUser?: number }) {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState(() => {
    return idUser ? { user_id: idUser } : {};
  });
  const purchaseHistoriesQuery = useQuery({
    queryKey: ["purchase-list", filter, page, idUser],
    queryFn: () => purchaseApi.list({ page, filter }),
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
        padding={idUser ? "0" : undefined}
        title="Lịch sử mua tài khoản"
        fontSize="25px"
      >
        <Text>
          Lịch sử mua tài khoản. Chỉ có Admin và Support mới có thể thay đổi
          trạng thái! CTV không nhận được tiền nếu bị HOÀN TIỀN
        </Text>
        <Text>Thay đổi trạng thái không tự động hoàn tiền cho khách!</Text>
        {!idUser ? (
          <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        ) : null}
        <TableListPurchaseHistory
          query={purchaseHistoriesQuery}
          data={purchaseHistoriesQuery.data?.data.data ?? []}
        />
        <Paginate
          paginate={purchaseHistoriesQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

export function TableListPurchaseHistory({
  query,
  data,
}: {
  query: UseQueryResult;
  data: PurchaseResponse[];
}) {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const purcahseRefundMutation = useMutation({
    mutationFn: ({ id, refund }: { id: number; refund: boolean }) =>
      purchaseApi.updateRefund(id, refund),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      query.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const handleUpdateRefund = (id: number, refund: "YES" | "NO") => {
    purcahseRefundMutation.mutate({
      id,
      refund: refund === "YES" ? false : true,
    });
  };

  return (
    <>
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
        {data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>
              <UserInfo shop={vl.shop} user={vl.user} />
            </Td>
            <Td>
              <Text>ACC: #{vl.account_id}</Text>
              <Text>
                <Badge colorScheme="green">{numberFormat(vl.price)}</Badge>
              </Text>
            </Td>
            <Td>
              {vl.detail_private.map((detail, index) => (
                <Text key={index}>
                  {detail.name}: {detail.value}
                </Text>
              ))}
            </Td>
            <Td>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Td>
            <Td>
              {vl.refund === "YES" ? (
                <Badge colorScheme="red">Hoàn tiền</Badge>
              ) : (
                <Badge colorScheme="green">Bình thường</Badge>
              )}
            </Td>
            <Td>
              {vl.refund === "NO" && (
                <ActionList
                  actions={["CUSTOM"]}
                  icon={<FiCornerUpRight />}
                  onClickExits={() => handleUpdateRefund(vl.id, vl.refund)}
                />
              )}
            </Td>
          </Tr>
        ))}
      </TableCustom>
    </>
  );
}

function FormSearch({ setFilter, filter, setPage }: IFormSearchProps) {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tên miền",
      name: "domain",
      type: "INPUT",
    },
    {
      label: "Tên khách",
      name: "name",
      type: "INPUT",
    },
    {
      label: "Thông tin: Tài khoản,...",
      name: "detail",
      type: "INPUT",
    },
    {
      label: "#ID ACCOUNT",
      name: "account_id",
      type: "INPUT",
    },
    {
      label: "Trạng thái",
      name: "refund",
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
