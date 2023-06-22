import { numberFormat } from "@/utils/price";
import { Box, Button, Flex, HStack, Icon, Img, VStack } from "@chakra-ui/react";
import { FaCaretRight, FaMoneyBill, FaUserAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectNumloop from "./GameListGlobal";
import { GameActionProps } from "@/types/service.type";

const num_loop = 20;
const num_gift = 8;
let angle_gift = 0;

export default function LuckyWheel() {
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
  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const [deg_temp, setDeg_temp] = useState<number>(0);
  const [isTry, setIsTry] = useState<boolean>(false);

  const wheelImg = useRef<HTMLDivElement>({} as HTMLDivElement);

  const service_wheel =
    "https://quanly.gameroblox.vn/upload/doanhmuc/167985749078203.png";
  const service_button =
    "https://quanly.gameroblox.vn/upload/doanhmuc/1674163694245285.png";

  const handleTry = async (numrolllop: number) => {
    setIsTry(true);
    // wheelImg.current.classList.add(`rotating`);
    // const fetchPlaying = await productAPI.is_playing(slug, "try", numrolllop);
    // await delay(TIMEOUT_SLEEP);
    // wheelImg.current.classList.remove(`rotating`);
    // loop(fetchPlaying?.msg.pos);
    // setDataFetch(TextMsgGames(fetchPlaying));
    // onOpen();
    // setIsTry(false);
  };

  const loop = (gift: number) => {
    angle_gift =
      deg_temp +
      (360 - (deg_temp % 360)) +
      (360 * num_loop - gift * (360 / num_gift));
    setDeg_temp(angle_gift);
    wheelImg.current.style.transform = `rotate(${angle_gift}deg)`;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    wheelImg.current.classList.add(`rotating`);
    // const fetchPlaying = await productAPI.is_playing(
    //   slug,
    //   "real",
    //   data.numrolllop
    // );
    // await delay(TIMEOUT_SLEEP);
    wheelImg.current.classList.remove(`rotating`);

    // if (fetchPlaying.status !== "ERROR") {
    //   loop(fetchPlaying?.msg.pos);
    //   setDataFetch(TextMsgGames(fetchPlaying));
    // } else {
    //   setDataFetch(fetchPlaying.msg.name);
    // }

    // onOpen();
  };

  return (
    <>
      <HStack justifyContent="center" mt={3}>
        <Box position="relative" zIndex={1}>
          <Box ref={wheelImg}>
            <Img
              zIndex={2}
              transition="2s"
              pointerEvents="none"
              w="lg"
              alt="chinh.dev"
              src={service_wheel}
            />
          </Box>
          <Img
            onClick={handleSubmit((d) => onSubmit(d))}
            position="absolute"
            zIndex={3}
            _hover={{ opacity: 1 }}
            top={-5}
            left={0}
            right={0}
            bottom={0}
            transition="0.5s"
            opacity={0.7}
            cursor="pointer"
            m="auto"
            w="100px"
            alt="chinh.dev"
            src={service_button}
          />
        </Box>
      </HStack>
      <GameAction
        {...{
          handleSubmit,
          onSubmit,
          register,
          isSubmitting,
          service_price: 2000000,
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
