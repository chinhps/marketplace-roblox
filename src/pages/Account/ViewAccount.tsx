import CarouselsImage from "@/components/global/CarouselsImage/CarouselsImage";
import Account from "@/components/global/Service/Account";
import { IViewAccount } from "@/types/response.type";
import { ATM_DISCOUNT } from "@/utils/const";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ViewAccount() {
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const handleClick = (id: number) => {
    onOpenConfirm();
  };

  const OneAccountBuy: IViewAccount = {
    id: 30503,
    name: "ACC BLOX FRUITS T\u1ef0 CH\u1eccN",
    thumb: "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317942643.png",
    cash: 1200000,
    images: [
      "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317428154.png",
      "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317299641.png",
      "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317503092.png",
      "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317723644.png",
      "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317883773.png",
      "https://quanly.gameroblox.vn/upload/doanhmuc/1679414317427867.png",
      "https://quanly.gameroblox.vn/upload/doanhmuc/167941431752849.png",
    ],
    description: "Max Level + T\u1ed9c Th\u1ecf V4 Full Gear C\u1ef1c Ngon",
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
        <GridItem bg="white.500" p={5} rounded="2xl">
          <CarouselsImage
            thumb={true}
            popup={true}
            listImages={
              (OneAccountBuy?.images.length > 0
                ? OneAccountBuy?.images
                : [OneAccountBuy?.thumb]) ?? []
            }
          />
        </GridItem>
        <GridItem bg="white.500" p={5} rounded="2xl">
          <VStack gap={3}>
            <Box
              w="100%"
              backgroundImage="/bg-1.jpeg"
              backgroundSize="cover"
              color="white"
              rounded="2xl"
              py={3}
              px={5}
            >
              <Heading as="h2" fontSize="25px">
                Mã số: {OneAccountBuy?.id}
              </Heading>
              <Text fontSize="15px">DANH MỤC: {OneAccountBuy?.name}</Text>
            </Box>
            <Flex
              w="100%"
              justifyContent="space-between"
              p={5}
              bg="red.250"
              rounded="2xl"
              alignItems="center"
            >
              <Box>
                <Text color="red.600" fontSize="sm">
                  THẺ CÀO
                </Text>
                <Text fontWeight="bold" color="red.600" fontSize="25px">
                  {numberFormat(OneAccountBuy?.cash)}
                </Text>
              </Box>
              <Text fontSize="sm" color="red.600">
                hoặc
              </Text>
              <Box>
                <Text color="red.600" fontSize="sm">
                  ATM/MOMO chỉ cần
                </Text>
                <Text fontWeight="bold" color="red.600" fontSize="25px">
                  {numberFormat(OneAccountBuy?.cash * ATM_DISCOUNT)}
                </Text>
              </Box>
            </Flex>
            <Box w="100%" p={5} bg="white.100" rounded="2xl">
              <Text as="b" mb={2}>
                Thông tin
              </Text>
              <Box
                dangerouslySetInnerHTML={{ __html: OneAccountBuy?.description }}
              />
            </Box>
            <Button
              w="100%"
              leftIcon={<FaShoppingCart />}
              onClick={() => handleClick(OneAccountBuy?.id)}
              colorScheme="red"
              rounded="md"
              fontSize="xl"
              py="2rem"
            >
              MUA NGAY
            </Button>
            <Link to="/help">
              <Text as="b">Mua bằng ATM / MOMO Tại đây</Text>
            </Link>
          </VStack>
        </GridItem>
      </SimpleGrid>
      {/* TÀI KHOẢN ĐỒNG GIÁ */}
      <RecomendAccount />
    </>
  );
}

function RecomendAccount() {
  return (
    <>
      <Box mt="2rem">
        <Heading as="h2" fontSize="20px" mb={5} textShadow="0 0 30px white">
          TÀI KHOẢN ĐỒNG GIÁ
        </Heading>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
          gap={5}
          px={{ base: 2, lg: 0 }}
          mt={{ base: "2rem", lg: 0 }}
        >
          {new Array(10).fill(0).map((_, index) => (
            <Account key={index} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
