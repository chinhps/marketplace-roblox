import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  GridItem,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Service from "@/components/global/Service/Service";
import { FaWallet } from "react-icons/fa";

export default function PromotionLayout() {
  return (
    <>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={5} p={{ base: 2, lg: 0 }}>
        <GridItem
          colSpan={{ base: 1, lg: 9 }}
          bg="white.500"
          borderRadius="5px"
          p={5}
          shadow="base"
        >
          <Heading
            as="h1"
            fontSize="3xl"
            textTransform="uppercase"
            mb={2}
            textAlign="center"
            className="showText"
          >
            LẬT HÌNH VUI VẺ
          </Heading>
          <Outlet />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <RecomendServices />
        </GridItem>
      </SimpleGrid>
    </>
  );
}

function RecomendServices() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        mb={10}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "column", xl: "row" }}
        gap={2}
        p={3}
        border="solid 1px"
        borderColor="gold.100"
        rounded="md"
      >
        <Heading as="h2" fontSize="xl" textTransform="uppercase">
          NẠP TIỀN
        </Heading>
        <HStack alignItems="center">
          <Button
            colorScheme="blue"
            onClick={() => {
              navigate("/profile/nap-the-cao");
            }}
            size="sm"
            rounded="md"
            gap={2}
          >
            <Icon as={FaWallet} w="10px" variant="action" /> Thẻ cào
          </Button>
        </HStack>
      </Box>
      <Heading as="h2" fontSize="xl" textTransform="uppercase" ml={2} mb={5}>
        Có thể bạn quan tâm
      </Heading>
      <VStack>
        <Service />
        <Service />
      </VStack>
    </>
  );
}
