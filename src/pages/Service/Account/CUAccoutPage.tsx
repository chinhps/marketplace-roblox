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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/apis/service";
import accountApi from "@/apis/account";
import { IServiceGameCreate } from "@/types/response/service.type";

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
    label: "Kích hoạt",
    name: "active",
    type: "SWITCH",
    gridAreaName: "c",
  },
];

export default function CUAccoutPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const [formData, setFormData] = useState<Array<IFormInput>>(() =>
    structuredClone(initialFormState)
  );
  const [idServiceGame, setIdServiceGame] = useState<number>();

  const serviceGameListMutation = useMutation({
    mutationFn: ({ idServiceGame, data }: IServiceGameCreate) =>
      accountApi.createAccount({ idServiceGame, data }),
  });
  const serviceGameListQuery = useQuery({
    queryKey: ["serviceGameList"],
    queryFn: () => serviceApi.serviceGameList("ACCOUNT"),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });
  /****----------------
  *      END-HOOK
  ----------------****/

  /****----------------
   *      Handle
  ----------------****/
  const handleChangeServiceGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(initialFormState);
    setIdServiceGame(Number(e.target.value));
    const searchDataFormByQuery = serviceGameListQuery.data?.data.data.find(
      (value) => value.id === Number(e.target.value)
    );
    setFormData((prev) => [
      ...prev,
      ...(searchDataFormByQuery?.public_form ?? []),
      ...(searchDataFormByQuery?.private_form ?? []),
    ]);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data, formData);
    idServiceGame && serviceGameListMutation.mutate({ idServiceGame, data });
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
            placeholder="Loại tài khoản"
            onChange={handleChangeServiceGame}
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
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
          CustomComponent={CustomStyle}
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
            "c c"
            "private1 public1"
            "private2 public2"
            "private3 public3"
            "private4 public4"
            "private5 public5"
            "button button"
          `}
      >
        {children}
      </Grid>
    </>
  );
}
