import { withdrawApi } from "@/apis/withdraw";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { IUpdateStatus } from "@/types/response/withdraw.type";
import { numberFormat } from "@/utils/function";
import { Button, HStack, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function WithdrawalsPartnerPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [page, setPage] = useState<number>(1);
  const dataQuery = useQuery({
    queryKey: ["withdrawal-limits", page],
    queryFn: () => withdrawApi.list({ page }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const updateStatusMutation = useMutation({
    mutationFn: (data: IUpdateStatus) => withdrawApi.updateStatus(data),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      dataQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  return (
    <>
      <CardCollection
        title="DANH SÁCH CÁC LỆNH RÚT TIỀN"
        fontSize="25px"
        button={
          <Link to="./create-transaction">
            <Button colorScheme="red" variant="outline">
              TẠO LỆNH RÚT TIỀN
            </Button>
          </Link>
        }
      >
        <Text>
          Danh sách các lệnh rút tiền! Chỉ quản trị viên mới có quyền để thực
          hiện thao tác! Lệnh chỉ có thể thao tác 1 lần duy nhất!
        </Text>
        <TableCustom
          thead={[
            "ID",
            "Thông tin",
            "Note",
            "Số tiền",
            "Trạng thái",
            "Ngày khởi tạo",
            "Thao tác",
          ]}
        >
          {dataQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>#{vl.id}</Td>
              <Td>Tên: {vl.admin.name}</Td>
              <Td>{vl.note}</Td>
              <Td>{numberFormat(vl.amount)}</Td>
              <Td>{vl.status}</Td>
              <Td>{moment(vl.created_at).format("DD/MM/yyyy HH:mm")}</Td>
              <Td>
                {vl.status === "PENDING" && (
                  <HStack>
                    <ActionList
                      icon={<FiCheck />}
                      onClickExits={() =>
                        updateStatusMutation.mutate({
                          id: vl.id,
                          status: "SUCCESS",
                        })
                      }
                      actions={["CUSTOM"]}
                    />
                    <ActionList
                      onClickExits={() =>
                        updateStatusMutation.mutate({
                          id: vl.id,
                          status: "CANCEL",
                        })
                      }
                      actions={["DELETE"]}
                    />
                  </HStack>
                )}
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate paginate={dataQuery.data?.data.paginate} action={setPage} />
      </CardCollection>
    </>
  );
}
