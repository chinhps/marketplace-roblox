import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface IModelAlert {
  msg: any;
  isOpen: boolean;
  isClose?: boolean;
  onClose: () => void;
  size: string;
  title: string;
}

function ModelAlert({
  msg,
  isOpen,
  isClose = true,
  onClose,
  size = "md",
  title = "Thông báo",
}: IModelAlert) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
        <ModalOverlay />
        <ModalContent mx={2} bg="white.100">
          <ModalHeader textAlign="center" fontWeight="bold">
            {title}
          </ModalHeader>
          <ModalCloseButton cursor="pointer" />
          <ModalBody>{msg}</ModalBody>
          {isClose && (
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModelAlert;
