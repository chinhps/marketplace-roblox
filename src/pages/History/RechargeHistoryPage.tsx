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
import { rechargeApi } from "@/apis/history";
import { RechargeResponse } from "@/types/response/history.type";
import moment from "moment";
import Paginate from "@/components/globals/Paginate";
import UserInfo from "@/components/globals/UserInfo";

export default function RechargeHistoryPage({ idUser }: { idUser?: number }) {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState(() => {
    return idUser ? { user_id: idUser } : {};
  });
  const rechargeHistoriesQuery = useQuery({
    queryKey: ["recharge-list", filter, page, idUser],
    queryFn: () => rechargeApi.list({ page, filter }),
    cacheTime: 2 * 1000,
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
        title="Lịch sử nạp thẻ"
        fontSize="25px"
      >
        <Text>
          Lịch sử nạp thẻ. Chỉ có Admin và Support mới có thể thay đổi trạng
          thái! Chỉ thẻ thất bại mới có thể hoàn tiền và chỉ được 1 lần duy nhất
        </Text>
        {!idUser ? (
          <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        ) : null}
        <TableListRechargeHistory
          query={rechargeHistoriesQuery}
          data={rechargeHistoriesQuery.data?.data.data ?? []}
        />
        <Paginate
          paginate={rechargeHistoriesQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

export function TableListRechargeHistory({
  query,
  data,
}: {
  query: UseQueryResult;
  data: RechargeResponse[];
}) {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const purcahseRefundMutation = useMutation({
    mutationFn: ({ id, refund }: { id: number; refund: boolean }) =>
      rechargeApi.updateRefund(id, refund),
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
  const handleUpdateRefund = (id: number, refund: "yes" | "no") => {
    purcahseRefundMutation.mutate({
      id,
      refund: refund === "yes" ? false : true,
    });
  };

  return (
    <>
      <TableCustom
        thead={[
          "ID",
          "Tên người dùng",
          "Nạp thẻ",
          "Thông tin nạp",
          "Thời gian",
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
              <Text>Mệnh giá: {numberFormat(vl.price)}</Text>
              <Text>
                Trạng thái:{" "}
                <Badge
                  colorScheme={
                    vl.status === "SUCCESS"
                      ? "green"
                      : vl.status === "PENDING"
                      ? "gray"
                      : "red"
                  }
                >
                  {vl.status}
                </Badge>
              </Text>
              <Text>
                Loại:{" "}
                <Badge colorScheme="orange">{vl.recharge?.recharge_name}</Badge>
              </Text>
            </Td>
            <Td>
              {vl.detail.map((detail, index) => (
                <Text key={index}>
                  {detail.name}: {detail.value}
                </Text>
              ))}
            </Td>
            <Td>
              {vl.refund === "yes" ? (
                <Badge colorScheme="red">Hoàn tiền</Badge>
              ) : (
                <Badge colorScheme="green">Bình thường</Badge>
              )}
              <Text>
                Nạp: {moment(vl.created_at).format("DD/MM/yyyy HH:mm")}
              </Text>
              <Text>
                Duyệt: {moment(vl.updated_at).format("DD/MM/yyyy HH:mm")}
              </Text>
            </Td>
            <Td>
              {vl.status === "ERROR" && vl.refund === "no" && (
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
      label: "Provider ID",
      name: "provider_id",
      type: "INPUT",
    },
    {
      label: "Tên người dùng",
      name: "name",
      type: "INPUT",
    },
    {
      label: "Serial | Mã thẻ",
      name: "serialCode",
      type: "INPUT",
    },
    {
      label: "Lọc trạng thái",
      name: "status",
      type: "SELECT",
      selects: [
        {
          label: `Thành công`,
          value: "SUCCESS",
        },
        {
          label: `Thất bại`,
          value: "ERROR",
        },
        {
          label: `Đang chờ`,
          value: "PENDING",
        },
      ],
    },
    {
      label: "Lọc hoàn tiền",
      name: "refund",
      type: "SELECT",
      selects: [
        {
          label: `Hoàn tiền`,
          value: "1",
        },
        {
          label: `Bình thường`,
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
