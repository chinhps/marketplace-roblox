import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from "@chakra-ui/react";
import TopRecharge from "./TopRecharge";
import GiftList from "./GiftList";
import moment from "moment";
import { FaGift } from "react-icons/fa";

export default function EventBanner() {
  return (
    <>
      <Tabs
        isFitted
        variant="unstyled"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <TabList>
          <TabCustom>TOP NẠP THÁNG {moment().month() + 1}</TabCustom>
          <TabCustom><Icon as={FaGift} color="red.500" transform="rotate(-15deg)" fontSize="20px" mr="10px" /> PHẦN THƯỞNG</TabCustom>
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
            <GiftList alertGift="helo every one today i feel so good" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function TabCustom({ children }: { children: any }) {
  return (
    <Tab
      _selected={{ color: "black.100", bg: "white.100" }}
      bg="black.100"
      fontWeight="bold"
      color="white.500"
      p="1rem"
    >
      {children}
    </Tab>
  );
}
