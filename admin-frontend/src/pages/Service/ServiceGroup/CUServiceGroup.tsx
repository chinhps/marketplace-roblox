import { Button, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceGroupApi } from "@/apis/service";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { objectToFormData } from "@/utils/function";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";

const initialForm: Array<IFormInput> = [
  {
    label: "Tên nhóm dịch vụ",
    name: "name",
    type: "INPUT",
    isRequired: true,
  },
  {
    label: "Mức độ ưu tiên",
    name: "prioritize",
    type: "NUMBER",
    isRequired: true,
    placeholder: "Nếu số càng to thì nó sẽ hiển thị trước",
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
    label: "Ảnh đại diện",
    name: "image",
    type: "FILE",
    isRequired: true,
  },
];

export default function CUServiceGroup() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const navigate = useNavigate();
  const serviceGroupMutation = useMutation({
    mutationFn: (dataForm: FormData) => serviceGroupApi.create(dataForm),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../../");
    },
  });
  useQuery({
    queryKey: ["service-group-detail", id],
    queryFn: () => serviceGroupApi.get(Number(id)),
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
      ...data,
    });
    serviceGroupMutation.mutate(formData);
  };
  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa nhóm dịch vụ #${id}` : "Tạo mới nhóm dịch vụ"}
        fontSize="25px"
        button={
          <Link to="../../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>Mức độ ưu tiên nhỏ hơn sẽ được hiển thị sau</Text>
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
