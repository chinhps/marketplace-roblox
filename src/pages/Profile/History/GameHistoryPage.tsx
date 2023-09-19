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
  Stack,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

export default function GameHistoryPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const dataQuery = useQuery({
    queryKey: ["game-history", page],
    queryFn: () => profileApi.historyService({ page }),
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
            Lịch sử chơi Game
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử các game đã chơi của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableCustom
          thead={["Thông tin", "Chi tiết", "Số lượt"]}
          caption="Lịch sử chơi Game"
        >
          {dataQuery?.data?.data.data.map((vl, index) => (
            <Tr key={index}>
              <Td>
                <Text as="b">{vl.service_name}</Text>
                <Text>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Text>
              </Td>
              <Td>
                <Stack>
                  <>
                    <Text as="b">Quà: {vl.default}</Text>
                  </>
                  <Text as="b" color="ocean.100">
                    Giá trị: {numberFormat(vl.price ?? 0)}
                  </Text>
                </Stack>
              </Td>
              <Td>
                <Text>{vl.quantity}</Text>
              </Td>
            </Tr>
          ))}
        </TableCustom>
        <Paginate paginate={dataQuery.data?.data.paginate} action={setPage} />
      </Flex>
    </>
  );
}
