import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { topRechargeVirtual } from "@/apis/topRecharge";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import shopApi from "@/apis/shop";

const initialForm: Array<IFormInput> = [
  {
    label: "Tên hiển thị",
    name: "name",
    type: "INPUT",
    isRequired: true,
  },
  {
    label: "Giá tiền",
    name: "price",
    type: "INPUT",
    isRequired: true,
  },
];

export default function CUTopRechargeVirtualPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const [shopId, setShopId] = useState<number>();
  const navigate = useNavigate();
  const topRechargeMutation = useMutation({
    mutationFn: (params: object) => topRechargeVirtual.create(params),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });
  const shopAllQuery = useQuery({
    queryKey: ["shop-all"],
    queryFn: () => shopApi.all(),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });
  const topRechargeQuery = useQuery({
    queryKey: ["top-recharge-virtual", id],
    queryFn: () => topRechargeVirtual.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setShopId(data.data.shop_id);
      setFormValue({
        name: data.data.name_virtual,
        price: data.data.price,
      });
    },
  });

  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    topRechargeMutation.mutate({
      id: id ?? "",
      shop_id: shopId,
      ...data,
    });
  };
  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa #${id}` : "Tạo mới top nạp thẻ"}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>Thông báo cho quản trị viên trước khi thực hiện</Text>
        <FormControl isRequired mb="1rem">
          <FormLabel>Chọn tên miền</FormLabel>
          <Select
            variant="auth"
            placeholder="-- Chọn tên miền --"
            onChange={(e) => setShopId(Number(e.target.value))}
            value={topRechargeQuery.data?.data.data.shop_id}
          >
            {shopAllQuery.data?.data.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.domain}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormBase
          dataForm={initialForm}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}
