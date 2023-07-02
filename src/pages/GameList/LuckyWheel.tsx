import { Box, HStack, Img, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GameAction, HeadingService } from "./GameListGlobal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import GameApi from "@/apis/games/gameApi";
import { useEffect } from "react";
import ModelService from "@/components/global/Model/ModelService";
import { IServiceDetailResponse } from "@/types/response/service.type";
import { TIMEOUT_SLEEP } from "@/utils/const";
import { ServiceHandlePostProps } from "@/types/service.type";

const num_loop = 20;
const gameApi = new GameApi();
let num_gift = 8; // mặc định là 8
let angle_gift = 0;
let degOld = 0;

export default function LuckyWheel() {
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
      // Sửa số lượng quà theo ảnh
      num_gift = data.data.gifts.length;
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <HeadingService price={serviceInfoQuery.data?.data.data.price ?? 0}>
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
   *      HOOK
  ----------------****/
  const { handleSubmit, register, watch } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wheelImg = useRef<HTMLDivElement>({} as HTMLDivElement);
  const mutation = useMutation({
    mutationFn: async ({ type, numrolllop }: ServiceHandlePostProps) => {
      // Add class effect swing
      wheelImg.current.classList.add(`rotating`);
      // Delay result
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT_SLEEP * 1000));
      if (type === "FAKE") {
        return gameApi.postDataTry({
          numrolllop,
        });
      }
      return gameApi.postData({
        numrolllop,
      });
    },
    onSuccess: ({ data }) => {
      onOpen();
      console.log(data);
      handleLoop(1);
      // Clear class effect swing
      wheelImg.current.classList.remove(`rotating`);
    },
  });

  /****----------------
   *      END-HOOK
  ----------------****/

  const service_button =
    "https://quanly.gameroblox.vn/upload/doanhmuc/1674163694245285.png";

  /****----------------
   *      HANDLE
  ----------------****/
  // Handle location gift
  const handleLoop = (gift: number) => {
    angle_gift =
      degOld +
      (360 - (degOld % 360)) +
      (360 * num_loop - gift * (360 / num_gift));
    degOld = angle_gift;
    wheelImg.current.style.transform = `rotate(${angle_gift}deg)`;
  };

  // Handle size for gift
  const handleGiftSize = (width: number) => {
    return Math.sqrt(Math.pow(width / (num_gift / 2), 2) / 2) - 70;
  };

  // Play try
  const handleTry = async (numrolllop: number) => {
    await mutation.mutateAsync({
      type: "FAKE",
      numrolllop: Number(numrolllop),
    });
  };

  // Play real
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await mutation.mutateAsync({
      type: "REAL",
      numrolllop: Number(data.numrolllop),
    });
  };

  /****----------------
   *      END-HANDLE
  ----------------****/
  return (
    <>
      <ModelService isOpen={isOpen} onClose={onClose} />
      <HStack justifyContent="center" mt={3}>
        <Box position="relative" zIndex={1} overflow="hidden">
          <Box position="relative" ref={wheelImg}>
            {dataService?.gifts.map((gift, index) => (
              <Box
                key={index}
                position="absolute"
                inset={0}
                top="5%"
                bottom="50%"
                transform={`rotate(${(360 / num_gift) * (index + 1)}deg)`}
                transformOrigin="bottom"
              >
                <Img
                  zIndex={3}
                  mx="auto"
                  width={{
                    base: handleGiftSize(window.innerWidth),
                    md: handleGiftSize(550),
                  }}
                  aspectRatio="1/1"
                  alt={dataService?.service_image.name + " gift by chinh.dev"}
                  src={gift}
                />
              </Box>
            ))}
            <Box
              zIndex={2}
              w="100%"
              maxWidth="550px"
              aspectRatio="1/1"
              rounded="full"
              overflow="hidden"
            >
              <Img
                transition="2s"
                width="100%"
                height="100%"
                pointerEvents="none"
                objectFit="cover"
                alt={dataService?.service_image.name + " by chinh.dev"}
                src={dataService?.service_image.images.image_1}
              />
            </Box>
          </Box>
          <Img
            onClick={handleSubmit((d) => onSubmit(d))}
            position="absolute"
            zIndex={3}
            _hover={{ opacity: 1 }}
            top={-5}
            inset={0}
            transition="0.5s"
            opacity={0.7}
            cursor="pointer"
            m="auto"
            w="100px"
            alt={dataService?.service_image.name + " button by chinh.dev"}
            src={service_button}
          />
        </Box>
      </HStack>
      <GameAction
        {...{
          handleSubmit,
          onSubmit,
          register,
          isSubmitting: mutation.isLoading,
          service_price: dataService?.price ?? 0,
          watch,
          handleTry,
        }}
      />
    </>
  );
}
