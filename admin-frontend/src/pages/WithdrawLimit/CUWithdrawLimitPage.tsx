import { withdrawLimitApi } from "@/apis/withdrawLimit";
import { withdrawTypeApi } from "@/apis/withdrawType";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialFormState: Array<IFormInput> = [
  {
    label: "Provider ID(UID)",
    name: "provider_id",
    type: "INPUT",
    isRequired: true,
  },
  {
    label: "Giới hạn",
    name: "limit",
    type: "NUMBER",
    placeholder: "Số lượng bị giới hạn trong tháng",
    isRequired: true,
  },
  {
    label: "Kích hoạt",
    name: "active",
    type: "SELECT",
    isRequired: true,
    placeholder: " -- Chọn kích hoạt --",
    selects: [
      {
        label: "Có",
        value: "ON",
      },
      {
        label: "Không",
        value: "OFF",
      },
    ],
  },
  {
    label: "Loại rút",
    name: "withdraw_type",
    type: "SELECT",
    isRequired: true,
    placeholder: "-- Loại giới hạn rút --",
    selects: [],
  },
];

export default function CUWithdrawLimitPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const [form, _] = useState<Array<IFormInput>>(() =>
    structuredClone(initialFormState)
  );
  const [formValue, setFormValue] = useState({});
  const navigate = useNavigate();
  const withdrawLimitMutation = useMutation({
    mutationFn: (data: object) => withdrawLimitApi.upsert(data),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });
  useQuery({
    queryKey: ["withdraw-detail", id],
    queryFn: () => withdrawLimitApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setFormValue({
        provider_id: data.data.user.provider_id,
        limit: data.data.withdraw_limit,
        active: data.data.active,
        withdraw_type: data.data.withdraw_type_id,
      });
    },
  });
  useQuery({
    queryKey: ["withdraw-types"],
    queryFn: () => withdrawTypeApi.all(),
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      const index = form.findIndex((vl) => vl.name === "withdraw_type");
      if (index !== -1) {
        form[index].selects = data.data.map((vl) => ({
          label: vl.name,
          value: vl.id.toString(),
        }));
      }
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    withdrawLimitMutation.mutate({ id: Number(id), ...data });
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa giới hạn #${id}` : "Tạo mới giới hạn"}
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
          Lưu ý: Giới hạn là giới hạn trong tháng đó, Qua tháng sau thì số lượng
          đã rút về 0
        </Text>
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
