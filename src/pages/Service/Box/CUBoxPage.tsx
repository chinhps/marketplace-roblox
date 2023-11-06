import { boxApi } from "@/apis/account";
import { serviceApi } from "@/apis/service";
import CardCollection from "@/components/globals/CardCollection";
import { IChest } from "@/types/response/service.type";
import { numberFormat } from "@/utils/function";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";

export default function CUBoxPage() {
  const toast = useToast();
  const [chests, setChests] = useState<IChest[]>([{ value: 0, countChest: 0 }]);
  const [serviceId, setServiceId] = useState<number>();
  const serviceGameListQuery = useQuery({
    queryKey: ["serviceGameList", "BOX"],
    queryFn: () => serviceApi.serviceGameList("BOX"),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });
  const boxMutation = useMutation({
    mutationFn: (data: object) => boxApi.create(data),
    onSuccess: ({ data }) => {
      toast({ description: data.msg, status: "success" });
    },
  });
  const handleSubmit = () => {
    boxMutation.mutate({
      service_id: serviceId,
      chests: chests,
    });
  };

  return (
    <>
      <CardCollection title="Thêm rương vật phẩm" fontSize="25px">
        <Text>
          Thêm Rương vật phẩm hàng loạt! Loại vật phẩm sẽ được quy định khi tạo
          dịch vụ!
        </Text>
        <Text>Các rương sẽ tự động được sắp xếp!</Text>
        <FormControl isRequired my="1rem">
          <FormLabel>Chọn loại rương</FormLabel>
          <Select
            variant="auth"
            placeholder="Loại rương"
            onChange={(value) => setServiceId(Number(value.target.value))}
          >
            {serviceGameListQuery.data?.data.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.note} - {numberFormat(item.price)} - Vật phẩm:{" "}
                {item.currency_name}
              </option>
            ))}
          </Select>
        </FormControl>
        {chests.map((chest, index) => (
          <HStack mb="1rem" key={index}>
            <FormControl isRequired>
              <FormLabel>Vật phẩm trong rương</FormLabel>
              <Input
                variant="auth"
                placeholder="Số quà trong rương"
                defaultValue={chest.value}
                onChange={(value) => (chest.value = Number(value.target.value))}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Số lượng rương</FormLabel>
              <Input
                variant="auth"
                placeholder="Số lượng rương"
                defaultValue={chest.countChest}
                onChange={(value) =>
                  (chest.countChest = Number(value.target.value))
                }
              />
            </FormControl>
          </HStack>
        ))}

        <HStack mb="1rem">
          <Button
            leftIcon={<FiPlus />}
            onClick={() =>
              setChests((prev) => [...prev, { value: 0, countChest: 0 }])
            }
          >
            Thêm gói mới
          </Button>
        </HStack>
        <Button
          isLoading={boxMutation.isLoading}
          variant="auth"
          w="100%"
          rightIcon={<FiCheck />}
          size="lg"
          onClick={handleSubmit}
        >
          Hoàn thành
        </Button>
      </CardCollection>
    </>
  );
}
