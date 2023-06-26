import { AuthApi } from "@/apis/auth";
import InputCustom from "@/components/global/InputCustom/InputCustom";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ILoginResponse } from "@/types/response/auth.type";
import { customToast } from "@/utils/const";

export default function Login() {
  const { handleSubmit, register, watch } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast(customToast);

  const {
    isFetching,
  }: {
    isFetching: boolean;
    data: ILoginResponse | null | undefined;
    error: ILoginResponse | null | undefined;
  } = useQuery({
    queryKey: ["login_fetch"],
    enabled: false,
    onError: (error) => {
      toast({
        description: error?.msg,
        status: "warning",
      });
    },
    onSuccess: (data) => {
      toast({
        description: data?.msg,
        status: "success",
      });
      if (data?.token) {
        localStorage.setItem("auth._token.local", data?.token);
        navigate("/");
      }
    },
  });

  // Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    queryClient.prefetchQuery({
      queryKey: ["login_fetch"],
      queryFn: () =>
        AuthApi.login({
          username: data.username,
          password: data.password,
        }),
    });
  };

  return (
    <Flex
      w="500px"
      bg="white.100"
      px={{ base: "2rem", lg: "4rem" }}
      pt="6rem"
      flexDirection="column"
      justifyContent="space-between"
      gap={10}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1" textAlign="center" className="showText">
          ĐĂNG NHẬP
        </Heading>
        <Flex flexDirection="column" gap={3}>
          <Text textAlign="center" color="gray">
            ĐĂNG NHẬP ĐỂ CÓ THỂ SỬ DỤNG
          </Text>
          <InputCustom
            placeholder="Tên đăng nhập"
            register={register}
            name="username"
          />
          <InputCustom
            type="password"
            placeholder="Mật khẩu"
            register={register}
            name="password"
          />
          {/* OtherLogin */}
          <OtherLogin />
          <Checkbox {...register("remember")}>Ghi nhớ đăng nhập</Checkbox>
          <Button
            isLoading={isFetching}
            isDisabled={
              !changeColorButton(watch("username"), watch("password"))
            }
            type="submit"
            py={9}
            rounded="2xl"
            variant={
              changeColorButton(watch("username"), watch("password"))
                ? "red"
                : "gray"
            }
          >
            <Text fontFamily="sans-serif" fontSize="18px" className="showText">
              Đăng nhập ngay
            </Text>
            <Icon as={FiChevronRight} />
          </Button>
          {/* OtherRecommend */}
          <OtherRecommend />
        </Flex>
      </form>
    </Flex>
  );
}

function changeColorButton(vl1: string | undefined, vl2: string | undefined) {
  return vl1 !== "" && vl2 !== "" && typeof vl1 !== "undefined";
}

function OtherLogin() {
  return (
    <Flex gap={2} my={3}>
      <Button bg="messenger.500" flex={1} py={7}>
        <Icon as={FaFacebook} color="white" fontSize="25px" />
      </Button>
      <Button bg="black.100" flex={1} py={7}>
        <Icon as={FaTiktok} color="white" fontSize="25px" />
      </Button>
    </Flex>
  );
}

function OtherRecommend() {
  return (
    <Flex flexDirection="column" textAlign="center" mt="1.5rem" mb="4rem">
      <Link to="/auth/sign-up">
        <Text fontWeight="bold" color="gray">
          Bạn chưa có tài khoản? Đăng ký ngay
        </Text>
      </Link>
      <Text fontWeight="bold" color="gray">
        Bạn không thể đăng nhập?
      </Text>
    </Flex>
  );
}
