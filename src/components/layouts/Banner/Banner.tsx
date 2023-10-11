import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Flex,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import EventBanner from "./EventBanner";
import { useEffect, useState } from "react";
import moment from "moment";
import Counter from "@/components/global/CounterNumber/CounterNumber";
import { FiBookOpen, FiGift, FiLogIn } from "react-icons/fi";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";

Banner.v1 = () => {
  const dataInformation = useInformationShopData();
  return (
    <>
      <Box
        as="header"
        overflow="hidden"
        display="flex"
        mt="2.7rem"
        position="relative"
      >
        <Box
          zIndex={2}
          position="absolute"
          left={0}
          right={0}
          top="60%"
          bottom={0}
          bgGradient="linear(to bottom,  #ff000000, var(--bg-main-color) 70%)"
        />
        <Box
          position="absolute"
          backgroundImage={
            dataInformation?.data?.data?.information.banner_url ?? ""
          }
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          filter="blur(20px)"
          bottom={0}
          top={0}
          left={0}
          right={0}
        />
        <Container
          position="relative"
          maxW="container.2xl"
          p={0}
          flex="1"
          display="flex"
          alignItems="center"
        >
          <SimpleGrid
            zIndex={3}
            columns={{ base: 1, lg: 8 }}
            w="100%"
            spacing=".7rem"
            py="3rem"
          >
            <GridItem
              colSpan={{ base: 1, lg: 6 }}
              rounded="5px"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image
                objectFit="cover"
                src={dataInformation?.data?.data?.information.banner_url ?? ""}
                alt="banner"
                w="100%"
                maxH="420px"
              />
            </GridItem>
            <GridItem
              colSpan={{ base: 1, lg: 2 }}
              bg="white.100"
              rounded="5px"
              overflow="hidden"
              minH="420px"
            >
              <EventBanner.v1 />
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default function Banner() {
  const [isSwitchEvent, setIsSwitchEvent] = useState(false);
  const handleSwitchEvent = () => setIsSwitchEvent(!isSwitchEvent);
  return (
    <>
      <Box as="header" display="flex" mt="5rem">
        <Container maxW="container.2xl" p={0} flex="1">
          <SimpleGrid
            zIndex={3}
            columns={{ base: 1, lg: 8 }}
            w="100%"
            spacing=".7rem"
            py="2rem"
          >
            <GridItem
              position="relative"
              colSpan={{ base: 1, lg: 6 }}
              rounded="md"
              boxShadow="2xl"
            >
              <BannerImage />
            </GridItem>
            <GridItem
              colSpan={{ base: 1, lg: 2 }}
              rounded="md"
              overflow="hidden"
              minH="500px"
              bg="main.item"
            >
              {!isSwitchEvent ? (
                <EventBanner.v1 {...{ handleSwitchEvent }} />
              ) : (
                <EventBanner {...{ handleSwitchEvent }} />
              )}
            </GridItem>
          </SimpleGrid>
          <RecommendFeature />{" "}
        </Container>
      </Box>
    </>
  );
}

function BannerImage() {
  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        gap="3rem"
        justifyContent="space-between"
        height="100%"
        color="white"
        p="2rem"
      >
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          zIndex={5}
          gap="1rem"
        >
          <Flex flexDirection="column" gap={4}>
            <Text as="b">Chương trình giảm giá</Text>
            <VStack align="flex-start">
              <Heading as="h2" fontSize="20px" textTransform="uppercase">
                Vòng quay
              </Heading>
              <Heading as="h1" fontSize="80px" textTransform="uppercase">
                Tiệc bãi biển
              </Heading>
            </VStack>
          </Flex>
          <Flex gap={5}>
            <BannerItem
              text="Giảm giá"
              value={<Heading as="h3">50%</Heading>}
            />
            <BannerItem
              text="Người tham gia"
              value={
                <Heading as="h3">
                  <Counter counterNumber={12000} />
                </Heading>
              }
            />
          </Flex>
        </Flex>
        <Flex
          gap=".5rem"
          flexDirection="column"
          justifyContent="space-between"
          zIndex={5}
        >
          <BannerItem
            text="Kết thúc sau:"
            pCustom="1rem 2rem"
            value={<CountdownTime />}
            as={Flex}
            alignItems="center"
            justifyContent="center"
            gap={5}
          />
          <Button
            variant="red"
            bg="red.99"
            textTransform="uppercase"
            p="1.7rem"
            rounded="lg"
            fontSize="18px"
            fontWeight="bold"
          >
            Tham gia ngay
          </Button>
        </Flex>
      </Flex>
      <BannerBlur />
    </>
  );
}

function CountdownTime() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const endDate = moment("2023-07-01 21:30:23");

    const interval = setInterval(() => {
      const duration = moment.duration(endDate.diff(moment()));
      const seconds = duration.asSeconds();

      if (seconds <= 0) {
        clearInterval(interval);
        setCountdown("Hết hạn");
      } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        setCountdown(
          `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Text as="b" fontSize="18px">
      {countdown}
    </Text>
  );
}

interface IBannerItem extends BoxProps {
  text: string;
  pCustom?: string;
  value: React.ReactNode;
}

function BannerItem({ text, value, pCustom, ...props }: IBannerItem) {
  return (
    <>
      <Box
        position="relative"
        p={pCustom ?? "1.5rem"}
        border="1px"
        borderColor="black.200"
        rounded="lg"
      >
        <Box
          position="absolute"
          inset={0}
          zIndex={-1}
          // filter="blur(10px)"
          opacity="0.5"
          bg="black"
        />
        <Box {...props} textAlign="center">
          <Text>{text}</Text>
          {value}
        </Box>
      </Box>
    </>
  );
}

function BannerBlur() {
  return (
    <>
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={3}>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom="50%"
          bgGradient="linear(to top,  #00000000, black 100%)"
        />
        <Box
          position="absolute"
          top="60%"
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to bottom,  #00000000, black 100%)"
        />
        <Image objectFit="cover" src="/banner.jpg" alt="banner" height="100%" />
      </Box>
    </>
  );
}

function RecommendFeature() {
  return (
    <>
      <HStack spacing={3} justifyContent="space-between">
        <RecommendFeatureItem
          icon={<Icon as={FiLogIn} fontSize="40px" />}
          heading="NẠP THẺ NGAY"
          description="Khuyến mãi 10% giá trị thẻ nạp"
        />
        <RecommendFeatureItem
          icon={<Icon as={FiBookOpen} fontSize="40px" />}
          heading="TOP NẠP THẺ T.2"
          description="Danh sách người dùng top nạp thẻ của tháng"
        />
        <RecommendFeatureItem
          icon={<Icon as={FiBookOpen} fontSize="40px" />}
          heading="TOP NẠP THẺ T.1"
          description="Danh sách top nạp thẻ tháng trước"
        />
        <RecommendFeatureItem
          icon={<Icon as={FiGift} fontSize="40px" />}
          heading="PHẦN THƯỞNG"
          description="Phần thưởng cho TOP NẠP thẻ tháng trước"
        />
      </HStack>
    </>
  );
}

function RecommendFeatureItem({
  icon,
  heading,
  description,
}: {
  icon: React.ReactNode;
  heading: string;
  description: string;
}) {
  return (
    <>
      <HStack
        flex={1}
        spacing={5}
        color="white.100"
        bg="main.item"
        p="1.5rem"
        rounded="md"
      >
        <Center>{icon}</Center>
        <VStack align="initial">
          <Heading as="h2" size="md">
            {heading}
          </Heading>
          <Text fontSize="13px" color="gray.400" fontStyle="italic">
            {description}
          </Text>
        </VStack>
      </HStack>
    </>
  );
}
