import { AuthApi } from "@/apis/auth";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  useCallbackRef,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ILoginInput } from "@/types/response/auth.type";
import { useState } from "react";

const initialStateFormLogin: ILoginInput = {
  username: "",
  password: "",
  remember: false,
};

export default function LoginPage() {
  const [formState, setFormState] = useState<ILoginInput>(
    initialStateFormLogin
  );
  const navigate = useNavigate();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (data: ILoginInput) => {
      return AuthApi.login(data);
    },
    onSuccess: ({ data }) => {
      toast({
        description: data?.msg,
        status: "success",
      });
      if (data?.token) {
        localStorage.setItem("auth._token.local", data?.token);
        navigate("/", { state: { token: data?.token } });
      }
    },
  });

  // Handle
  const handleSubmit = () => {
    console.log(formState);
    mutation.mutate(formState);
  };
  const handleChange = useCallbackRef(
    (name: keyof ILoginInput) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement; // Type assertion
        const value =
          target.type === "checkbox" ? target.checked : target.value;
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
    []
  );

  return (
    <Flex
      w="500px"
      bg="white"
      px={{ base: "2rem", lg: "4rem" }}
      pt="6rem"
      flexDirection="column"
      justifyContent="space-between"
      gap={10}
    >
      <Heading as="h1" textAlign="center" className="showText">
        ĐĂNG NHẬP
      </Heading>
      <Flex flexDirection="column" gap={3}>
        <Text textAlign="center" color="gray">
          ĐĂNG NHẬP ĐỂ CÓ THỂ SỬ DỤNG
        </Text>
        <Input
          onChange={handleChange("username")}
          size="lg"
          placeholder="Tên đăng nhập"
          py="2rem"
        />
        <Input
          type="password"
          onChange={handleChange("password")}
          size="lg"
          placeholder="Mật khẩu"
          py="2rem"
        />
        <Checkbox onChange={handleChange("remember")}>
          Ghi nhớ đăng nhập
        </Checkbox>
        <Button
          mt="1rem"
          isLoading={mutation.isLoading}
          onClick={handleSubmit}
          py={9}
          rounded="2xl"
          variant="red"
        >
          <Text fontFamily="sans-serif" fontSize="18px" className="showText">
            Đăng nhập ngay
          </Text>
          <Icon as={FiChevronRight} />
        </Button>
        {/* OtherRecommend */}
        <OtherRecommend />
      </Flex>
    </Flex>
  );
}

function OtherRecommend() {
  return (
    <Flex flexDirection="column" textAlign="center" mt="1.5rem" mb="4rem">
      <Text fontWeight="bold" color="gray">
        Bạn không thể đăng nhập?
      </Text>
    </Flex>
  );
}
