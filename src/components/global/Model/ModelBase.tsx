import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps,
} from "@chakra-ui/react";

interface IModelBase extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  TextData: React.ReactElement | string;
}

export default function ModelBase({
  isOpen,
  onClose,
  TextData,
  ...props
}: IModelBase) {
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
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
