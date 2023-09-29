import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  VStack,
  Heading,
  Text,
  Box,
  Divider,
  HStack,
  Flex,
  TabProps,
} from "@chakra-ui/react";
import TopRecharge from "./TopRecharge";
import GiftList from "./GiftList";
import moment from "moment";
import { FaGift } from "react-icons/fa";
import { FiAlignLeft, FiAlignRight, FiCircle } from "react-icons/fi";

export default function EventBanner({
  handleSwitchEvent,
}: {
  handleSwitchEvent?: () => void;
}) {
  return (
    <>
      <Box position="relative" height="100%" color="white.100">
        <Box
          zIndex={2}
          position="absolute"
          top="75%"
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to bottom,  #00000000, #010032 100%)"
        />
        <Box p="1.5rem">
          <HStack justifyContent="space-between">
            <Heading as="h1" size="md">
              GIAO DỊCH GẦN ĐÂY
            </Heading>
            <Box cursor="pointer" onClick={handleSwitchEvent}>
              <Icon as={FiAlignRight} fontSize="20px" />
            </Box>
          </HStack>
          <Divider mx="auto" w="80%" my="1rem" borderColor="main.item3" />
          <VStack align="stretch" spacing={4}>
            <EventBannerTransactionItem isNew={true} />
            <EventBannerTransactionItem />
            <EventBannerTransactionItem />
            <EventBannerTransactionItem />
            <EventBannerTransactionItem />
            <EventBannerTransactionItem />
            <EventBannerTransactionItem />
          </VStack>
        </Box>
      </Box>
    </>
  );
}

function EventBannerTransactionItem({ isNew }: { isNew?: boolean }) {
  return (
    <>
      <Box position="relative" minH="40px" height="100%">
        <Flex
          gap={5}
          w="100%"
          justifyContent="space-between"
          className={isNew ? "transaction-new-item" : ""}
        >
          <HStack spacing={5}>
            <HStack spacing={2}>
              <Icon as={FiCircle} fontSize="7px" />
              <Box
                w="33px"
                h="33px"
                bgImage="linear-gradient(to right, #4269ff63, #4269ff63), url('/icon.jpeg')"
                bgSize="cover"
                rounded="full"
                overflow="hidden"
              ></Box>
            </HStack>
            <VStack align="stretch" spacing={0} color="gray.200">
              <Text as="b" fontSize="15px">
                Phạm hasdasda...
              </Text>
              <Text fontSize="13px">Vòng quay</Text>
            </VStack>
          </HStack>
          <VStack align="end" spacing={0} color="gray.500">
            <Text fontStyle="italic" fontSize="15px">
              20
            </Text>
            <Text fontStyle="italic" fontSize="13px">
              giây trước
            </Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}

EventBanner.v1 = ({
  handleSwitchEvent,
}: {
  handleSwitchEvent?: () => void;
}) => {
  return (
    <>
      <Tabs
        isFitted
        variant="unstyled"
        display="flex"
        flexDirection="column"
        height="100%"
        bg="main.item"
        color="white.100"
      >
        <TabList>
          <TabCustom>
            <Text>TOP NẠP T.{moment().month() + 1}</Text>
          </TabCustom>
          <TabCustom justifyContent="space-between">
            <Box>
              <Icon
                as={FaGift}
                color="red.500"
                transform="rotate(-15deg)"
                fontSize="20px"
                mr="10px"
              />
              P.THƯỞNG
            </Box>

            <Icon onClick={handleSwitchEvent} mr="10px" as={FiAlignLeft} />
          </TabCustom>
        </TabList>
        <TabPanels flexGrow={1}>
          <TabPanel
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <TopRecharge />
          </TabPanel>
          <TabPanel
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <GiftList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

function TabCustom(props: TabProps) {
  return (
    <Tab
      _selected={{ color: "white.200", bg: "main.item" }}
      bg="black.100"
      fontWeight="bold"
      color="white.500"
      p="1rem"
      {...props}
    >
      {props.children}
    </Tab>
  );
}
