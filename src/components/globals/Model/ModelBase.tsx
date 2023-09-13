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
  children: React.ReactNode;
}

export default function ModelBase({
  isOpen,
  onClose,
  children,
  ...props
}: IModelBase) {
  return (
    <>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
        <ModalOverlay />
        <ModalContent bg="white.100">
          <ModalHeader>Thông tin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter gap={2}>
            <Button bg="main.item" color="white" onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
