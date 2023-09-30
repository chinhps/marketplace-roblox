import shopApi from "@/apis/shop";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { objectToFormData } from "@/utils/function";
import { Button, Grid, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialForm: Array<IFormInput> = [
  {
    label: "Tên miền(Domain)",
    name: "domain",
    type: "INPUT",
    isRequired: true,
    gridAreaName: "a",
  },
  {
    label: "Tiêu đề shop(Title)",
    name: "shop_title",
    type: "INPUT",
    isRequired: true,
    gridAreaName: "b",
  },
  {
    label: "Tiền dành cho người dùng mới",
    name: "cash_new_user",
    type: "NUMBER",
    default: "0",
    isRequired: true,
    gridAreaName: "c",
    min: 0,
    max: 50000,
  },
  {
    label: "Tỷ lệ nạp thẻ (%)",
    name: "percent_recharge",
    type: "NUMBER",
    default: "0",
    isRequired: true,
    gridAreaName: "e",
    min: 0,
    max: 200,
  },
  {
    label: "Keyword SEO Google",
    name: "keyword",
    type: "TEXTAREA",
    isRequired: true,
    gridAreaName: "d",
  },
  {
    label: "Logo(Chỉ 1 ảnh)",
    name: "logo_url",
    type: "FILE",
    isRequired: true,
    gridAreaName: "item1",
  },
  {
    label: "Ảnh nền(Chỉ 1 ảnh)",
    name: "background_url",
    type: "FILE",
    isRequired: true,
    gridAreaName: "item2",
  },
  {
    label: "Favicon(Chỉ 1 ảnh)",
    name: "favicon_url",
    type: "FILE",
    isRequired: true,
    gridAreaName: "item3",
  },
  {
    label: "Banner(Chỉ 1 ảnh)",
    name: "banner_url",
    type: "FILE",
    isRequired: true,
    gridAreaName: "item4",
  },
];

export default function CUShopPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const navigate = useNavigate();
  const shopMutation = useMutation({
    mutationFn: (dataForm: FormData) => shopApi.create(dataForm),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });
  useQuery({
    queryKey: ["shop-detail", id],
    queryFn: () => shopApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setFormValue({
        domain: data.data.domain,
        shop_title: data.data.shop_detail.shop_title,
        percent_recharge: data.data.shop_detail.percent_recharge,
        cash_new_user: data.data.shop_detail.cash_new_user,
        keyword: data.data.shop_detail.information.keyword,
        favicon_url: [data.data.shop_detail.information.favicon_url],
        background_url: [data.data.shop_detail.information.background_url],
        logo_url: [data.data.shop_detail.information.logo_url],
        banner_url: [data.data.shop_detail.information.banner_url],
      });
    },
  });

  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    objectToFormData(formData, {
      id: id ?? "",
      ...data,
    });
    shopMutation.mutate(formData);
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa shop #${id}` : "Tạo mới shop"}
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
        <FormBase
          dataForm={initialForm}
          CustomComponent={CustomStyle}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={2}
        templateRows="auto auto"
        mt="1rem"
        templateAreas={`
          "a a a"
          "b b b"
          "c c c"
          "e e e"
          "d d d"
          "item1 item2 item3"
          "item4 item4 item4"
          "button button button"
        `}
      >
        {children}
      </Grid>
    </>
  );
}
