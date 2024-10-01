import { useUserData } from "@/hooks/UserDataProvider";
import { customToast, token } from "@/utils/const";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

export default function IsAuthentication({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast(customToast);

  if (!token()) {
    toast({
      description: "Bạn cần đăng nhập trước khi sử dụng!",
    });
    return <Navigate to="/" replace />;
  }

  const userData = useUserData();

  if (userData?.status === "loading") {
    return (
      <Center>
        <Spinner color="red.500" />
      </Center>
    );
  }

  if (userData?.status === "error") {
    toast({
      description: "Phiên đăng nhập hết hạn hoặc lỗi! Vui lòng đăng nhập lại",
    });
    localStorage.removeItem("auth._token.local");
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
