import { ServiceHandlePostProps } from "@/types/service.type";
import {
  Box,
  GridItem,
  Img,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GameAction, HeadingService } from "./GameListGlobal";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import GameApi from "@/apis/games/gameApi";
import { useParams } from "react-router-dom";
import { IServiceDetailResponse } from "@/types/response/service.type";
import { TIMEOUT_SLEEP } from "@/utils/const";
import ModelService from "@/components/global/Model/ModelService";
import { shuffleArray } from "@/utils/price";

const gameApi = new GameApi();
let bgCardDefault = "";
let elementSelectedGlobal: HTMLDivElement | null = null;
let typeRoll: "REAL" | "FAKE" = "REAL";

export default function LuckyCard() {
  /****----------------
   *      HOOK
  ----------------****/
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      gameApi.setSlug(slug);
    }
  }, []);
  const serviceInfoQuery = useQuery({
    queryKey: ["service", slug],
    queryFn: () => gameApi.getData(),
    enabled: !!slug,
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      // Set link card default after flip
      bgCardDefault = data.data.service_image.images.image_1;
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <HeadingService
        price={serviceInfoQuery.data?.data.data.price ?? 0}
        notification={
          <Box
            dangerouslySetInnerHTML={{
              __html: serviceInfoQuery.data?.data.data.notification ?? "",
            }}
          />
        }
      >
        {serviceInfoQuery.data?.data.data.service_image.name}
      </HeadingService>
      {/* GAMES */}
      <GamePlay dataService={serviceInfoQuery.data?.data.data} />
      {/* END GAME */}
    </>
  );
}

function GamePlay({
  dataService,
}: {
  dataService: IServiceDetailResponse | undefined;
}) {
  /****----------------
   *      FLOW: 
   * - Add class "lucky-card-light" after selected
   * - Call Api
   * - Success:
   * + Add Class "flip-back" for card selected
   * + Change `src` Image selected by Image at Response
   * + Delay flip for card remaining
   * + Shuffer list `src` card images exception `src` at Response
   * + Flip card remaining
   * + Fill `src` Image remaining exception `src` at Response
  ----------------****/
  /****----------------
   *      HOOK
  ----------------****/
  const { handleSubmit, register } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFlip, setIsFlip] = useState<boolean>(false);
  const cardsRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const mutation = useMutation({
    mutationFn: ({ type, numrolllop }: ServiceHandlePostProps) => {
      setIsFlip(false);
      // Add effect light for card selected
      elementSelectedGlobal?.parentElement?.classList.add(`lucky-card-light`);
      if (type === "FAKE") {
        return gameApi.postDataTry({
          numrolllop,
        });
      }
      return gameApi.postData({
        numrolllop,
      });
    },
    onSuccess: async ({ data }) => {
      // Add Class "flip-back" for card selected
      elementSelectedGlobal?.classList.add(`flip-back`);
      // Change `src` Image selected by Image at Response
      (elementSelectedGlobal as HTMLImageElement).src =
        data.data?.gifts[0].image ?? "";
      // Delay flip for card remaining
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT_SLEEP * 1000));
      // Shuffer list `src` card images exception `src` at Response
      const serviceGiftsShuffer = shuffleArray(
        dataService?.gifts.filter((gift) => gift !== data.data?.gifts[0].image)
      );
      // Flip card remaining
      Object.values(cardsRef?.current?.children || {})
        .filter(
          (card) => card.children[0].children[0] !== elementSelectedGlobal
        )
        .map((element, index) => {
          element.children[0].children[0].classList.add(`flip-back`);
          // Fill `src` Image remaining exception `src` at Response
          (element.children[0].children[0] as HTMLImageElement).src =
            (serviceGiftsShuffer && serviceGiftsShuffer[index]) ?? "";
        });
      onOpen();
    },
  });

  /****----------------
   *      END-HOOK
  ----------------****/

  /****----------------
   *      HANDLE
  ----------------****/
  // Play try
  const onSubmitTry: SubmitHandler<FieldValues> = async (
    numrolllop,
    elementTaget
  ) => {
    elementSelectedGlobal = elementTaget?.target;
    await mutation.mutateAsync({
      type: "FAKE",
      numrolllop: Number(numrolllop),
    });
  };
  // Play real
  const onSubmit: SubmitHandler<FieldValues> = async (data, elementTaget) => {
    elementSelectedGlobal = elementTaget?.target;
    await mutation.mutateAsync({
      type: "REAL",
      numrolllop: Number(data.numrolllop),
    });
  };
  // Handle Click Button
  const handleClickRealFake = (type: "REAL" | "FAKE") => {
    handleFlipCard();
    // Change type roll outside function because not rerender
    typeRoll = type;
  };
  // Handle flip card
  const handleFlipCard = () => {
    setIsFlip(true);
    Object.values(cardsRef?.current?.children || {}).map((card) => {
      (card.children[0].children[0] as HTMLImageElement).src = bgCardDefault;
      card.children[0].children[0].classList.remove("flip-back");
      card.children[0].children[0].classList.add("flip");
      card.children[0].classList.remove(`lucky-card-light`);
    });
  };
  /****----------------
   *      END-HANDLE
  ----------------****/

  return (
    <>
      <ModelService
        data={mutation.data?.data}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SimpleGrid
        columns={3}
        w={{ "2sm": "100%", md: "50%" }}
        mx="auto"
        gap={2}
        ref={cardsRef}
      >
        {dataService?.gifts.map((image, key) => (
          <GridItem key={key} className="shake-card">
            <Box className="transtion">
              <Img
                transition="2s"
                w="lg"
                alt="lucky card chinh.dev"
                onClick={(e) => {
                  if (isFlip) {
                    const submitHandler = handleSubmit((d) => {
                      typeRoll === "REAL" ? onSubmit(d, e) : onSubmitTry(d, e);
                    });
                    submitHandler(e);
                  }
                }}
                src={image}
              />
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
      {/* ACTION */}
      <GameAction
        {...{
          textButton: "ÚP THẺ NGAY",
          hiddenNumloop: true,
          cardsRef,
          handleSubmit,
          isSubmitting: mutation.isLoading,
          onSubmit,
          register,
          handleTry: () => handleClickRealFake("FAKE"),
          handleClickSubmitCustom: () => handleClickRealFake("REAL"),
          service_price: dataService?.price ?? 0,
        }}
      />
    </>
  );
}
