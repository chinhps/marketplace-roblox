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
  isLoading?: boolean;
  onClose: () => void;
  handleConfirm?: () => void;
  TextData?: React.ReactElement | string | null;
  children: React.ReactElement | null;
  title?: string;
}

export default function ModelConfirm({
  isOpen,
  onClose,
  isLoading,
  TextData,
  handleConfirm,
  children,
  title,
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
        <ModalContent bg="white.100">
          <ModalHeader>{title ?? "Thông báo"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{TextData ?? children}</ModalBody>

          <ModalFooter gap={2}>
            {handleConfirm && (
            <Button variant="auth" onClick={handleConfirm} isLoading={isLoading}>
                Chấp nhận
              </Button>
            )}
            <Button onClick={onClose}>Thoát</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
