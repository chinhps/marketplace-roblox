import InputCustom from "@/components/global/InputCustom/InputCustom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { OtherLogin } from "./LoginPage";
import { passwordValidate } from "@/utils/validate/register";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/apis/auth";
import { IRegisterInput } from "@/types/response/auth.type";
import { customToast } from "@/utils/const";
import { IButtonNextUser } from "@/types/form.type";

export default function RegisterPage() {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const toast = useToast(customToast);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: IRegisterInput) => {
      return AuthApi.register(data);
    },
    onError: () => {
      setNextStep(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutation.mutate({
      username: data.username,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  return (
    <Flex
      w="500px"
      bg="white.999"
      px={{ base: "2rem", lg: "4rem" }}
      pt="6rem"
      flexDirection="column"
      justifyContent="space-between"
      gap={10}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1" textAlign="center" className="showText">
          ĐĂNG KÝ
        </Heading>
        <Flex flexDirection="column" gap={3}>
          <Text textAlign="center" color="gray">
            ĐĂNG KÝ ĐỂ CÓ THỂ SỬ DỤNG
          </Text>
          {nextStep ? (
            <>
              <InputCustom
                placeholder="Mật khẩu"
                register={register}
                name="password"
                type="password"
                validate={passwordValidate}
                errors={errors}
              />
              <InputCustom
                placeholder="Nhập lại mật khẩu"
                type="password"
                register={register}
                name="password_confirmation"
                errors={errors}
                validate={{
                  required: "Mật khẩu không được để trống",
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Xác nhận mật khẩu không đúng!";
                    }
                  },
                }}
              />
            </>
          ) : (
            <InputCustom
              placeholder="Tên đăng nhập"
              register={register}
              name="username"
            />
          )}
          {!nextStep && (
            <Box>
              <Text textAlign="center" color="gray">
                Bạn cũng có thể dùng cách khác
              </Text>
              <OtherLogin />
            </Box>
          )}
          {!nextStep ? (
            <ButtonNextUser
              onClick={() => setNextStep(true)}
              nameCheck="username"
              watch={watch}
            >
              Tiếp tục
            </ButtonNextUser>
          ) : (
            <ButtonNextUser
              onClick={handleSubmit((e) => onSubmit(e))}
              isLoading={mutation.isLoading}
              nameCheck="password_confirmation"
              watch={watch}
            >
              Đăng ký ngay
            </ButtonNextUser>
          )}
          <Flex flexDirection="column" textAlign="center" mt="1rem" mb="3rem">
            <Link to="/auth/sign-in">
              <Text fontWeight="bold" color="gray">
                Bạn đã có sẵn tài khoản?
              </Text>
            </Link>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

function ButtonNextUser({ nameCheck, watch, ...props }: IButtonNextUser) {
  return (
    <Button
      py={9}
      type="button"
      rounded="3xl"
      isDisabled={watch?.(nameCheck) === "" || watch?.(nameCheck) === undefined}
      variant={
        watch?.(nameCheck) === "" || watch?.(nameCheck) === undefined
          ? "gray"
          : "red"
      }
      {...props}
    >
      <Text fontFamily="sans-serif" fontSize="18px" className="showText">
        {props.children}
      </Text>
      <Icon as={FiChevronRight} />
    </Button>
  );
}
