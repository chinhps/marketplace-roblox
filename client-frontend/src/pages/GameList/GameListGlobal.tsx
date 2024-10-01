import ModelBase from "@/components/global/Model/ModelBase";
import { GameActionProps, GameSelectNumloop } from "@/types/service.type";
import { numberFormat, roundDownToThousand } from "@/utils/price";
import {
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaCaretRight, FaMoneyBill, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SelectNumloop({
  service_price,
  register,
  hidden,
  saleForNumloop
}: GameSelectNumloop) {
  return (
    <Select
      display={hidden ? "none" : "block"}
      w="300px"
      variant="main"
      fontSize="sm"
      ms={{ base: "0px", md: "0px" }}
      mb="24px"
      border="solid 1px"
      borderColor="red.200"
      fontWeight="500"
      size="lg"
      {...register("numrolllop", { required: "Bạn cần chọn số lần quay" })}
    >
      <option value="1">
        Chơi 1 lần - {numberFormat(roundDownToThousand(service_price * 1 * saleForNumloop.cost_1))}
      </option>
      <option value="2">
        Chơi 3 lần - {numberFormat(roundDownToThousand(service_price * 3 * saleForNumloop.cost_3))}
      </option>
      <option value="3">
        Chơi 5 lần - {numberFormat(roundDownToThousand(service_price * 5 * saleForNumloop.cost_5))}
      </option>
      <option value="5">
        Chơi 10 lần - {numberFormat(roundDownToThousand(service_price * 10 * saleForNumloop.cost_10))}
      </option>
    </Select>
  );
}

export function HeadingService({
  children,
  price,
  notification,
  linkHistory,
  textBtn = "Thể lệ",
}: {
  children: string | undefined;
  price?: number;
  notification: React.ReactElement | string;
  textBtn?: string;
  linkHistory?: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <ModelBase
        TextData={notification}
        isOpen={isOpen}
        onClose={onClose}
        children
      />
      <Heading
        as="h1"
        fontSize="3xl"
        textTransform="uppercase"
        mb="2rem"
        textAlign="center"
        className="showText"
      >
        {children}
      </Heading>
      <Flex
        justifyContent="space-between"
        mb={10}
        flexDirection={{ base: "column", md: "row" }}
        gap={2}
      >
        {typeof price !== "undefined" && (
          <HStack
            gap={2}
            flexDirection={{ base: "column", md: "row" }}
            w="100%"
          >
            <Button variant="action" gap={2}>
              <Icon as={FaUserAlt} w="13px"/>
              Đang chơi: {Math.floor(Math.random() * 50) + 2}
            </Button>
            <Button variant="action" gap={2}>
              <Icon as={FaMoneyBill} w="13px"/>
              {numberFormat(price)}
            </Button>
          </HStack>
        )}

        <HStack justifyContent={{ base: "center", lg: "right" }} w="100%">
          <Button variant="action" onClick={onOpen}>
            {textBtn}
          </Button>
          <Button variant="action" onClick={() => navigate(linkHistory ?? "./")}>
            Lịch sử
          </Button>
        </HStack>
      </Flex>
    </>
  );
}

export function GameAction({
  textButton,
  handleSubmit,
  onSubmit,
  register,
  isSubmitting,
  service_price,
  hiddenNumloop,
  handleClickSubmitCustom,
  watch,
  handleTry,
  saleForNumloop
}: GameActionProps) {
  const [isTrying, setIsTrying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isSubmitting === false) {
      setIsTrying(false);
      setIsPlaying(false);
    }
  }, [isSubmitting]);

  return (
    <VStack justifyContent="center" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectNumloop
          hidden={hiddenNumloop ?? false}
          register={register}
          service_price={service_price}
          saleForNumloop={saleForNumloop}
        />
        <HStack gap={2} justifyContent="center">
          <Button
            flex={1}
            isDisabled={isTrying || isPlaying}
            isLoading={isTrying}
            variant="playGameTry"
            onClick={() => {
              setIsTrying(true);
              return handleTry && watch && handleTry(watch("numrolllop"));
            }}
          >
            Chơi thử
          </Button>
          <Button
            flex={1}
            variant="playGame"
            isDisabled={isTrying || isPlaying}
            isLoading={isPlaying}
            onClick={(e) => {
              e.preventDefault();
              setIsPlaying(true);
              if (handleClickSubmitCustom) {
                return handleClickSubmitCustom();
              }
              return handleSubmit(onSubmit)();
            }}
          >
            <Icon as={FaCaretRight} />
            {textButton ?? "Quay ngay"}
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
