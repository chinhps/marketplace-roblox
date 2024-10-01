import { IBaseResponseDetail } from "@/types/response/base.type";
import { IServiceHandle } from "@/types/response/service.type";
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
  HStack,
  Grid,
  GridItem,
  Img,
  List,
  ListItem,
} from "@chakra-ui/react";
import Tag from "../Tag/Tag";

export default function ModelService({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: IBaseResponseDetail<IServiceHandle> | undefined;
}) {
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent bg="main.item" color="white.100">
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Kết quả(
              <Text as="b" color="red.500">
                {data?.data.roll_name}
              </Text>
              ): Quay {data?.data.gifts.length ?? 0} lần - Giá{" "}
              {numberFormat(data?.data.price ?? 0)}
            </Text>
            <HStack mb="1rem">
              <Text>Tổng trúng:</Text>
              {data?.data.total.map((vl) => (
                <Tag
                  key={vl.type}
                  value={`${numberFormat(vl.value, false)} ${vl.type_name}`}
                />
              ))}
            </HStack>
            <Grid templateColumns="repeat(3,1fr)" gap={5} alignItems="center">
              <GridItem colSpan={1} p="1rem">
                {data?.data.gifts && data?.data.gifts.length > 0 ? (
                  <Img
                    src={
                      data?.data.gifts[0].image ??
                      "https://i.imgur.com/8KFQ1hh.png"
                    }
                    w={60}
                    alt="gift"
                  />
                ) : null}
              </GridItem>
              <GridItem colSpan={2}>
                <List spacing={1}>
                  {data?.data.gifts.map((vl, index) => (
                    <ListItem key={index}>
                      Quay lần {index + 1}: {vl.msg}
                    </ListItem>
                  ))}
                </List>
              </GridItem>
            </Grid>
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
