import profileApi from "@/apis/profile";
import Paginate from "@/components/global/Paginate/Paginate";
import TableCustom from "@/components/global/TableCustom/TableCustom";
import { token } from "@/utils/const";
import { colorStatus, nameStatus, numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

export default function WithdrawHistory() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const dataQuery = useQuery({
    queryKey: ["purchase-history", page],
    queryFn: () => profileApi.historyWithdraw({ page }),
    retry: false,
    cacheTime: 120000,
    enabled: !!token(), // Only fetch data user when have token ,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <Flex flexDirection="column" gap={5}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Lịch sử rút và mua Robux
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử rút và mua Robux của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableCustom
          thead={[
            "Mã Đơn",
            "Loại",
            "Số Robux",
            "Thông tin",
            "Thời Gian",
            "Trạng thái",
          ]}
          caption="Lịch sử rút và mua Robux"
        >
          {dataQuery?.data?.data.data.map((vl, index) => (
            <Tr key={index}>
              <Td>#{vl.id}</Td>
              <Td>
                <Text
                  as="b"
                  color={vl.withdraw_type == "DIAMOND" ? "green" : "yellow"}
                >
                  {vl.withdraw_type}
                </Text>
              </Td>
              <Td>{numberFormat(vl.value, false)}</Td>
              <Td>
                <Stack>
                  {vl.detail.map((dt, index) => (
                    <Text key={index}>
                      {dt.name}: {dt.value}
                    </Text>
                  ))}
                </Stack>
              </Td>
              <Td>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Td>
              <Td>
                <Text as="b" fontSize="sm" color={colorStatus(vl.status)}>
                  {nameStatus(vl.status)}
                </Text>
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate paginate={dataQuery.data?.data.paginate} action={setPage} />
      </Flex>
    </>
  );
}
