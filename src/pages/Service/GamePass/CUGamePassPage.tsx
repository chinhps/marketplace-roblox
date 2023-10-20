import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { gamePassApi } from "@/apis/service";
import { IFormInput } from "@/types/form.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { objectToFormData } from "@/utils/function";
import InputExcept from "@/components/globals/Form/InputExcept";

const initialFormState: IFormInput[] = [
  {
    label: "Tên hiển thị",
    name: "name_gamepass",
    type: "INPUT",
    isRequired: true,
    placeholder: "Tên hiển thị ra cho người dùng xem",
  },
  {
    label: "Chọn kích hoạt",
    name: "active",
    type: "SELECT",
    isRequired: true,
    selects: [
      {
        label: "Kích hoạt",
        value: "ON",
      },
      {
        label: "Hủy kích hoạt",
        value: "OFF",
      },
    ],
  },
  {
    label: "Thông tin gói",
    name: "parcels",
    type: "TEXTAREA",
    isRequired: true,
    placeholder: "Tên gói | Giá gói | Cost Robux",
  },
  {
    label: "Hướng dẫn rút",
    name: "exemple",
    type: "HTML",
    isRequired: true,
    placeholder: "Hướng dẫn rút cho người dùng",
  },
  {
    label: "Ảnh đại diện",
    name: "image",
    type: "FILE",
    isRequired: true,
  },
];

export default function CUGamePassPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [except, setExcept] = useState<boolean>(true);
  const [dataDomainExcept, setDataDomainExcept] =
    useState<Array<string | number>>();
  const [formState, _] = useState<IFormInput[]>(() =>
    structuredClone(initialFormState)
  );
  const [formValue, setFormValue] = useState({});
  const navigate = useNavigate();
  const gamePassMutation = useMutation({
    mutationFn: (dataForm: FormData) => gamePassApi.create(dataForm),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../../");
    },
  });
  useQuery({
    queryKey: ["game-pass-detail", id],
    queryFn: () => gamePassApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setFormValue({
        prioritize: data.data.prioritize,
        name: data.data.name,
        active: data.data.active,
        image: [data.data.image],
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
      dataDomainExcept,
      except,
      ...data,
    });
    gamePassMutation.mutate(formData);
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa Game Pass #${id}` : "Tạo mới Game Pass"}
        fontSize="25px"
        button={
          <Link to="../../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <InputExcept
          except={except}
          setExcept={setExcept}
          onChange={(data) => setDataDomainExcept(data)}
        />

        <FormBase
          dataForm={formState}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}
