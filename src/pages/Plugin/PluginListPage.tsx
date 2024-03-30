import { pluginApi } from "@/apis/plugin";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Tag, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { PluginResponse } from "@/types/response/plugin.type";
import FormBase from "@/components/globals/FormBase";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import Paginate from "@/components/globals/Paginate";

export default function PluginListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const pluginListQuery = useQuery({
    queryKey: ["plugin-list", filter, page],
    queryFn: () => pluginApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  return (
    <>
      <CardCollection title="Danh sách các Plugins" fontSize="25px">
        <Text>Nếu shop không được chỉ định có thể không được hiển thị!</Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableListPlugin data={pluginListQuery.data?.data.data ?? []} />
        <Paginate
          paginate={pluginListQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

export function TableListPlugin({ data }: { data: PluginResponse[] }) {
  return (
    <>
      <TableCustom
        thead={["ID", "Tên", "Trạng thái", "Hiển thị", "Thông tin", "Thao tác"]}
      >
        {data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>{vl.name}</Td>
            <Td>{vl.status}</Td>
            <Td>
              <VStack spacing={1} alignContent="flex-start">
                <Badge colorScheme="orange">
                  {vl.excluding === "ON"
                    ? "Tất cả ngoại trừ"
                    : "Chỉ các domain sau"}
                </Badge>
                {vl.shop_list?.map((shopItem, index) => (
                  <Tag key={index} w="auto">
                    {shopItem.domain}
                  </Tag>
                ))}
              </VStack>
            </Td>
            <Td>
              {vl.data_public?.map((detail, index) => (
                <Text key={index} w="300px" overflow="hidden">
                  {detail.name}: {detail.value.toString()}
                </Text>
              ))}
            </Td>
            <Td>
              <ActionList actions={["EDIT"]} linkUpdate={"./update/" + vl.id} />
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
      label: "Tên",
      name: "name",
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
