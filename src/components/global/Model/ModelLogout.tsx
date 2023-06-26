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
import { useNavigate } from "react-router-dom";

export default function ModelLogout({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast(customToast);
  const navigate = useNavigate();

  const clearToken = () => {
    toast({
      description: "Thoát thành công!",
    });
    navigate("/");
    onClose();
    logout();
  };

  const handleLogoutAllDevice = () => {
    clearToken();
  };
  const handleLogoutCurrentDevice = () => {
    clearToken();
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white.100">
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
            <Button colorScheme="red" onClick={handleLogoutCurrentDevice}>
              Thoát ngay
            </Button>
            <Button colorScheme="green" onClick={handleLogoutAllDevice}>
              Thoát tất cả thiết bị
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
