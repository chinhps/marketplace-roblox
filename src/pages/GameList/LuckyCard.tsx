import { GameActionProps, ListGiftsInterface } from "@/types/service.type";
import { numberFormat, shuffleArray } from "@/utils/price";
import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Icon,
  Img,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { FaMoneyBill, FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import SelectNumloop from "./GameListGlobal";

export default function LuckyCard() {
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
      {/* GAMES */}
      <GamePlay />
      {/* END GAME */}
    </>
  );
}

const listGifts: Record<keyof ListGiftsInterface, string> = {
  img1: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800724639.png",
  img2: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800231943.png",
  img3: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800690114.png",
  img4: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800976235.png",
  img5: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800454175.png",
  img6: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800309335.png",
  img7: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800390059.png",
  img8: "https://quanly.gameroblox.vn/upload/doanhmuc/167985780094135.png",
  img9: "https://quanly.gameroblox.vn/upload/doanhmuc/1679857800918120.png",
};

function GamePlay() {
  const cardsRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  // const { slug } = useParams<string>();

  const onSubmit: SubmitHandler<FieldValues> = async (data, elementTaget) => {
    console.log(data, elementTaget?.target);

    // const { numrolllop } = data;
    // element.children[0].classList.add(`lucky-card-light`);
    // const fetchPlaying = await productAPI.is_playing(
    //   slug,
    //   "real",
    //   data.numrolllop
    // );
    // if (fetchPlaying.status !== "ERROR") {
    //   // Bài được chọn lật lại
    //   // element.children[0].children[0].classList.remove(`flip`);
    //   element.children[0].children[0].classList.add(`flip-back`);
    //   element.children[0].children[0].src = fetchPlaying.msg?.image;
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   // Tất cả bài còn lại cũng lật lại
    //   flipCard("flip", "remove", element);
    //   flipCard("flip-back", "add", element);
    //   // Thêm hình vào cho các lá bài còn lại
    //   srcCard(fetchPlaying.msg?.list, element, fetchPlaying.msg?.image);
    //   setDataFetch(TextMsgGames(fetchPlaying));
    // } else {
    //   setDataFetch(fetchPlaying.msg.name);
    // }
    // setIsLoading(false);
    // onOpen();
  };

  return (
    <>
      <SimpleGrid
        columns={3}
        w={{ "2sm": "100%", md: "50%" }}
        mx="auto"
        gap={2}
        ref={cardsRef}
      >
        {Object.keys(listGifts ?? []).map((image, key) => (
          <GridItem key={key} className="shake-card">
            <Box className="transtion">
              <Img
                transition="2s"
                // pointerEvents="none"
                w="lg"
                alt="lucky card chinh.dev"
                onClick={(e) => {
                  const submitHandler = handleSubmit((d) => {
                    onSubmit(d, e);
                  });
                  submitHandler(e);
                }}
                src={listGifts[image as keyof ListGiftsInterface]}
              />
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
      {/* HÀNH ĐỘNG GAME */}
      <GameAction
        {...{
          cardsRef,
          handleSubmit,
          isSubmitting,
          onSubmit,
          register,
          service_price: 100000,
        }}
      />
    </>
  );
}

function GameAction({
  cardsRef,
  handleSubmit,
  onSubmit,
  register,
  isSubmitting,
  service_price,
}: GameActionProps) {
  // Src tất cả bài (đổi ảnh thẻ bài)
  const srcCard = (
    srcs: string[] = [],
    excludeElm: HTMLDivElement | null = null,
    excludeSrc: string | null = null
  ) => {
    // Loại các elm đã chọn
    const filterCardsRef = Object.values(
      cardsRef?.current?.children || {}
    ).filter((card) => {
      return card !== excludeElm;
    });

    // Loại ảnh kết quả nhận được
    let filterSrcs = srcs.filter((src) => {
      return src !== excludeSrc;
    });

    filterSrcs = shuffleArray(filterSrcs);

    filterCardsRef.forEach((card, index) => {
      if (card) {
        const imageElement = card.children[0].children[0] as HTMLImageElement;
        if (imageElement) {
          imageElement.src = filterSrcs[index];
        }
      }
    });
  };

  // Class tất cả bài
  const flipCard = (className = "flip", type = "add", exclude = null) => {
    cardsRef?.current?.children &&
      [...cardsRef.current.children].forEach((card) => {
        // loại bài đã chọn đi
        if (card === exclude) return;

        if (card) {
          (card.children[0].children[0] as HTMLImageElement).src = "";
          if (type === "add") {
            card.children[0].children[0].classList.remove("flip-back");
            card.children[0].children[0].classList.add(className);
            card.children[0].classList.remove(`lucky-card-light`);
          } else {
            card.children[0].children[0].classList.remove(className);
          }
        }
      });
  };

  return (
    <VStack justifyContent="center" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectNumloop
          hidden={true}
          register={register}
          service_price={service_price}
        />
        <HStack gap={1} justifyContent="center">
          <Button
            isLoading={isSubmitting}
            onClick={() => flipCard("flip", "add")}
            variant="playGame"
          >
            ÚP THẺ NGAY
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
