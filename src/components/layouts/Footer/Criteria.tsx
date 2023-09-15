import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiClock, FiLock, FiStar, FiUsers } from "react-icons/fi";

export default function Criteria() {
  return (
    <>
      <Box
        zIndex={9}
        mt={10}
        bgImage="linear-gradient(to right, #131930a6, #131930a6), url('/banner.gif')"
        bgRepeat="no-repeat"
        bgSize="cover"
        py="6rem"
        borderBottom="1px"
        borderColor="main.item4"
      >
        <Container maxW="container.2xl" height="100%" flex={1} p={0} zIndex={5}>
          <HStack
            flexDirection={{ base: "column", lg: "row" }}
            alignItems="flex-start"
            color="white.100"
            spacing={{ base: 12, lg: 8 }}
          >
            <CriteriaItem
              icon={<FiLock />}
              heading="An Toàn"
              description="Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn với các biện pháp bảo mật hàng đầu, đảm bảo an toàn và riêng tư tuyệt đối."
            />
            <CriteriaItem
              icon={<FiUsers />}
              heading="Nhân Viên"
              description="Chúng tôi coi trọng nhân viên và tạo một môi trường làm việc tôn trọng và hỗ trợ, nơi mọi người có cơ hội phát triển và thành công cùng doanh nghiệp."
            />
            <CriteriaItem
              icon={<FiClock />}
              heading="Nhanh Chóng"
              description="Dịch vụ của chúng tôi được cung cấp nhanh chóng và hiệu quả, đáp ứng nhanh các yêu cầu và mang đến trải nghiệm tốt nhất cho khách hàng."
            />
            <CriteriaItem
              icon={<FiStar />}
              heading="Chất Lượng"
              description="Chúng tôi cam kết đem đến sản phẩm và dịch vụ chất lượng cao, đáp ứng những tiêu chuẩn và yêu cầu khắt khe nhất của khách hàng."
            />
          </HStack>
        </Container>
      </Box>
    </>
  );
}

function CriteriaItem({
  icon,
  heading,
  description,
}: {
  icon: React.ReactNode;
  heading: string;
  description: string;
}) {
  return (
    <>
      <VStack
        height="170px"
        align="initial"
        flex={1}
        bg="main.item"
        p="2rem"
        borderRadius="30px 0 30px 0"
        position="relative"
      >
        <Center
          position="absolute"
          top="-20%"
          right="5%"
          p="1.5rem"
          bg="main.item4"
          rounded="full"
        >
          {icon}
        </Center>
        <Heading as="h2" size="md" textTransform="uppercase">
          {heading}
        </Heading>
        <Text fontSize="14px" fontStyle="italic" color="gray.400">
          {description}
        </Text>
      </VStack>
    </>
  );
}
