import { serviceGroupApi } from "@/apis/service";
import ActionList from "@/components/globals/ActionList";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Image, Td, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ServiceGroupList() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const toast = useToast();
  const serviceGroupListQuery = useQuery({
    queryKey: ["service-group-list", filter, page],
    queryFn: () => serviceGroupApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const serviceGroupDeleteMutation = useMutation({
    mutationFn: (id: number) => serviceGroupApi.delete(id),
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
  const handleDeleteServiceGroup = (id: number) => {
    serviceGroupDeleteMutation.mutate(id);
  };
  return (
    <>
      <TableCustom
        thead={["ID", "Ưu tiên", "Tên", "Hình ảnh", "Kích hoạt", "Thao tác"]}
      >
        {serviceGroupListQuery.data?.data.data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>{vl.prioritize}</Td>
            <Td>{vl.name}</Td>
            <Td>
              <Image w="200px" src={vl.image} alt="image service group" />
            </Td>
            <Td>
              {vl.active === "ON" ? (
                <Badge colorScheme="green">Kích hoạt</Badge>
              ) : (
                <Badge colorScheme="red">Không hoạt động</Badge>
              )}
            </Td>
            <Td>
              <ActionList
                actions={["EDIT", "DELETE"]}
                linkUpdate={"./groups/update/" + vl.id}
                onClickExits={() => handleDeleteServiceGroup(vl.id)}
              />
            </Td>
          </Tr>
        ))}
      </TableCustom>
      <Paginate
        paginate={serviceGroupListQuery.data?.data.paginate}
        action={setPage}
      />
    </>
  );
}
