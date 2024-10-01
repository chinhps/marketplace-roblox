import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/apis/service";
import { compareForm, objectToFormData } from "@/utils/function";
import { accountApi } from "@/apis/account";
import { IServiceMutation } from "@/types/service.type";

const initialFormState: Array<IFormInput> = [
  {
    label: "Giá bán",
    name: "price",
    type: "NUMBER",
    gridAreaName: "b",
    isRequired: true,
    default: "0",
    min: 0,
  },
  {
    label: "Thông tin thêm",
    name: "note",
    type: "TEXTAREA",
    gridAreaName: "d",
  },
  {
    label: "Kích hoạt",
    name: "active",
    type: "SWITCH",
    gridAreaName: "c",
  },
];

const initialFormImagesState: Array<IFormInput> = [
  {
    label: "Hình ảnh hiển thị",
    name: "thumb",
    type: "FILE",
    gridAreaName: "image1",
  },
  {
    label: "Hình ảnh chi tiết",
    name: "images",
    type: "FILE",
    multiple: true,
    gridAreaName: "image2",
  },
];

export default function CUAccoutPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({});
  const [formData, setFormData] = useState<IFormInput[]>(() =>
    structuredClone(initialFormState)
  );
  const [idServiceGame, setIdServiceGame] = useState<number>();
  const serviceGameListMutation = useMutation({
    mutationFn: (formDataObject: IServiceMutation) =>
      accountApi.create(formDataObject),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
      });
      navigate("../");
    },
  });
  const serviceGameListQuery = useQuery({
    queryKey: ["serviceGameList", "ACCOUNT"],
    queryFn: () => serviceApi.serviceGameList("ACCOUNT"),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });
  const accountQuery = useQuery({
    queryKey: ["account-detail", id],
    queryFn: () => accountApi.get(Number(id)),
    enabled: !!id,
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      const searchDataFormByQuery = serviceGameListQuery.data?.data.data.find(
        (value) => value.id === data.data.service_id
      );
      const publicForm = compareForm(
        data.data.detail_public,
        searchDataFormByQuery?.public_form
      );
      const privateForm = compareForm(
        data.data.detail_private,
        searchDataFormByQuery?.private_form
      );
      handleChangeServiceGame(data.data.service_id, publicForm, privateForm);
      setFormValue({
        price: data.data.price,
        note: data.data.note,
        active: data.data.active === "YES",
        thumb: [data.data.thumb],
        images: [...data.data.images],
      });

      console.log("resultArray", publicForm, privateForm);
    },
  });
  /****----------------
  *      END-HOOK
  ----------------****/

  /****----------------
   *      Handle
  ----------------****/
  const handleChangeServiceGame = (
    id: number,
    publicForm?: IFormInput[],
    privateForm?: IFormInput[]
  ) => {
    setFormData(initialFormState);
    setIdServiceGame(id);

    if (publicForm && privateForm) {
      setFormData((prev) => [
        ...prev,
        ...(publicForm ?? []),
        ...(privateForm ?? []),
        ...initialFormImagesState,
      ]);
      return;
    }

    const searchDataFormByQuery = serviceGameListQuery.data?.data.data.find(
      (value) => value.id === id
    );
    setFormData((prev) => [
      ...prev,
      ...(searchDataFormByQuery?.public_form ?? []),
      ...(searchDataFormByQuery?.private_form ?? []),
      ...initialFormImagesState,
    ]);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const formDataObject = new FormData();
    const form = { id: id ?? null, idServiceGame, data };
    objectToFormData(formDataObject, form);
    idServiceGame &&
      serviceGameListMutation.mutate({
        formData: formDataObject,
        data: JSON.stringify(form),
      });
  };
  /****----------------
   *      END-Handle
  ----------------****/

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa tài khoản #${id}` : "Thêm tài khoản mới"}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>
          Chỉ những tài khoản chưa bán mới có thể chỉnh sửa. Người sửa cuối cùng
          sẽ được lưu lại
        </Text>
        <FormControl isRequired mb="1rem">
          <FormLabel>Chọn loại tài khoản</FormLabel>
          <Select
            variant="auth"
            onChange={(e) => handleChangeServiceGame(Number(e.target.value))}
            value={accountQuery.data?.data.data.service_id}
            placeholder="Loại tài khoản"
          >
            {serviceGameListQuery.data?.data.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.note}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormBase
          dataForm={formData}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
          CustomComponent={CustomStyle}
          isSubmitCustom={serviceGameListMutation.isLoading}
        />
      </CardCollection>
    </>
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid
        templateColumns="1fr 1fr"
        gap={2}
        templateRows="auto auto"
        mt="1rem"
        templateAreas={`
            "a a"
            "b b"
            "d d"
            "c c"
            "private1 public1"
            "private2 public2"
            "private3 public3"
            "private4 public4"
            "private5 public5"
            "image1 image2"
            "button button"
          `}
      >
        {children}
      </Grid>
    </>
  );
}
