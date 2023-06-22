import { GameActionProps } from "@/types/service.type";
import { numberFormat } from "@/utils/price";
import { Box, Button, Flex, HStack, Icon, Img, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaCaretRight, FaMoneyBill, FaUserAlt } from "react-icons/fa";
import SelectNumloop from "./GameListGlobal";

export default function LuckyBox() {
  return (
    <>
      <Flex
        justifyContent="space-between"
        mb={10}
        flexDirection={{ base: "column", md: "row" }}
        gap={2}
      >
        <HStack gap={2} flexDirection={{ base: "column", md: "row" }}>
          <Button variant="action" gap={2}>
            <Icon as={FaUserAlt} w="13px" variant="action" />
            Đang chơi: {Math.floor(Math.random() * 50) + 2}
          </Button>
          <Button variant="action" gap={2}>
            <Icon as={FaMoneyBill} w="13px" variant="action" />
            {numberFormat(199000)}
          </Button>
        </HStack>
        <HStack justifyContent="center">
          <Button flex={1} variant="action">
            Thể lệ
          </Button>
          <Button flex={1} variant="action">
            Lịch sử
          </Button>
        </HStack>
      </Flex>
      <GamePlay />
    </>
  );
}

function GamePlay() {
  const wheelImg = useRef<HTMLImageElement>({} as HTMLImageElement);
  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const [isTry, setIsTry] = useState<boolean>(false);
  const [giftBingo, setGiftBingo] = useState<number | undefined>(undefined);

  // const { slug } = useParams<string>();

  const service_background =
    "https://quanly.gameroblox.vn/upload/doanhmuc/1680018275408537.png";
  const service_pending_image =
    "https://quanly.gameroblox.vn/upload/doanhmuc/1680018275471186.gif";
  const service_default_image =
    "https://quanly.gameroblox.vn/upload/doanhmuc/1680273849415480.gif";
  const service_gifts: Array<string> = [];

  // Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const handleTry = async (numrolllop: number) => {
    console.log(numrolllop);
  };

  function GiftLuckyBox({ image }: { image: string }) {
    return (
      <>
        <Img
          onClick={handleSubmit((d) => onSubmit(d))}
          position="absolute"
          zIndex={3}
          _hover={{ opacity: 0.7 }}
          top={-5}
          left={0}
          right={0}
          bottom={0}
          transition="0.5s"
          opacity={1}
          cursor="pointer"
          m="auto"
          w="400px"
          alt="chinh.dev"
          src={image}
        />
      </>
    );
  }

  return (
    <>
      <HStack justifyContent="center" mt={3}>
        <Box position="relative" zIndex={1}>
          <Img
            zIndex={2}
            ref={wheelImg}
            transition="2s"
            pointerEvents="none"
            w="lg"
            alt="chinh.dev"
            src={service_background}
          />
          {isSubmitting || isTry ? (
            <GiftLuckyBox image={service_pending_image} />
          ) : giftBingo ? (
            <GiftLuckyBox image={service_gifts[giftBingo]} />
          ) : (
            <GiftLuckyBox image={service_default_image} />
          )}
        </Box>
      </HStack>
      <GameAction
        {...{
          handleSubmit,
          isSubmitting,
          onSubmit,
          register,
          service_price: 100000,
          isTry,
          watch,
          handleTry,
        }}
      />
    </>
  );
}

function GameAction({
  handleSubmit,
  onSubmit,
  register,
  isSubmitting,
  service_price,
  isTry,
  watch,
  handleTry,
}: GameActionProps) {
  return (
    <VStack justifyContent="center" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectNumloop
          hidden={false}
          register={register}
          service_price={service_price}
        />
        <HStack gap={2} justifyContent="center">
          <Button
            flex={1}
            isLoading={isTry}
            variant="playGameTry"
            onClick={() => handleTry && watch && handleTry(watch("numrolllop"))}
          >
            Chơi thử
          </Button>
          <Button
            flex={1}
            variant="playGame"
            isLoading={isSubmitting}
            type="submit"
          >
            <Icon as={FaCaretRight} />
            Quay ngay
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
