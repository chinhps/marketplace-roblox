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
  footerButtons?: { text: string; onClick: () => void; props?: object }[];
}

export default function ModelBase({
  isOpen,
  onClose,
  children,
  footerButtons,
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
            {footerButtons &&
              footerButtons.map((button, index) => (
                <Button
                  key={index}
                  color="white"
                  bg="main.item"
                  onClick={button.onClick}
                  {...button.props}
                >
                  {button.text}
                </Button>
              ))
            }
            <Button onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
