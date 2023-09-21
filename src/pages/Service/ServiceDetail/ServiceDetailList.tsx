import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import {
  Badge,
  Button,
  Image,
  Tag,
  Td,
  Text,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/apis/service";
import Paginate from "@/components/globals/Paginate";

export default function ServiceDetailList() {
  return (
    <>
      <CardCollection
        title="Thông tin của dịch vụ #23"
        fontSize="25px"
        button={
          <Link to="../">
            <Button leftIcon={<FiChevronLeft />}>Trở lại</Button>
          </Link>
        }
      >
        <ServiceDetailTableList />
      </CardCollection>
    </>
  );
}

export function ServiceDetailTableList() {
  /****----------------
   *      HOOK
  ----------------****/
  const [page, setPage] = useState<number>(1);
  const toast = useToast();
  const serviceDetailListQuery = useQuery({
    queryKey: ["service-detail-list", page],
    queryFn: () => serviceApi.listDetail({ page, filter: {} }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const serviceDetailDeleteMutation = useMutation({
    mutationFn: (id: number) => serviceApi.deleteDetail(id),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const handleDeleteService = (id: number) => {
    serviceDetailDeleteMutation.mutate(id);
  };
  return (
    <>
      <Text mt=".5rem">
        Bạn có thể xóa dịch vụ, nhưng không thể xóa được nếu tỷ lệ hoặc hình ảnh
        đang sử dụng ở dịch vụ khác.
      </Text>
      <TableCustom
        thead={[
          "ID",
          "Hình ảnh",
          "Thông tin",
          "Tỷ lệ",
          "Hiển thị",
          "Hành động",
        ]}
      >
        {serviceDetailListQuery.data?.data.data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>
              <Image
                w="100px"
                h="50px"
                objectFit="cover"
                src={vl.service_image?.thumb ?? ""}
                alt="alsd"
              />
            </Td>
            <Td>
              <Text>Ưu tiên: {vl.prioritize}</Text>
              <Text>Tên nhóm: {vl.service_group?.name}</Text>
              <Text w="300px" className="break-word">
                Tên: {vl.service_image?.name}
              </Text>
              <Text>
                <Badge
                  colorScheme="green"
                  w="auto"
                  maxW="300px"
                  className="break-word"
                >
                  Slug: {vl.slug}
                </Badge>
              </Text>
            </Td>
            <Td>
              {vl.service_odds ? (
                <>
                  <Text w="200px" className="break-word">
                    ADMIN ({vl.service_odds.odds_admin_type}):
                  </Text>
                  <Badge colorScheme="green">
                    {vl.service_odds.odds_admin}
                  </Badge>
                  <Text className="break-word">
                    USER ({vl.service_odds.odds_user_type}):
                  </Text>
                  <Badge colorScheme="green">{vl.service_odds.odds_user}</Badge>
                </>
              ) : (
                "Không tồn tại"
              )}
            </Td>
            <Td>
              <VStack spacing={1}>
                <Badge colorScheme="orange">
                  {vl.excluding === "ON"
                    ? "Tất cả ngoại trừ"
                    : "Chỉ các domain sau"}
                </Badge>
                {vl.shop_list?.map((shopItem, index) => (
                  <Tag key={index} w="auto">
                    {shopItem.domain}
                  </Tag>
                ))}
              </VStack>
            </Td>
            <Td>
              <ActionList
                actions={["DELETE"]}
                onClickExits={() => handleDeleteService(vl.id)}
              />
            </Td>
          </Tr>
        ))}
      </TableCustom>
      <Paginate
        paginate={serviceDetailListQuery.data?.data.paginate}
        action={setPage}
      />
    </>
  );
}
