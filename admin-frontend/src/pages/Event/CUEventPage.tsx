import { eventApi } from "@/apis/event";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { objectToFormData } from "@/utils/function";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialForm: IFormInput[] = [
  {
    name: "name",
    type: "INPUT",
    label: "Tên sự kiện",
    isRequired: true,
  },
  {
    name: "value_gift",
    type: "INPUT",
    label: "Nhận quà cho người mới",
    isRequired: true,
    placeholder: "2 số ngăn cách nhau bởi dấu |",
  },
  {
    name: "gift",
    type: "SELECT",
    label: "Loại quà nhận được",
    selects: [
      {
        label: "Robux",
        value: "robux",
      },
      {
        label: "Kim cương",
        value: "diamond",
      },
    ],
    isRequired: true,
    placeholder: "-- Chọn quà nhận được --",
  },
  {
    name: "active",
    type: "SWITCH",
    label: "Kích hoạt",
    isRequired: true,
  },
  {
    label: "Hình ảnh(Chỉ 1 ảnh)",
    name: "images",
    type: "FILE",
    isRequired: true,
  },
];

export default function CUEventPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const [form, _] = useState<Array<IFormInput>>(initialForm);
  const navigate = useNavigate();
  const eventMutation = useMutation({
    mutationFn: (data: FormData) => eventApi.upsert(data),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });
  useQuery({
    queryKey: ["event-detail", id],
    queryFn: () => eventApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      const result: { [key: string]: string | number } = {};
      for (const vl of data.data.data_public) {
        result[vl.key] = vl.value;
      }
      setFormValue({
        ...result,
        name: data.data.name,
        active: data.data.active === "OFF" ? false : true,
        images: [data.data.image],
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
    eventMutation.mutate(formData);
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa Event #${id}` : "Tạo Event mới"}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <FormBase
          dataForm={form}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}
