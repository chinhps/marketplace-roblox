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

export default function WithdrawHistoryPage() {
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
            Lịch sử rút và mua vật phẩm
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử rút và mua vật phẩm của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableCustom
          thead={["Mã Đơn", "Loại", "Thông tin", "Thời Gian", "Trạng thái"]}
          caption="Lịch sử rút và mua vật phẩm"
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
              <Td>
                <Stack>
                  <Text>
                    {vl.withdraw_type == "GAMEPASS" ? "Giá tiền" : "Số lượng"}:{" "}
                    {numberFormat(vl.value, false)}
                  </Text>
                  {vl.detail.map((dt, index) => (
                    <Text key={index} maxW="270px" textOverflow="ellipsis" overflow="hidden">
                      {dt.name}: {dt.value}
                    </Text>
                  ))}
                </Stack>
              </Td>
              <Td>
                <Text>
                  Tạo: {moment(vl.created_at).format("DD/MM/yyyy HH:mm")}
                </Text>
                <Text>
                  Cập nhật: {moment(vl.updated_at).format("DD/MM/yyyy HH:mm")}
                </Text>
              </Td>
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
