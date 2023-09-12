import { userApi } from "@/apis/user";
import CardCollection from "@/components/globals/CardCollection";
import { UserResponse } from "@/types/response/user.type";
import { numberFormat } from "@/utils/function";
import {
  Badge,
  Button,
  Center,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiBarChart, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { TableListPurchaseHistory } from "@/pages/History/PurchaseHistoryPage";
import { TableListServiceHistory } from "@/pages/History/ServiceHistoryPage";

export default function UserDetailPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const userDetailQuery = useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => userApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });

  /****----------------
   *      END-HOOK
  ----------------****/
  return (
    <>
      <CardCollection
        title={`Thông tin thành viên #${id}`}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>
          Nơi kiểm tra thông tin hoạt động của thành viên, thao tác chặn,...
        </Text>
        <Text>Thời gian tính toán có thể tốn ít thời gian.</Text>

        <SimpleGrid columns={6} gap="1rem" mt="2rem">
          <GridItem textAlign="right" fontSize="18px" colSpan={2}>
            <HStack spacing="2rem" justifyContent="center">
              <VStack alignItems="flex-end">
                <Text>#ID</Text>
                <Text>Loại người dùng</Text>
                <Text>Tên miền</Text>
                <Text>Tên hiển thị</Text>
                <Text>Tên tài khoản</Text>
                <Text>Provider ID</Text>
                <Text>Kích hoạt</Text>
                <Text>Chặn</Text>
              </VStack>
              <VStack alignItems="flex-start">
                <Text>{userDetailQuery.data?.data.data.id}</Text>
                <Text>
                  {userDetailQuery.data?.data.data.admin ? (
                    <Badge colorScheme="pink">
                      {userDetailQuery.data?.data.data.admin.admin_type} (VIP)
                    </Badge>
                  ) : (
                    <Badge colorScheme="orange">Thành viên</Badge>
                  )}
                </Text>
                <Text>
                  <Badge colorScheme="green">
                    {userDetailQuery.data?.data.data.shop.domain}
                  </Badge>
                </Text>
                <Text>{userDetailQuery.data?.data.data.name}</Text>
                <Text>{userDetailQuery.data?.data.data.username}</Text>
                <Text>{userDetailQuery.data?.data.data.provider_id}</Text>
                <Text>
                  {userDetailQuery.data?.data.data.active === "on" ? (
                    <Badge colorScheme="green">Đã kích hoạt</Badge>
                  ) : (
                    <Badge colorScheme="red">Chưa kích hoạt</Badge>
                  )}
                </Text>
                <Text>
                  {userDetailQuery.data?.data.data.block === "on" ? (
                    <Badge colorScheme="red">Đã chặn</Badge>
                  ) : (
                    <Badge colorScheme="green">Bình thường</Badge>
                  )}
                </Text>
              </VStack>
            </HStack>
            <Center>
              <Button colorScheme="red" size="sm" w="60%" mt="1rem" mx="auto">
                Chặn thành viên
              </Button>
            </Center>
          </GridItem>
          <GridItem fontSize="18px" colSpan={4}>
            <Heading as="h2" size="md" mb="1rem">
              Thao tác thành viên
            </Heading>
            <CreateTransactionUser data={userDetailQuery.data?.data.data} />
          </GridItem>
        </SimpleGrid>
        <Heading as="h2" size="md" mb="1rem" mt="2rem">
          Lịch sử mua tài khoản
        </Heading>
        <TableListPurchaseHistory />
        <Heading as="h2" size="md" mb="1rem" mt="2rem">
          Lịch sử trò chơi
        </Heading>
        <TableListServiceHistory />
      </CardCollection>
    </>
  );
}

function CreateTransactionUser({ data }: { data: UserResponse | undefined }) {
  const [plusCash, setPlusCash] = useState<boolean>();
  return (
    <>
      <HStack spacing="1.5rem">
        <VStack>
          <IconButton
            variant="outline"
            colorScheme={plusCash === true ? "green" : "gray"}
            aria-label="plus"
            onClick={() => setPlusCash(true)}
            size="xl"
            icon={<FiTrendingUp />}
          />
          <IconButton
            variant="outline"
            colorScheme={plusCash === false ? "red" : "gray"}
            aria-label="Minus"
            onClick={() => setPlusCash(false)}
            size="xl"
            icon={<FiTrendingDown />}
          />
        </VStack>
        <VStack w="100%" alignItems="flex-start">
          <HStack>
            <Button
              leftIcon={<FiBarChart />}
              colorScheme="pink"
              variant="outlineAuth"
            >
              LS Số dư
            </Button>
            <Button
              leftIcon={<FiBarChart />}
              colorScheme="pink"
              variant="outlineAuth"
            >
              LS Kim cương
            </Button>
            <Button
              leftIcon={<FiBarChart />}
              colorScheme="pink"
              variant="outlineAuth"
            >
              LS Robux
            </Button>
          </HStack>
          <TransactionValueShow
            nameCash="Số dư"
            valueReal={data?.transactions_price_sum_price ?? 0}
            valueTemp={data?.price_temporary ?? 0}
          />
          <TransactionValueShow
            nameCash="Kim cương"
            valueReal={data?.transactions_diamond_sum_diamond ?? 0}
            valueTemp={data?.diamond_temporary ?? 0}
          />
          <TransactionValueShow
            nameCash="Robux"
            valueReal={data?.transactions_robux_sum_robux ?? 0}
            valueTemp={data?.robux_temporary ?? 0}
          />
          <Input
            variant="auth"
            placeholder={
              plusCash
                ? "Nhập số tiền được cộng thêm"
                : plusCash === false
                ? "Nhập số tiền bị trừ đi"
                : "Vui lòng chọn kiểu trước"
            }
          />
          <Button
            isDisabled={typeof plusCash === "undefined"}
            variant="auth"
            w="100%"
          >
            Thực hiện
          </Button>
        </VStack>
      </HStack>
    </>
  );
}

function TransactionValueShow({
  nameCash,
  valueReal,
  valueTemp,
}: {
  nameCash: string;
  valueReal: number;
  valueTemp: number;
}) {
  return (
    <HStack justifyContent="space-between" w="100%" fontSize="16px">
      <Text>
        <Text as="b">{nameCash} hiện tại:</Text> {numberFormat(valueReal)}
      </Text>
      <Text>
        <Text as="b">{nameCash} hiển thị:</Text> {numberFormat(valueTemp)}
      </Text>
      <Button colorScheme="teal" size="sm">
        Cập nhật lại
      </Button>
    </HStack>
  );
}
