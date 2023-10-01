import { AuthApi, loginWith } from "@/apis/auth";
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
import { useMutation } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { customToast } from "@/utils/const";
import { ILoginInput } from "@/types/response/auth.type";

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast(customToast);
  const { handleSubmit, register, watch } = useForm();

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
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutation.mutate({
      username: data.username,
      password: data.password,
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
            isLoading={mutation.isLoading}
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

export function OtherLogin() {
  const getLinkSocialLoginMutate = useMutation({
    mutationFn: (login: string) => loginWith.urlLoginSocial(login),
    onSuccess: ({ data }) => {
      window.location = data.data.link;
    },
  });

  return (
    <Flex gap={2} my={3}>
      <Button
        aria-label="facebook login"
        bg="messenger.500"
        py={7}
        flex={1}
        isDisabled={getLinkSocialLoginMutate.isLoading}
        leftIcon={<Icon as={FaFacebook} color="white" fontSize="25px" />}
        onClick={() => getLinkSocialLoginMutate.mutate("facebook")}
        color="white.100"
      >
        Đăng nhập bằng Facebook
      </Button>
      {/* <IconButton
        aria-label="tiktok login"
        bg="black.100"
        py={7}
        flex={1}
        isDisabled={getLinkSocialLoginMutate.isLoading}
        icon={<Icon as={FaTiktok} color="white" fontSize="25px" />}
        onClick={() => getLinkSocialLoginMutate.mutate("tiktok")}
      /> */}
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
      {/* <Text fontWeight="bold" color="gray">
        Bạn không thể đăng nhập?
      </Text> */}
    </Flex>
  );
}
