import { getVersion, myDomain } from "@/utils/version";
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Img,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Criteria from "./Criteria";

export default function Footer() {
  return (
    <>
      <Criteria />
      <Box
        as="footer"
        color={useColorModeValue("white", "gray.200")}
        zIndex={5}
      >
        <Container maxW="container.2xl" py={10}>
          <Grid
            display={{ base: "flex", "2sm": "flex", md: "grid" }}
            templateColumns="repeat(12,1fr)"
            gap="30px"
            flexDirection="column"
          >
            <GridItem colSpan={4}>
              <Stack
                justifyContent="center"
                alignItems="center"
                border="2px"
                borderColor=""
                height="100%"
                p={3}
              >
                <Img src="/logo.png" h="75px" />

                <Heading
                  as="h2"
                  fontSize="md"
                  textAlign="center"
                  textTransform="uppercase"
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit
                </Heading>
              </Stack>

              {/* <List mt={2} display="flex" gap={5}>
              <ListItem fontWeight="bold">Privacy Policy</ListItem>
              <ListItem fontWeight="bold">Terms of Service</ListItem>
            </List> */}
            </GridItem>
            <GridItem colSpan={5}>
              <Heading as="h2" fontSize="2xl" mb={5}>
                VỀ CHÚNG TÔI
              </Heading>
              <Text fontWeight="bold" mb={5}>
                Chúng tôi luôn lấy uy tín đặt trên hàng đầu đối với khách hàng,
                hy vọng chúng tôi sẽ được phục vụ các bạn. Cám ơn!
              </Text>
              <Text fontWeight="bold">Thời gian hỗ trợ: </Text>
              <Text>Hỗ trợ 24/7 - Kể cả ngày lễ và chủ nhật</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Heading as="h2" fontSize="2xl" mb={5} textTransform="uppercase">
                {myDomain()}
              </Heading>
              <Text fontWeight="bold">HỆ THỐNG BÁN ACC TỰ ĐỘNG</Text>
              <Text fontWeight="bold">ĐẢM BẢO UY TÍN VÀ CHẤT LƯỢNG.</Text>
              <Img src="https://i.imgur.com/yUC3Br8.png" alt="" w="200px" />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Center bg="black.100" color="white.100" py=".5rem">
        <Text fontWeight="500" textTransform="capitalize">
          {myDomain()} [Version {getVersion()}]
        </Text>
      </Center>
    </>
  );
}
