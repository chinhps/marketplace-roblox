import profileApi from "@/apis/profile";
import Paginate from "@/components/global/Paginate/Paginate";
import TableCustom from "@/components/global/TableCustom/TableCustom";
import { token } from "@/utils/const";
import { colorStatus, numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  Stack,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import moment from "moment";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function RechargeHistoryPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const dataQuery = useQuery({
    queryKey: ["recharge-history", page],
    queryFn: () => profileApi.historyRecharge({ page }),
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
            Lịch sử nạp thẻ
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử nạp thẻ của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableCustom
          thead={["Thẻ nạp", "Mã thẻ/Seri", "M.giá/T.nhận"]}
          caption="Lịch sử nạp thẻ (Thực nhận chưa tính khuyến mãi)"
        >
          {dataQuery?.data?.data.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>
                <Stack spacing={2}>
                  <Text as="b">{vl.recharge_type}</Text>
                  <Text>
                    {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                  </Text>
                  <Text as="b" color={colorStatus(vl.status)}>
                    {vl.status}
                  </Text>
                </Stack>
              </Td>
              <Td>
                <Stack>
                  {vl.detail.map((dt, index) => (
                    <Text key={index}>
                      {dt.name}: <Text as="b">{dt.value}</Text>
                    </Text>
                  ))}
                </Stack>
              </Td>
              <Td>
                <Stack>
                  <StatusIconWithPrice
                    icon={FaChevronUp}
                    text="Gửi Thẻ:"
                    price={vl.price}
                  />
                  <StatusIconWithPrice
                    icon={FaChevronDown}
                    text="Nhận:"
                    price={vl.status === "SUCCESS" ? vl.price : 0}
                  />
                  <Flex alignItems="center">
                    <Text as="b" lineHeight={2} ml={2}>
                      Hoàn tiền:
                    </Text>
                    <Text ml={2}>{vl.refund ? "Có" : "Không"}</Text>
                  </Flex>
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

function StatusIconWithPrice({
  icon,
  text,
  price,
}: {
  icon: React.ElementType;
  text: string;
  price: number;
}) {
  return (
    <Flex alignItems="center">
      <Icon as={icon} w="10px" />
      <Text as="b" ml={2}>
        {text}
      </Text>
      <Text ml={2}>{numberFormat(price)}</Text>
    </Flex>
  );
}
