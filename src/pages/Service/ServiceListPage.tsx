import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { handleCopy, numberFormat } from "@/utils/function";
import {
  Badge,
  Button,
  HStack,
  IconButton,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiPlus, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import OddsList from "./Odds/OddsList";
import ServiceGroupList from "./ServiceGroup/ServiceGroupList";
import { ServiceDetailTableList } from "./ServiceDetail/ServiceDetailList";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/apis/service";
import Paginate from "@/components/globals/Paginate";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormBase from "@/components/globals/FormBase";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import ModelBase from "@/components/globals/Model/ModelBase";
import { IServiceDetailResponse } from "@/types/response/service.type";

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
              <MenuItem as={Link} to="./groups/create">
                Nhóm dịch vụ
              </MenuItem>
              <MenuItem as={Link} to="./game-pass/create">
                GamePass
              </MenuItem>
              <MenuItem as={Link} to="./boxes/create">
                Rương vật phẩm
              </MenuItem>
            </MenuList>
          </Menu>
        }
      >
        <Text>Quản lý dịch vụ, ấn vào tên để có thể xem chi tiết.</Text>

        <Tabs position="relative" variant="unstyled" isLazy={true}>
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
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modelDataServiceDetail, setModelDataServiceDetail] = useState<
    | {
        gameType: string;
        details: Array<IServiceDetailResponse>;
      }
    | undefined
  >();
  const serviceListQuery = useQuery({
    queryKey: ["service-list", filter, page],
    queryFn: () => serviceApi.list({ page, filter }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const serviceDeleteMutation = useMutation({
    mutationFn: (id: number) => serviceApi.delete(id),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      serviceListQuery.refetch();
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  const handleDeleteService = (id: number) => {
    serviceDeleteMutation.mutate(id);
  };

  return (
    <>
      <ModelBase
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        children={
          <HStack flexWrap="wrap">
            {/* <Button leftIcon={<FiPlus />}>Thêm mới</Button> */}
            {modelDataServiceDetail?.details.map((detail) => (
              <Button
                key={detail.id}
                onClick={() => {
                  handleCopy(detail.slug);
                  navigate(
                    modelDataServiceDetail.gameType === "GAMEPASS"
                      ? `./game-pass/update/${detail.service_id}/${detail.id}`
                      : `./update/service/${detail.service_id}/${detail.id}`
                  );
                }}
              >
                {detail.id}: {detail.slug}
              </Button>
            ))}
          </HStack>
        }
      />
      <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />

      <TableCustom
        thead={[
          "ID",
          "Service Key",
          "Giá tiền",
          "Thông tin",
          "Kích hoạt",
          "Loại quà",
          "Liên kết",
          "Thao tác",
        ]}
      >
        {serviceListQuery.data?.data.data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>{vl.service_key}</Td>
            <Td>
              <Badge colorScheme="purple">Sale: {vl.sale}%</Badge>
              <Text>{numberFormat(vl.price)}</Text>
            </Td>
            <Td>
              <Text color="blue.600" noOfLines={1} w="200px">
                {vl.note}
              </Text>
              {vl.information &&
                Object.keys(vl.information).map((vl2, index) => (
                  <Text key={index}>
                    {vl2}: {vl.information[vl2]}
                  </Text>
                ))}
              <Badge colorScheme="cyan">
                Lượt sử dụng:{" "}
                {numberFormat(vl.service_couter?.value ?? 0, false)}
              </Badge>
            </Td>
            <Td>
              {vl.active === "ON" ? (
                <Badge colorScheme="green">Kích hoạt</Badge>
              ) : (
                <Badge colorScheme="red">Không hoạt động</Badge>
              )}
            </Td>
            <Td>{vl.currency?.currency_name ?? "Không có"}</Td>
            <Td>{vl.service_details_count}</Td>
            <Td>
              <HStack>
                <IconButton
                  aria-label="Change"
                  colorScheme="orange"
                  variant="outline"
                  onClick={() => {
                    onOpen();
                    setModelDataServiceDetail({
                      gameType: vl.game_list.game_key,
                      details: vl.service_details ?? [],
                    });
                  }}
                  icon={<FiEdit />}
                />
                <ActionList
                  actions={["DELETE"]}
                  linkUpdate={"./update/service/" + vl.id}
                  onClickExits={() => handleDeleteService(vl.id)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </TableCustom>
      <Paginate
        paginate={serviceListQuery.data?.data.paginate}
        action={setPage}
      />
    </>
  );
}

function FormSearch({ setFilter, filter, setPage }: IFormSearchProps) {
  const dataForm: Array<IFormInput> = [
    {
      label: "#ID",
      name: "id",
      type: "INPUT",
    },
    {
      label: "Note service",
      name: "note_service",
      type: "INPUT",
    },
    {
      label: "Lọc theo kích hoạt",
      name: "active",
      type: "SELECT",
      selects: [
        {
          label: `Kích hoạt`,
          value: "1",
        },
        {
          label: `Không hoạt động`,
          value: "2",
        },
      ],
    },
    {
      label: "Sắp xếp theo ID",
      name: "sort",
      type: "SELECT",
      selects: [
        {
          label: `Thấp đến cao`,
          value: "1",
        },
        {
          label: `Cao đến thấp`,
          value: "2",
        },
      ],
    },
  ];

  // Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setPage(1);
    setFilter(data);
  };

  return (
    <>
      <FormBase
        dataForm={dataForm}
        onSubmit={onSubmit}
        textBtn="Tìm kiếm"
        CustomComponent={CustomStyleFilter}
        hiddenLable={true}
        icon={<FiSearch />}
        dataDefault={filter}
      />
    </>
  );
}
