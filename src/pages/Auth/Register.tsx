import InputCustom from "@/components/global/InputCustom/InputCustom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [nextStep, setNextStep] = useState<boolean>(false);

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
      <Heading as="h1" textAlign="center" className="showText">
        ĐĂNG KÝ NGAY
      </Heading>
      <Flex flexDirection="column" gap={3}>
        {nextStep ? (
          <>
            <InputCustom placeholder="Mật khẩu" />
            <InputCustom placeholder="Nhập lại mật khẩu" />
          </>
        ) : (
          <InputCustom placeholder="Tên đăng nhập" />
        )}
        {!nextStep && (
          <Box>
            <Text textAlign="center" color="gray">
              Bạn cũng có thể dùng cách khác
            </Text>
            <Flex gap={2} my={3}>
              <Button bg="messenger.500" flex={1} py={7}>
                <Icon as={FaFacebook} color="white" fontSize="25px" />
              </Button>
              <Button bg="black.100" flex={1} py={7}>
                <Icon as={FaTiktok} color="white" fontSize="25px" />
              </Button>
            </Flex>
          </Box>
        )}

        <Button py={9} rounded="3xl" onClick={() => setNextStep(true)}>
          <Text fontFamily="sans-serif" fontSize="18px" className="showText">
            {nextStep ? "Đăng ký ngay" : "Tiếp tục"}
          </Text>
          <Icon as={FiChevronRight} />
        </Button>
        <Flex flexDirection="column" textAlign="center" mt="1rem" mb="3rem">
          <Link to="/auth/sign-in">
            <Text fontWeight="bold" color="gray">
              Bạn đã có sẵn tài khoản?
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
