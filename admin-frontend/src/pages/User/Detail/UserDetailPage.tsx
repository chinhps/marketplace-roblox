import { userApi } from "@/apis/user";
import CardCollection from "@/components/globals/CardCollection";
import { UserResponse } from "@/types/response/user.type";
import { numberFormat } from "@/utils/function";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiBarChart, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { ReactElement, useState } from "react";
import PurchaseHistoryPage from "@/pages/History/PurchaseHistoryPage";
import ServiceHistoryPage from "@/pages/History/ServiceHistoryPage";
import RechargeHistoryPage from "@/pages/History/RechargeHistoryPage";
import WithdrawHistoryPage from "@/pages/History/WithdrawHistoryPage";
import { transactionApi } from "@/apis/transaction";
import { ITransactionCreate } from "@/types/response/transaction.type";
import ModelConfirm from "@/components/globals/Model/ModelConfirm";
import ModelBase from "@/components/globals/Model/ModelBase";
import TableCustom from "@/components/globals/TableCustom";
import moment from "moment";

export default function UserDetailPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const userDetailQuery = useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => userApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const blockUserMutation = useMutation({
    mutationFn: ({ id, block }: { id: number; block: boolean }) =>
      userApi.blockUser(id, block),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      userDetailQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const handleBlockUser = (block: boolean) => {
    blockUserMutation.mutate({
      id: Number(id),
      block: block,
    });
  };
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
        <Text>Double Click vào để có thể xem lịch sử thay đổi số dư.</Text>

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
              <Button
                colorScheme="red"
                size="sm"
                w="60%"
                mt="1rem"
                mx="auto"
                onClick={() =>
                  handleBlockUser(
                    userDetailQuery.data?.data.data.block === "off"
                  )
                }
              >
                {userDetailQuery.data?.data.data.block === "off"
                  ? "Chặn "
                  : "Bỏ chặn "}
                thành viên
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
        <Divider my="2rem" />
        {id ? <PurchaseHistoryPage idUser={Number(id)} /> : null}
        <Divider my="2rem" />
        {id ? <RechargeHistoryPage idUser={Number(id)} /> : null}
        <Divider my="2rem" />
        {id ? <ServiceHistoryPage idUser={Number(id)} /> : null}
        <Divider my="2rem" />
        {id ? <WithdrawHistoryPage idUser={Number(id)} /> : null}
      </CardCollection>
    </>
  );
}

function CreateTransactionUser({ data }: { data: UserResponse | undefined }) {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onClose: onClosePopup,
  } = useDisclosure();
  const [componentList, setComponentList] = useState<ReactElement>();
  const [page, _] = useState<number>(1);
  const [transactionType, setTransactionType] = useState<
    "increase" | "decrease"
  >();
  const [currency, setCurrency] = useState<"PRICE" | "ROBUX" | "DIAMOND">();
  const [valueCurrency, setValueCurrency] = useState<number>();
  const [note, setNote] = useState<string>();

  const transactionMutation = useMutation({
    mutationFn: (params: ITransactionCreate) => transactionApi.create(params),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });

  const transactionUseMutate = useMutation({
    mutationFn: (type: "price" | "diamond" | "robux") =>
      transactionApi.list({ page, filter: { user_id: id }, type: type }),
    onSuccess: ({ data }) => {
      onOpenPopup();
      setComponentList(
        <TableCustom thead={["ID", "Giá trị", "Ghi chú", "Ngày tạo"]}>
          {data.data.map((vl) => (
            <Tr>
              <Td>{vl.id}</Td>
              <Td>{vl.value}</Td>
              <Td>{vl.note}</Td>
              <Td>{moment(vl.created_at).format("DD/MM/yy hh:mm")}</Td>
            </Tr>
          ))}
        </TableCustom>
      );
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const handleSubmit = () => {
    if (currency && id && transactionType && valueCurrency && note) {
      transactionMutation.mutate({
        user_id: Number(id),
        currency: currency,
        transaction_type: transactionType,
        value: valueCurrency,
        note: note,
      });
    }
  };

  return (
    <>
      <ModelBase isOpen={isOpenPopup} onClose={onClosePopup} size="5xl">
        <Text>Hiển thị 30 giao dịch gần nhất!</Text>
        {componentList}
      </ModelBase>
      <ModelConfirm
        isOpen={isOpen}
        onClose={onClose}
        isLoading={false}
        TextData={"Bạn có chắc muốn thực hiện không?"}
        handleConfirm={() => {
          handleSubmit();
          onClose();
        }}
        children={null}
      />
      <HStack spacing="1.5rem">
        <VStack>
          <IconButton
            variant="outline"
            colorScheme={transactionType === "increase" ? "green" : "gray"}
            aria-label="plus"
            onClick={() => setTransactionType("increase")}
            size="xl"
            icon={<FiTrendingUp />}
          />
          <IconButton
            variant="outline"
            colorScheme={transactionType === "decrease" ? "red" : "gray"}
            aria-label="Minus"
            onClick={() => setTransactionType("decrease")}
            size="xl"
            icon={<FiTrendingDown />}
          />
        </VStack>
        <VStack w="100%" alignItems="flex-start">
          <HStack>
            <Button
              isActive={currency === "PRICE"}
              leftIcon={<FiBarChart />}
              colorScheme="pink"
              variant="outlineAuth"
              onDoubleClick={() => transactionUseMutate.mutate("price")}
              onClick={() => setCurrency("PRICE")}
            >
              Số dư
            </Button>
            <Button
              isActive={currency === "DIAMOND"}
              leftIcon={<FiBarChart />}
              colorScheme="pink"
              variant="outlineAuth"
              onDoubleClick={() => transactionUseMutate.mutate("diamond")}
              onClick={() => setCurrency("DIAMOND")}
            >
              Kim cương
            </Button>
            <Button
              isActive={currency === "ROBUX"}
              leftIcon={<FiBarChart />}
              colorScheme="pink"
              variant="outlineAuth"
              onDoubleClick={() => transactionUseMutate.mutate("robux")}
              onClick={() => setCurrency("ROBUX")}
            >
              Robux
            </Button>
          </HStack>
          <Box my=".5rem" w="100%">
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
          </Box>
          <Input
            variant="auth"
            type="number"
            onChange={(e) => setValueCurrency(Number(e.target.value))}
            placeholder={
              transactionType === "increase"
                ? `Nhập số ${currency ?? "???"} được cộng thêm`
                : transactionType === "decrease"
                ? `Nhập số ${currency ?? "???"} bị trừ đi`
                : "Vui lòng chọn kiểu trước"
            }
          />
          <Input
            variant="auth"
            placeholder="Lý do thực hiện"
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            isDisabled={
              typeof transactionType === "undefined" ||
              typeof currency === "undefined"
            }
            onClick={onOpen}
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
    <HStack justifyContent="space-between" w="100%" fontSize="16px" my={2}>
      <Text>
        <Text as="b">{nameCash} hiện tại:</Text> {numberFormat(valueReal)}
      </Text>
      <Text>
        <Text as="b">{nameCash} hiển thị:</Text> {numberFormat(valueTemp)}
      </Text>
      {/* <Button colorScheme="teal" size="sm">
        Cập nhật lại
      </Button> */}
    </HStack>
  );
}
