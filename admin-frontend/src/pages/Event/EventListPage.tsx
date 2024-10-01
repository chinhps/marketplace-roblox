import { eventApi } from "@/apis/event";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { EventResponse } from "@/types/response/event.type";
import { Button, Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function EventListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const eventListQuery = useQuery({
    queryKey: ["plugin-list", filter, page],
    queryFn: () => eventApi.list({ page, filter }),
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
        title="Danh sách các sự kiện"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              THÊM MỚI
            </Button>
          </Link>
        }
      >
        <Text>Những sự kiện được kích hoạt ở cuối cùng sẽ được ưu tiên nếu có nhiều hơn 2 sự kiện được kích hoạt!</Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        <TableListPlugin data={eventListQuery.data?.data.data ?? []} />
        <Paginate
          paginate={eventListQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

export function TableListPlugin({ data }: { data: EventResponse[] }) {
  return (
    <>
      <TableCustom thead={["ID", "Tên", "Trạng thái", "Thông tin", "Thao tác"]}>
        {data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>{vl.name}</Td>
            <Td>{vl.active}</Td>
            <Td>
              {vl.data_public?.map((detail, index) => (
                <Text key={index} w="300px" overflow="hidden">
                  {detail.name}: {detail.value}
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
