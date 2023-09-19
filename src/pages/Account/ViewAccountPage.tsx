import { accountApi } from "@/apis/games/accountApi";
import CarouselsImage from "@/components/global/CarouselsImage/CarouselsImage";
import ModelConfirm from "@/components/global/Model/ModalConfirm";
import Account from "@/components/global/Service/Account";
import Skeleton from "@/components/global/Skeleton/Skeleton";
import { ATM_DISCOUNT, customToast } from "@/utils/const";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Heading,
  Img,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function ViewAccountPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const toast = useToast(customToast);
  const accountBuyMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return accountApi.buyAccount(id);
    },
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      onCloseConfirm();
    },
    onError: () => {
      onCloseConfirm();
    },
  });
  const accountDetailQuery = useQuery({
    queryKey: ["account-detail", id],
    queryFn: () => accountApi.accountDetail(Number(id)),
    enabled: !!id,
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  /****----------------
   *      Handle
  ----------------****/
  const handleBuy = () => {
    if (id) {
      accountBuyMutation.mutate({
        id: Number(id),
      });
    }
  };
  /****----------------
   *      END-Handle
  ----------------****/

  return (
    <>
      <ModelConfirm
        isLoading={accountBuyMutation.isLoading}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        handleConfirm={handleBuy}
        TextData={`Bạn có chắc muốn mua #${id}?`}
        children={null}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
        <GridItem bg="main.item" p={5} rounded="md">
          {accountDetailQuery.isLoading ? (
            <Skeleton />
          ) : (
            <CarouselsImage
              thumb={true}
              popup={true}
              listImages={accountDetailQuery.data?.data.data.images ?? []}
            />
          )}
        </GridItem>
        <GridItem
          bg="main.item"
          p={5}
          rounded="md"
          position="relative"
          overflow="hidden"
        >
          {accountDetailQuery.data?.data.data.status === "SOLD" && (
            <>
              <Center
                userSelect="none"
                zIndex={5}
                position="absolute"
                inset={0}
              >
                <Img src="/images/sold.png" />
              </Center>
              <Box
                position="absolute"
                inset={0}
                bg="black.100"
                zIndex={1}
                opacity={0.7}
              />
            </>
          )}

          <VStack gap={3}>
            <Box
              w="100%"
              backgroundImage="/bg-1.jpeg"
              backgroundSize="cover"
              color="white"
              rounded="md"
              py={3}
              px={5}
            >
              <Text fontSize="15px">TÀI KHOẢN</Text>
              <Heading as="h2" fontSize="25px">
                Mã số: {id}
              </Heading>
            </Box>
            <Flex
              w="100%"
              justifyContent="space-between"
              p={5}
              bg="red.250"
              rounded="md"
              alignItems="center"
            >
              <Box>
                <Text color="red.600" fontSize="sm">
                  THẺ CÀO
                </Text>
                {accountDetailQuery.data?.data.data.price && (
                  <Text fontWeight="bold" color="red.600" fontSize="25px">
                    {numberFormat(
                      accountDetailQuery.data?.data.data.price ?? 0
                    )}
                  </Text>
                )}
              </Box>
              <Text fontSize="sm" color="red.600">
                hoặc
              </Text>
              <Box>
                <Text color="red.600" fontSize="sm">
                  ATM/MOMO chỉ cần
                </Text>
                {accountDetailQuery.data?.data.data.price && (
                  <Text fontWeight="bold" color="red.600" fontSize="25px">
                    {numberFormat(
                      (accountDetailQuery.data?.data.data.price ?? 0) *
                        ATM_DISCOUNT
                    )}
                  </Text>
                )}
              </Box>
            </Flex>
            {accountDetailQuery.isLoading ? (
              <Skeleton w="100%" height="100px" />
            ) : (
              <Box w="100%" p={5} bg="white.100" rounded="md">
                <Text as="b" mb={2}>
                  Thông tin
                </Text>

                <Box
                  dangerouslySetInnerHTML={{
                    __html: accountDetailQuery.data?.data.data.note ?? "",
                  }}
                />
              </Box>
            )}
            <Button
              w="100%"
              isLoading={
                accountBuyMutation.isLoading || accountDetailQuery.isLoading
              }
              leftIcon={<FaShoppingCart />}
              onClick={onOpenConfirm}
              colorScheme="red"
              rounded="md"
              fontSize="xl"
              py="2rem"
            >
              MUA NGAY
            </Button>
            <Link to="/help">
              <Text as="b" color="white.100">
                Mua bằng ATM / MOMO Tại đây
              </Text>
            </Link>
          </VStack>
        </GridItem>
      </SimpleGrid>
      {/* RECOMMENDS ACCOUNTS */}
      <RecomendAccount />
    </>
  );
}

function RecomendAccount() {
  const recommendsQuery = useQuery({
    queryKey: ["recommends-accounts"],
    queryFn: () => accountApi.recommends(),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Box mt="2rem">
        <Heading color="white.100" as="h2" fontSize="20px" mb={5}>
          TÀI KHOẢN ĐỀ XUẤT
        </Heading>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
          gap={5}
          px={{ base: 2, lg: 0 }}
          mt={{ base: "2rem", lg: 0 }}
        >
          {recommendsQuery.isLoading
            ? new Array(5)
                .fill(0)
                .map((_, index) => <Account.loading key={index} />)
            : recommendsQuery.data?.data.data.map((account) => (
                <Account key={account.id} data={account} />
              ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
