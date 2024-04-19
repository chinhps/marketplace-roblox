import rechargeApi from "@/apis/recharge";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import { InputsRecharge } from "@/types/form.type";
import { Cards } from "@/types/recharge.type";
import { numberFormat, ucwords } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Img,
  Text,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function RechargePage() {
  const dataInformation = useInformationShopData();

  const data_recharge: Cards = {
    percent: dataInformation?.data?.data?.percent_recharge ?? 100,
    list_card_support: {
      viettel: {
        name: "Viettel",
        image: "/cards/viettel.png",
      },
      vinaphone: {
        name: "Vinaphone",
        image: "/cards/vinaphone.png",
      },
      mobifone: {
        name: "Mobifone",
        image: "/cards/mobifone.png",
      },
    },
  };

  return (
    <>
      <Flex flexDirection="column" gap={5}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Nạp thẻ tự động
          </Heading>
          <Text mb={2} fontSize="sm">
            Tự động 24/24 - Nhập sai mệnh giá sẽ mất thẻ.
          </Text>
          <Divider />
        </Box>
        <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(5,1fr)" }}>
          <GridItem colSpan={2}>
            <RechargeForm data_recharge={data_recharge} />
          </GridItem>
        </Grid>
        <Box border="1px" borderColor="red" p={5} rounded="lg">
          <Text as="b" lineHeight={2} color="red">
            NẠP 100K CARD = {(100 * data_recharge.percent) / 100}K TIỀN TRÊN
            SHOP
          </Text>
          <Text lineHeight={2}>
            AE VUI LÒNG CHỌN ĐÚNG MỆNH GIÁ THẺ. CHỌN SAI SẼ MẤT THẺ NHÉ.{" "}
          </Text>
          <Text as="b" lineHeight={2} color="red">
            NẠP XONG ĐỢI 5S-1P THẺ SẼ ĐƯỢC DUYỆT VÀ TIỀN SẼ ĐƯỢC CỘNG VÀO TÀI
            KHOẢN CỦA AE
          </Text>
        </Box>
      </Flex>
    </>
  );
}

function RechargeForm({ data_recharge }: { data_recharge: Cards }) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<InputsRecharge>();
  const dataInformation = useInformationShopData();
  const toast = useToast();
  const [cardType, setCardType] = useState<string | null>(null);
  const rechargeMutate = useMutation({
    mutationFn: ({ card_type, amount, serial, code }: InputsRecharge) =>
      rechargeApi.recharge({
        card_type,
        amount,
        serial,
        code,
      }),

    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });
  // Handle
  const onSubmit: SubmitHandler<InputsRecharge> = (data) => {
    rechargeMutate.mutate({
      card_type: data.card_type,
      amount: data.amount,
      serial: data.serial,
      code: data.code,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <FormControl isInvalid={errors.card_type ? true : false} mb={1}>
          <Text mb={2} fontSize="sm">
            Nhà mạng
            <Text as="b">
              (Ưu tiên{" "}
              {ucwords(dataInformation?.plugin?.prioritize_recharge ?? "")})
            </Text>
          </Text>
          <HStack spacing={3}>
            {Object.keys(data_recharge.list_card_support).map((key) => (
              <Box
                p={3}
                key={key}
                flex={1}
                cursor="pointer"
                border="1px"
                bg="black.100"
                borderColor={cardType !== key ? "gray.400" : "red"}
                filter={cardType !== key ? "grayscale(100%)" : "none"}
                rounded="md"
                {...register("card_type", {
                  required: "Bạn cần chọn loại thẻ",
                })}
                onClick={() => {
                  setCardType(key);
                  setValue("card_type", key);
                }}
              >
                <Img
                  src={data_recharge.list_card_support[key].image}
                  w="100%"
                  alt={data_recharge.list_card_support[key].name}
                />
              </Box>
            ))}
          </HStack>
          <FormErrorMessage m={1}>
            {errors.card_type && errors.card_type.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.amount ? true : false} mb={1}>
          <Select
            {...register("amount", { required: "Bạn cần chọn mệnh giá" })}
            variant="main"
            fontSize="sm"
            fontWeight="500"
            size="lg"
          >
            <option value="">-- Chọn đúng mệnh giá. Sai mất thẻ nhé --</option>
            {[
              10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000,
              1000000,
            ].map((price) => (
              <option value={price}>
                {numberFormat(price)} -{" "}
                {dataInformation?.plugin?.recharge_text[`text${price / 1000}`] ?? ""}
              </option>
            ))}
          </Select>
          <FormErrorMessage m={1}>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.serial ? true : false} mb={1}>
          <Input
            variant="auth"
            fontSize="sm"
            type="number"
            {...register("serial", { required: "Bạn cần nhập Seri thẻ" })}
            placeholder="Seri được in trên thẻ"
            fontWeight="500"
            size="lg"
          />
          <FormErrorMessage m={1}>
            {errors.serial && errors.serial.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.code ? true : false} mb={1}>
          <Input
            variant="auth"
            fontSize="sm"
            type="number"
            {...register("code", { required: "Bạn cần nhập mã thẻ" })}
            placeholder="Mã số thẻ"
            fontWeight="500"
            size="lg"
          />
          <FormErrorMessage m={1}>
            {errors.code && errors.code.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          isLoading={rechargeMutate.isLoading}
          fontSize="md"
          type="submit"
          variant="blue"
          fontWeight="bold"
          w="100%"
          h="50"
        >
          <Text className="showText">Nạp thẻ ngay</Text>
        </Button>
      </form>
    </>
  );
}
