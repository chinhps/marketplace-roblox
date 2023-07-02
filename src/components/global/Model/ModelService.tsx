import { numberFormat } from "@/utils/price";
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
} from "@chakra-ui/react";

export default function ModelService({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="main.item">
          <ModalHeader>Thông báo</ModalHeader>
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
            <Button colorScheme="green" onClick={onClose}>
              Thoát
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// const TextMsgGames = (data) => {
//   return (
//     <>
//       <Text>
//         Kết quả quay
//         <Text as="span" textColor="brand.500">
//           ({data?.msg.type_playing})
//         </Text>
//         : Quay {data?.msg.name.length} lần - giá {numberFormat(data.msg.cash)}
//       </Text>
//       <Text>
//         <Text as="b"> Mua X{data?.msg.name.length}</Text>: Tổng Trúng
//         <Text as="span" textColor="brand.500" pl={2}>
//           {data?.msg.diamond}
//         </Text>
//       </Text>
//       {data?.msg.name.map((vl, index) => (
//         <Text key={index}>
//           - Quay lần {index + 1}: {vl}
//         </Text>
//       ))}
//     </>
//   );
// };
