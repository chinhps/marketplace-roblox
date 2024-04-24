import { customToast, initialServiceUnitFormState } from "@/utils/const";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Img,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import ModelBase from "../Model/ModelBase";
import FormBase from "../Form/FormBase";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link as ReactLink, useParams } from "react-router-dom";
import { gamePassApi } from "@/apis/games/gamePassApi";

export default function ServiceUnit({
  id,
  thumb,
  unitName,
  price,
  gamepass_type,
}: {
  id: number;
  thumb: string;
  unitName: string;
  price: number;
  gamepass_type: string;
}) {
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const toast = useToast(customToast);
  const { slug } = useParams();

  const gamePassMutate = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: object }) =>
      gamePassApi.buyGamePass({ slug, data }),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
        status: "success",
      });
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    slug &&
      gamePassMutate.mutate({
        slug: slug,
        data: { ...data, gamepass_type: gamepass_type, id_parcel: Number(id) },
      });
  };
  return (
    <>
      <ModelBase
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        size="lg"
        TextData={
          <>
            <FormControl mb={3}>
              <FormLabel>GÓI VẬT PHẨM</FormLabel>
              <Box
                w="100%"
                backgroundImage="/bg-1.jpeg"
                backgroundSize="cover"
                color="black.100"
                rounded="md"
                py={2}
                px={4}
              >
                <Text fontSize="15px">{numberFormat(price)}</Text>
                <Heading as="h2" fontSize="20px" textTransform="uppercase">
                  {unitName}
                </Heading>
              </Box>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>CẦN THANH TOÁN:</FormLabel>
              <Text fontSize="20px" fontWeight="bold" color="red.400">
                {numberFormat(price)}
              </Text>
            </FormControl>

            <FormBase
              dataForm={initialServiceUnitFormState}
              onSubmit={onSubmit}
              textBtn="Mua ngay"
              isLoading={gamePassMutate.isLoading}
            />
            <Box mt={2}>
              <Text as="i">
                Xem lại lịch sử mua{" "}
                <Link
                  as={ReactLink}
                  href="/profile/history/withdraw"
                  color="red.400"
                >
                  tại đây
                </Link>
              </Text>
            </Box>
          </>
        }
        children={null}
      />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        as="section"
        bg="main.item"
        color="white.100"
        height={{ base: "200px", lg: "250px" }}
        rounded="md"
        overflow="hidden"
        boxShadow="base"
        onClick={onOpenConfirm}
      >
        <Box position="relative" height="60%" overflow="hidden">
          <Img
            src={thumb}
            alt={unitName}
            w="100%"
            h="100%"
            // objectFit="cover"
          />
        </Box>
        <Flex
          height="40%"
          flexDirection="column"
          px={{ base: "1rem", lg: "2rem" }}
          py="1rem"
          gap={2}
          justifyContent="space-between"
        >
          <Heading
            as="h1"
            fontSize={{ base: "13px", md: "15px" }}
            textAlign="center"
            className="showText"
            noOfLines={2}
            textTransform="uppercase"
          >
            {unitName}
          </Heading>
          <Box as="section" textAlign="center">
            <Text fontWeight="bold" fontSize="18px" color="red.400">
              {numberFormat(price)}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
