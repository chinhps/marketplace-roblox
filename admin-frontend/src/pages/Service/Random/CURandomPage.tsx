import CardCollection from "@/components/globals/CardCollection";
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { serviceApi } from "@/apis/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { numberFormat } from "@/utils/function";
import { SubmitHandler } from "react-hook-form";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { IServiceGameRandomCreate } from "@/types/response/service.type";
import { FiZap } from "react-icons/fi";
import { randomApi } from "@/apis/account";

export default function CURandomPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [inputRandomList, setInputRandomList] = useState<IFormInput>({
    label: "Thông tin tài khoản(Mỗi tài khoản 1 hàng)",
    name: "list_account",
    type: "TEXTAREA",
    placeholder: "123123",
  });
  const [idServiceGame, setIdServiceGame] = useState<number>();
  const serviceGameListMutation = useMutation({
    mutationFn: (data: IServiceGameRandomCreate) => randomApi.create(data),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
      });
      navigate("../");
    },
  });
  const serviceGameListQuery = useQuery({
    queryKey: ["serviceGameList", "RANDOM"],
    queryFn: () => serviceApi.serviceGameList("RANDOM"),
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
    setIdServiceGame(Number(e.target.value));
    const searchDataFormByQuery = serviceGameListQuery.data?.data.data.find(
      (value) => value.id === Number(e.target.value)
    );
    if (searchDataFormByQuery?.private_form.length === 0) {
      toast({
        description: "Random này không thể đăng vì chưa được cấu hình!",
        status: "error",
      });
    }
    console.log(searchDataFormByQuery?.private_form);

    setInputRandomList((prev) => ({
      ...prev,
      placeholder: searchDataFormByQuery?.private_form
        .map((item) => item.label)
        .join(" | "),
    }));
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    serviceGameListMutation.mutate({
      idServiceGame: idServiceGame ?? 0,
      ...data,
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
          <Icon as={FiZap} /> Lời khuyên: Nên chia nhỏ số lượng tài khoản để
          đăng nếu 1 lần quá 1.000 tài khoản
        </Text>
        <Text>
          Chỉ có thể tải lên theo định dạng được hiển thị. Nếu có tài khoản bị
          lỗi hoặc không đúng định dạng trong danh sách thì những tài khoản
          trước đó sẽ KHÔNG được lưu
        </Text>
        <FormControl isRequired my="1rem">
          <FormLabel>Chọn loại tài khoản</FormLabel>
          <Select
            variant="auth"
            placeholder="Loại tài khoản"
            onChange={handleChangeServiceGame}
          >
            {serviceGameListQuery.data?.data.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.note} - Giá {numberFormat(item.price)}
              </option>
            ))}
          </Select>
        </FormControl>
        {idServiceGame && (
          <FormBase
            dataForm={[inputRandomList]}
            textBtn={id ? "Cập nhật" : "Thêm mới"}
            onSubmit={onSubmit}
          />
        )}
      </CardCollection>
    </>
  );
}
