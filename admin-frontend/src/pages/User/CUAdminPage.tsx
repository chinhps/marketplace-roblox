import { adminApi } from "@/apis/admin";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialForm: Array<IFormInput> = [
  {
    label: "Loại tài khoản",
    name: "admin_type",
    type: "SELECT",
    isRequired: true,
    placeholder: "-- Chọn loại admin --",
    selects: [
      { label: "KOC", value: "KOC" },
      { label: "Quản trị viên", value: "ADMIN" },
      { label: "Cộng tác viên", value: "CTV" },
    ],
  },
  {
    label: "Tên người dùng",
    name: "name",
    type: "INPUT",
    isRequired: true,
  },
  {
    label: "Tên đăng nhập",
    name: "username",
    type: "INPUT",
    isRequired: true,
    copy: true,
  },
  {
    label: "Mật khẩu",
    name: "password",
    type: "INPUT",
    // isRequired: true,
    copy: true,
  },
  {
    label: "Chặn người dùng",
    name: "block",
    type: "SWITCH",
  },

  {
    label: "Domain (Tùy chọn)",
    name: "domain",
    type: "INPUT",
    placeholder:
      "KOC chỉ có thể quản lý các giao dịch thuộc domain của bản thân",
  },
  {
    label: "Provider ID (Tùy chọn)",
    name: "provider_id",
    type: "INPUT",
    placeholder: "Người dùng ở shop sẽ lên VIP",
  },
];

export default function CUAdminPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const { id } = useParams();
  const [formValue, setFormValue] = useState({});
  const navigate = useNavigate();
  const adminMutation = useMutation({
    mutationFn: (data: object) => adminApi.create(data),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      navigate("../");
    },
  });

  useQuery({
    queryKey: ["admin-detail", id],
    queryFn: () => adminApi.get(Number(id)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setFormValue({
        admin_type: data.data.admin_type,
        name: data.data.name,
        username: data.data.username,
        block: data.data.block === "on",
        domain: data.data.shop?.domain,
        provider_id: data.data.user?.provider_id,
      });
    },
  });

  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    adminMutation.mutate({ ...data, id: id });
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa quản trị viên #${id}` : "Thêm quản trị viên mới"}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>Chỉ quản trị viên mới có thể tạo tài khoản</Text>
        <Text>Chỉnh sửa nếu không có mật khẩu sẽ dữ nguyên mật khẩu cũ</Text>

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
