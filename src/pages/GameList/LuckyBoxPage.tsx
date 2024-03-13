import { Box, HStack, Img, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GameAction, HeadingService } from "./GameListGlobal";
import GameApi from "@/apis/games/gameApi";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IServiceDetailResponse } from "@/types/response/service.type";
import { TIMEOUT_SLEEP } from "@/utils/const";
import ModelService from "@/components/global/Model/ModelService";
import { ServiceHandlePostProps } from "@/types/service.type";

const gameApi = new GameApi();

export default function LuckyBoxPage() {
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
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <HeadingService
        price={serviceInfoQuery.data?.data.data.price ?? 0}
        linkHistory="/profile/history/service"
        notification={<Box dangerouslySetInnerHTML={{ __html: serviceInfoQuery.data?.data.data.notification ?? "" }} />}
      >
        {serviceInfoQuery.data?.data.data.service_image.name}
      </HeadingService>
      {/* GAMES */}
      <GamePlay dataService={serviceInfoQuery.data?.data.data} />
      {/* END GAME */}{" "}
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
  const wheelImg = useRef<HTMLImageElement>({} as HTMLImageElement);
  const mutation = useMutation({
    mutationFn: async ({ type, numrolllop }: ServiceHandlePostProps) => {
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
    onSuccess: () => {
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
  function GiftLuckyBox({ image }: { image: string }) {
    return (
      <>
        <Img
          onClick={handleSubmit((d) => onSubmit(d))}
          position="absolute"
          zIndex={3}
          _hover={{ opacity: 0.7 }}
          top={-5}
          inset={0}
          transition="0.5s"
          opacity={1}
          cursor="pointer"
          m="auto"
          // w="400px"
          alt={dataService?.service_image.name + " by chinh.dev"}
          src={image}
        />
      </>
    );
  }

  return (
    <>
      <ModelService
        data={mutation.data?.data}
        isOpen={isOpen}
        onClose={onClose}
      />
      <HStack justifyContent="center" mt={3}>
        <Box position="relative" zIndex={1}>
          <Img
            zIndex={2}
            ref={wheelImg}
            transition="2s"
            pointerEvents="none"
            w="lg"
            alt={dataService?.service_image.name + " by chinh.dev"}
            src={dataService?.service_image.images.image_1 ?? ""}
          />
          {mutation.isLoading ? (
            <GiftLuckyBox
              image={dataService?.service_image.images.image_3 ?? ""}
            />
          ) : mutation.isSuccess ? (
            <GiftLuckyBox
              image={mutation.data.data.data?.gifts[0].image ?? ""}
            />
          ) : (
            <GiftLuckyBox
              image={dataService?.service_image.images.image_2 ?? ""}
            />
          )}
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
