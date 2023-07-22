import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export default function ModelBase({
  isOpen,
  onClose,
  TextData,
}: {
  isOpen: boolean;
  onClose: () => void;
  TextData: React.ReactElement | string;
}) {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="main.item" color="white.100">
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{TextData}</ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="green" onClick={onClose}>
              Thoát
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
