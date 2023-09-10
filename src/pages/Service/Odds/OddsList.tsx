import { serviceOddsApi } from "@/apis/service";
import ActionList from "@/components/globals/ActionList";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

export default function OddsList() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const toast = useToast();
  const serviceOddsListQuery = useQuery({
    queryKey: ["service-odds-list", filter, page],
    queryFn: () => serviceOddsApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const serviceOddsDeleteMutation = useMutation({
    mutationFn: (id: number) => serviceOddsApi.delete(id),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const handleDelete = (id: number) => {
    serviceOddsDeleteMutation.mutate(id);
  };
  return (
    <>
      <TableCustom
        thead={[
          "ID",
          "Tỷ lệ admin",
          "Tỷ lệ người dùng",
          "Lượt sử dụng",
          "Ngày tạo",
          "Thao tác",
        ]}
      >
        {serviceOddsListQuery.data?.data.data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>
              <Text>
                DẠNG QUÀ:{" "}
                <Badge colorScheme="green">{vl.odds_admin_type}</Badge>
              </Text>
              <Text>{vl.odds_admin}</Text>
            </Td>
            <Td>
              <Text>
                DẠNG QUÀ: <Badge colorScheme="green">{vl.odds_user_type}</Badge>
              </Text>
              <Text>{vl.odds_user}</Text>
            </Td>
            <Td>{vl.countUse}</Td>
            <Td>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Td>
            <Td>
              <ActionList
                actions={["DELETE"]}
                onClickExits={() => handleDelete(vl.id)}
              />
            </Td>
          </Tr>
        ))}
      </TableCustom>
      <Paginate
        paginate={serviceOddsListQuery.data?.data.paginate}
        action={setPage}
      />
    </>
  );
}
