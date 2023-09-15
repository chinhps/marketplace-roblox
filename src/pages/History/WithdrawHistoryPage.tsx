import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { Badge, Box, HStack, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiCheck, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { withdrawHistoryApi } from "@/apis/history";
import {
  WithdrawHistoryResponse,
  WithdrawStatus,
  WithdrawType,
} from "@/types/response/history.type";
import Paginate from "@/components/globals/Paginate";
import UserInfo from "@/components/globals/UserInfo";
import { colorStatus, nameStatus, numberFormat } from "@/utils/function";
import moment from "moment";

export default function WithdrawHistoryPage({ idUser }: { idUser?: number }) {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState(() => {
    return idUser ? { user_id: idUser } : {};
  });
  const buyServiceHistoriesQuery = useQuery({
    queryKey: ["buy-service-history-list", filter, page, idUser],
    queryFn: () => withdrawHistoryApi.list({ page, filter }),
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
        title="Lịch sử dịch vụ"
        fontSize="25px"
      >
        <Text>
          Lịch sử dịch vụ bao gồm: Rút kim cương, mua/rút robux, gamepass,...
        </Text>
        <Text>Robox cần phải được duyệt 2 lần. </Text>
        {!idUser ? (
          <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        ) : null}
        <TableListWithdrawHistory
          query={buyServiceHistoriesQuery}
          data={buyServiceHistoriesQuery.data?.data.data ?? []}
        />
        <Paginate
          paginate={buyServiceHistoriesQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

function TableListWithdrawHistory({
  query,
  data,
}: {
  query: UseQueryResult;
  data: WithdrawHistoryResponse[];
}) {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const purcahseRefundMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: boolean }) =>
      withdrawHistoryApi.updateStatus(id, status),
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
  const handleUpdateStatus = (id: number, status: boolean) => {
    purcahseRefundMutation.mutate({
      id,
      status,
    });
  };

  return (
    <TableCustom
      thead={[
        "ID",
        "Tên người dùng",
        "Thông tin",
        "Trạng thái",
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
            {vl.withdraw_type === "DIAMOND" ? (
              <Badge colorScheme="purple">Rút kim cương</Badge>
            ) : vl.withdraw_type === "ROBUX" ? (
              <Badge colorScheme="orange">Rút Robux</Badge>
            ) : vl.withdraw_type === "BUY_ROBUX" ? (
              <Badge colorScheme="pink">Mua Robux</Badge>
            ) : (
              <Badge colorScheme="gray">Không xác định</Badge>
            )}
            <HStack mt=".5rem">
              <Badge colorScheme="purple">
                Giá trị: {numberFormat(vl.value, false)}
              </Badge>
              <Badge colorScheme="blue">
                Cost: {numberFormat(vl.cost, false)}
              </Badge>
            </HStack>
            <Box mt=".5rem">
              {vl.detail.map((detail, index) => (
                <Text key={index} w="230px" className="break-word">
                  {detail.name}: {detail.value}
                </Text>
              ))}
            </Box>
          </Td>
          <Td>
            <Badge colorScheme={colorStatus(vl.status)}>
              {nameStatus(vl.status)}
            </Badge>
            <Text>Task: {vl.task_number}</Text>
          </Td>
          <Td>
            <Text>Tạo: {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Text>
            <Text>
              Cập nhật: {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
            </Text>
          </Td>
          <Td>
            {vl.status !== "SUCCESS" && vl.status !== "CANCEL" && (
              <HStack
                bg={vl.status === "PROCESSING" ? "green.100" : "none"}
                p=".3rem"
                rounded="lg"
              >
                <ActionList
                  actions={["CUSTOM"]}
                  icon={<FiCheck />}
                  onClickExits={() => handleUpdateStatus(vl.id, true)}
                />
                <ActionList
                  actions={["DELETE"]}
                  onClickExits={() => handleUpdateStatus(vl.id, false)}
                />
              </HStack>
            )}
          </Td>
        </Tr>
      ))}
    </TableCustom>
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
      label: "Tên người dùng",
      name: "name",
      type: "INPUT",
    },
    {
      label: "Thông tin",
      name: "detail",
      placeholder: "Link, ID Game,...",
      type: "INPUT",
    },
    {
      label: "Loại rút",
      name: "withdraw_type",
      type: "SELECT",
      selects: Object.values(WithdrawType).map((vl) => {
        return {
          label: vl,
          value: vl,
        };
      }),
    },
    {
      label: "Trạng thái",
      name: "status",
      type: "SELECT",
      selects: Object.values(WithdrawStatus).map((vl) => {
        return {
          label: vl,
          value: vl,
        };
      }),
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
