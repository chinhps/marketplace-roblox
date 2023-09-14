import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import TableCustom from "@/components/globals/TableCustom";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import {
  Badge,
  Box,
  Button,
  HStack,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { serviceHistoryApi } from "@/apis/history";
import {
  IServiceHistoryDetail,
  ServiceHistoryResponse,
} from "@/types/response/history.type";
import Paginate from "@/components/globals/Paginate";
import moment from "moment";
import ModelBase from "@/components/globals/Model/ModelBase";
import UserInfo from "@/components/globals/UserInfo";

export default function ServiceHistoryPage({ idUser }: { idUser?: number }) {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState(() => {
    return idUser ? { user_id: idUser } : {};
  });
  const serviceHistoriesQuery = useQuery({
    queryKey: ["service-history-list", filter, page],
    queryFn: () => serviceHistoryApi.list({ page, filter }),
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
        title="Lịch sử trò chơi"
        fontSize="25px"
      >
        <Text>Lịch sử trò chơi, Xem thêm để xem các quà trúng được.</Text>
        {!idUser ? (
          <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        ) : null}
        <TableListServiceHistory
          data={serviceHistoriesQuery.data?.data.data ?? []}
        />
        <Paginate
          paginate={serviceHistoriesQuery.data?.data.paginate}
          action={setPage}
        />
      </CardCollection>
    </>
  );
}

export function TableListServiceHistory({
  data,
}: {
  data: ServiceHistoryResponse[];
}) {
  const [details, setDetails] = useState<Array<IServiceHistoryDetail>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModelBase
        isOpen={isOpen}
        onClose={onClose}
        children={
          <>
            {details.map((detail, index) => (
              <Box key={index} mb="1rem">
                <Text>Tên: {detail.name}</Text>
                <Text>ID Gift: {detail.service_gift_id}</Text>
              </Box>
            ))}
          </>
        }
      />
      <TableCustom
        thead={["ID", "Tên người dùng", "Thông tin", "Giá trị", "Thời gian"]}
      >
        {data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>
              <UserInfo shop={vl.shop} user={vl.user} />
            </Td>
            <Td>
              <VStack alignItems="flex-start">
                <Badge colorScheme="purple">
                  Tên dịch vụ: {vl.service.note}
                </Badge>
                <Badge>Thông tin: {vl.detail.default}</Badge>
                <HStack>
                  <Badge colorScheme="orange">Số lượng: {vl.quantity}</Badge>
                  <Button
                    size="sm"
                    colorScheme="facebook"
                    onClick={() => {
                      setDetails(vl.detail.details);
                      onOpen();
                    }}
                  >
                    Xem thêm
                  </Button>
                </HStack>
              </VStack>
            </Td>
            <Td>
              <Badge colorScheme="green">{numberFormat(vl.price)}</Badge>
            </Td>
            <Td>
              <Text>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Text>
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
      label: "Tên người dùng",
      name: "name",
      type: "INPUT",
    },
    {
      label: "Tên dịch vụ",
      name: "service_name",
      type: "INPUT",
    },
    {
      label: "Tên quà nhận được",
      name: "gift_name",
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
