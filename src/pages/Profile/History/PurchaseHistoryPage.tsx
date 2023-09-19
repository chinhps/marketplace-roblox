import profileApi from "@/apis/profile";
import Paginate from "@/components/global/Paginate/Paginate";
import TableCustom from "@/components/global/TableCustom/TableCustom";
import { token } from "@/utils/const";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Td,
  Tr,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

export default function PurchaseHistoryPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const dataQuery = useQuery({
    queryKey: ["purchase-history", page],
    queryFn: () => profileApi.historyPurchase({ page }),
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
            Lịch sử mua tài khoản
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử mua tài khoản của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableCustom
          thead={["Thông tin", "#ID", "Chi tiết", "Giá tiền"]}
          caption="Lịch sử mua tài khoản"
        >
          {dataQuery?.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>
                <Stack>
                  <Text as="b" color="ocean.100">
                    {vl.service_name}
                  </Text>
                  <Text>
                    {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                  </Text>
                </Stack>
              </Td>
              <Td>
                <Text as="b">#ID: {vl.account_id}</Text>
              </Td>
              <Td>
                <Stack>
                  {vl.detail.map((dt, index) => (
                    <Text key={index} as="b">
                      {dt.name}: {dt.value}
                    </Text>
                  ))}
                </Stack>
              </Td>
              <Td>
                <Stack>
                  <Text as="b" color="ocean.100">
                    Giá trị: {numberFormat(vl.price)}
                  </Text>
                  <Text as="b">Hoàn tiền: {vl.refund ? "Có" : "Không"}</Text>
                </Stack>
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate paginate={dataQuery.data?.data.paginate} action={setPage} />
      </Flex>
    </>
  );
}
