import { Cards, InputsRecharge } from "@/types/recharge.type";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Recharge() {
  const data_recharge: Cards = {
    percent: 100,
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
    formState: { errors, isSubmitting },
  } = useForm<InputsRecharge>();

  const [cardType, setCardType] = useState<string | null>(null);

  // Handle
  const onSubmit: SubmitHandler<InputsRecharge> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <FormControl isInvalid={errors.card_type ? true : false} mb={1}>
          <Text mb={2} fontSize="sm">
            Nhà mạng <Text as="b"> (Ưu tiên Viettel, Vinaphone)</Text>
          </Text>
          <HStack spacing={3}>
            {Object.keys(data_recharge.list_card_support).map((key) => (
              <Box
                p={3}
                key={key}
                flex={1}
                cursor="pointer"
                border="1px"
                bg="white.100"
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
            <option value="10000">10,000đ - {data_recharge?.percent}%</option>
            <option value="20000">20,000đ - {data_recharge?.percent}%</option>
            <option value="30000">30,000đ - {data_recharge?.percent}%</option>
            <option value="50000">50,000đ - {data_recharge?.percent}%</option>
            <option value="100000">100,000đ - {data_recharge?.percent}%</option>
            <option value="200000">200,000đ - {data_recharge?.percent}%</option>
            <option value="300000">300,000đ - {data_recharge?.percent}%</option>
            <option value="500000">500,000đ - {data_recharge?.percent}%</option>
            <option value="1000000">
              1,000,000đ - {data_recharge?.percent}%
            </option>
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
          isLoading={isSubmitting}
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
