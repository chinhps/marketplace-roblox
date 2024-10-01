import { pluginApi } from "@/apis/plugin";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CUPluginPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const [form, setForm] = useState<Array<IFormInput>>([]);
  const navigate = useNavigate();
  const pluginMutation = useMutation({
    mutationFn: (data: object) => pluginApi.upsert(data),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });
  useQuery({
    queryKey: ["plugin-detail", id],
    queryFn: () => pluginApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setForm(data.data.form_public);
      const result: { [key: string]: string | number } = {};
      for (const vl of data.data.data_public) {
        result[vl.key] = vl.value;
      }
      setFormValue(result);
    },
  });

  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data", data);
    pluginMutation.mutate({ id: Number(id), data: data });
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa Plugin #${id}` : "Tạo mới shop"}
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
          dataForm={form}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}
