import { AuthApi } from "@/apis/auth";
import { ILogoutInput } from "@/types/response/auth.type";
import { customToast } from "@/utils/const";
import { logout } from "@/utils/price";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ModelLogout({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast(customToast);
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const [isLogoutAll, setIsLogoutAll] = useState(false);

  const logoutQuery = useMutation({
    mutationFn: (data: ILogoutInput) => {
      return AuthApi.logout(data);
    },
    onSuccess: ({ data }) => {
      toast({
        description: data?.data.msg,
      });
      clearToken();
    },
  });

  const clearToken = () => {
    onClose();
    logout();
    navigate("/auth/sign-in");
  };

  // Handle
  const handleLogoutAllDevice = () => {
    setIsLogoutAll(true);
    logoutQuery.mutate({
      typeLogout: "ALL",
    });
  };
  const handleLogoutCurrentDevice = () => {
    setIsLogout(true);
    logoutQuery.mutate({
      typeLogout: "CURRENT",
    });
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="main.item" color="white.100">
          <ModalHeader>Đăng xuất</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Bạn có chắc là muốn đăng xuất không?
            </Text>
            <Text>
              Bạn có có thể thoát nhiều thiết bị hoặc chỉ thoát thiết bị hiện
              tại!
            </Text>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button
              isLoading={isLogout}
              colorScheme="red"
              onClick={handleLogoutCurrentDevice}
            >
              Thoát ngay
            </Button>
            <Button
              isLoading={isLogoutAll}
              colorScheme="green"
              onClick={handleLogoutAllDevice}
            >
              Thoát tất cả thiết bị
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
