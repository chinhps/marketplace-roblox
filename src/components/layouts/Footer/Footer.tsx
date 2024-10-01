import { getVersion, myDomain } from "@/utils/version";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Link as LinkChakra,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import { FaArrowUp, FaFacebookMessenger } from "react-icons/fa";

export default function Footer() {
  const dataInformation = useInformationShopData();

  return (
    <>
      <Flex
        zIndex={10}
        position="fixed"
        right="5%"
        bottom="7%"
        flexDirection="column"
        gap={2}
      >
        <Button
          as="a"
          colorScheme="messenger"
          p={1}
          href={dataInformation?.plugin?.link_fanpage ?? "/"}
        >
          <FaFacebookMessenger fontSize="16px" />
        </Button>
        <Button
          variant="blue"
          p={1}
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FaArrowUp />
        </Button>
      </Flex>
      <Box
        mt="2rem"
        as="footer"
        borderTop="1px"
        color="var(--color-footer)"
        bg="var(--bg-footer)"
        borderColor="main.item4"
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
                <Img
                  src={dataInformation?.data?.data?.information.logo_url}
                  h="75px"
                />

                <Heading
                  as="h2"
                  fontSize="md"
                  textAlign="center"
                  textTransform="uppercase"
                >
                  {dataInformation?.data?.data?.title_website}
                </Heading>
                <Flex
                  mt={2}
                  justifyContent="space-between"
                  gap={1}
                  alignItems="center"
                >
                  <LinkChakra
                    fontSize="14px"
                    href="https://chính.vn/chinhsach.html"
                    isExternal
                  >
                    Privacy Policy
                  </LinkChakra>
                  |
                  <LinkChakra
                    fontSize="14px"
                    href="https://chính.vn/dieukhoan.html"
                    isExternal
                  >
                    Terms of Service
                  </LinkChakra>
                  |
                  <LinkChakra
                    fontSize="14px"
                    href="https://chính.vn/posts.html"
                    isExternal
                  >
                    Delete user data
                  </LinkChakra>
                </Flex>
              </Stack>
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
              <Link to={dataInformation?.plugin?.link_fanpage ?? "/"}>
                <Img src="https://i.imgur.com/yUC3Br8.png" alt="" w="200px" />
              </Link>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Center bg="var(--bg-footer)" color="var(--color-footer)" py=".5rem">
        <Text fontWeight="500" textTransform="capitalize">
          {myDomain()} [Version {getVersion()}]
        </Text>
      </Center>
    </>
  );
}
