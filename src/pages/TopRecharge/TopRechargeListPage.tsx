import { topRecharge, topRechargeVirtual } from "@/apis/topRecharge";
import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import Paginate from "@/components/globals/Paginate";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import { Badge, Button, Td, Text, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TopRechargeListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const toast = useToast();
  const topRechargeListQuery = useQuery({
    queryKey: ["top-recharge-list", filter, page],
    queryFn: () => topRecharge.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const deleteMutate = useMutation({
    mutationFn: ({ id, virtual }: { id: number; virtual: boolean }) => {
      if (virtual) return topRechargeVirtual.delete(id);
      return topRecharge.delete(id);
    },
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      topRechargeListQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <CardCollection
        title="Quản lý top nạp"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              Tạo top nạp thẻ ảo
            </Button>
          </Link>
        }
      >
        <Text>
          Sử dụng bộ lọc để lọc theo domain. Khi lọc sẽ hiển thị theo thứ tự top
          nạp.
        </Text>
        <Text>
          Lọc theo tên miền sẽ tự động được hiển thị như ngoài shop từ cao xuống
          thấp và không thể sử dụng lọc khác
        </Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />

        <TableCustom
          thead={[
            "ID",
            "Domain",
            "Tên hiển thị",
            "Số tiền",
            "Thời gian",
            "Thao tác",
          ]}
        >
          {topRechargeListQuery.data?.data.data.map((vl) => (
            <Tr key={vl.id + (vl.name_virtual ?? "")}>
              <Td>#{vl.id}</Td>
              <Td>
                <Text>Provider ID: {vl.user?.provider_id}</Text>
                <Text>
                  Domain:
                  <Badge colorScheme="red" marginLeft="5px">
                    {vl.shop?.domain}
                  </Badge>
                </Text>
              </Td>
              <Td>{vl.user?.name ?? `${vl.name_virtual} (Ảo)`}</Td>
              <Td>{numberFormat(vl.price ?? 0)}</Td>
              <Td>
                <Text>
                  Tạo: {moment(vl.created_at).format("DD/MM/yyyy HH:mm")}
                </Text>
                <Text>
                  Cập nhật: {moment(vl.updated_at).format("DD/MM/yyyy HH:mm")}
                </Text>
              </Td>
              <Td>
                <ActionList
                  actions={
                    vl.name_virtual != null ? ["EDIT", "DELETE"] : ["DELETE"]
                  }
                  linkUpdate={"./update/" + vl.id}
                  onClickExits={() =>
                    deleteMutate.mutate({
                      id: vl.id,
                      virtual: vl.name_virtual != null,
                    })
                  }
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate
          paginate={topRechargeListQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
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
      label: "Tên người dùng",
      name: "name",
      type: "INPUT",
    },
    {
      label: "Tháng hiện tại",
      name: "time",
      type: "SELECT",
      selects: [
        {
          label: `Tháng trước`,
          value: "last-month",
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
