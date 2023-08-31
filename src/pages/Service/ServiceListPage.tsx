import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import OddsList from "./Odds/OddsList";
import ServiceGroupList from "./ServiceGroup/ServiceGroupList";
import { ServiceDetailTableList } from "./ServiceDetail/ServiceDetailList";

export default function ServiceListPage() {
  return (
    <>
      <CardCollection
        title="Quản lý dịch vụ"
        fontSize="25px"
        button={
          <Menu isLazy placement="bottom-end">
            <MenuButton variant="auth" as={Button} rightIcon={<FiPlus />}>
              Thêm mới
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="./create/service">
                Dịch vụ
              </MenuItem>
              <MenuItem as={Link} to="../">
                Nhóm dịch vụ
              </MenuItem>
              <MenuItem as={Link} to="../">
                Tỷ lệ
              </MenuItem>
            </MenuList>
          </Menu>
        }
      >
        <Text>Quản lý dịch vụ, ấn vào tên để có thể xem chi tiết.</Text>

        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>Danh sách Dịch vụ</Tab>
            <Tab>Tất cả game đang hiển thị</Tab>
            <Tab>Danh sách nhóm dịch vụ</Tab>
            <Tab>Danh sách tỷ lệ</Tab>
          </TabList>

          <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <TableList />
            </TabPanel>
            <TabPanel>
              <ServiceDetailTableList />
            </TabPanel>
            <TabPanel>
              <ServiceGroupList />
            </TabPanel>
            <TabPanel>
              <OddsList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardCollection>
    </>
  );
}

function TableList() {
  const data: {
    [key: string]: string;
  } = {
    hastag: "percent80",
    chinh: "dzvc",
  };
  return (
    <>
      <TableCustom
        thead={[
          "ID",
          "Note",
          "Giá tiền",
          "Sale",
          "Thông tin",
          "Kích hoạt",
          "Loại quà",
          "Liên kết",
          "Thao tác",
        ]}
      >
        {new Array(7).fill(0).map((vl, index) => (
          <Tr key={index}>
            <Td>#{index + 1}</Td>
            <Td>
              <Link to="./service-detail/123">
                <Text color="blue.600">Nikko Pfannerstill</Text>
              </Link>
            </Td>
            <Td>{numberFormat(350000)}</Td>
            <Td>
              <Badge colorScheme="purple">{50}%</Badge>
            </Td>
            <Td>
              {Object.keys(data).map((vl, index) => (
                <Text key={index}>
                  {vl}: {data[vl]}
                </Text>
              ))}
              <Badge colorScheme="cyan">
                Lượt sử dụng: {numberFormat(10000, false)}
              </Badge>
            </Td>
            <Td>
              <Badge colorScheme="green">Kích hoạt</Badge>
            </Td>
            <Td>Kim cương</Td>
            <Td>34</Td>
            <Td>
              <ActionList />
            </Td>
          </Tr>
        ))}
      </TableCustom>
    </>
  );
}
