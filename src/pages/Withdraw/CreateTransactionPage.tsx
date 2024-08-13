import { withdrawApi } from "@/apis/withdraw";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const initialFormState: Array<IFormInput> = [
  {
    label: "Số tiền",
    name: "amount",
    type: "NUMBER",
    min: 100000,
    default: "100000",
    placeholder: "Số tiền muốn rút",
    isRequired: true,
  },
  {
    label: "Ghi chú",
    name: "note",
    type: "TEXTAREA",
    placeholder: "Thông tin ngân hàng",
    isRequired: true,
  },
];

export default function CreateTransactionPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const navigate = useNavigate();
  const withdrawMutation = useMutation({
    mutationFn: (data: object) => withdrawApi.create(data),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    withdrawMutation.mutate(data);
  };
  return (
    <>
      <CardCollection
        title={"Tạo lệnh rút tiền cho cộng tác viên"}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>Lưu ý: Thông báo quản trị viên để có thể duyệt nhanh hơn! Rút ít nhất 100.000đ</Text>
        <FormBase
          dataForm={initialFormState}
          textBtn={"Tạo lệnh"}
          onSubmit={onSubmit}
          isSubmitCustom={withdrawMutation.isLoading}
        />
      </CardCollection>
    </>
  );
}
