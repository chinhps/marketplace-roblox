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
import { FaWallet } from "react-icons/fa";

export default function PromotionLayout() {
  return (
    <>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={5} p={{ base: 2, lg: 0 }} color="white.100">
        <GridItem
          colSpan={{ base: 1, lg: 9 }}
          bg="main.item"
          borderRadius="5px"
          p={{ base: "2.5rem 1rem", lg: "2.5rem" }}
          shadow="base"
        >
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
              navigate("/profile/recharge");
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
        {/* <Service  />
        <Service /> */}
      </VStack>
    </>
  );
}
