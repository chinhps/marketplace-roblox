import FormBase from "@/components/global/Form/FormBase";
import { IFormInput, InputsBuyRobux } from "@/types/form.type";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";

export default function BuyRobux() {
  return (
    <>
      <Flex flexDirection="column" gap={8}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Mua Robux
          </Heading>
          <Text mb={2} fontSize="sm">
            Mua Robux 120h bằng Gamepass
          </Text>
          <Divider />
        </Box>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          gap={10}
        >
          <GridItem colSpan={1}>
            <Text as="b">
              Tiền hiện có:
              <Text as="b" color="ocean.100" pl={2}>
                {numberFormat(123123)}
              </Text>
            </Text>
            <Divider orientation="horizontal" my={2} />
            <FormBuyRobux />
          </GridItem>
          <GridItem colSpan={1}>
            <Heading as="h2" size="md" mb={3}>
              HƯỚNG DẪN MUA ROBUX
            </Heading>
            <Box
              rounded="20px"
              as="iframe"
              width="100%"
              height="250px"
              allow="fullscreen;"
              src={`https://www.youtube-nocookie.com/embed/123`}
            ></Box>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}

function FormBuyRobux() {
  const RATE_ROBLOX = 100;
  const dataForm: Array<IFormInput> = [
    {
      label: "Gói nạp",
      name: "type_withdraw",
      type: "SELECT",
      validate: { required: "Bạn cần chọn chọn gói nạp" },
      selects: [
        {
          label: "-- Chọn gói nạp --",
          value: "",
        },
        {
          label: `10k - ${RATE_ROBLOX * 1} Robux`,
          value: "1",
        },
        {
          label: `20k - ${RATE_ROBLOX * 2} Robux`,
          value: "2",
        },
        {
          label: `30k - ${RATE_ROBLOX * 3} Robux`,
          value: "3",
        },
        {
          label: `50k - ${RATE_ROBLOX * 5} Robux`,
          value: "4",
        },
        {
          label: `100k - ${RATE_ROBLOX * 10} Robux`,
          value: "5",
        },
        {
          label: `200k - ${RATE_ROBLOX * 20} Robux`,
          value: "6",
        },
        {
          label: `300k - ${RATE_ROBLOX * 30} Robux`,
          value: "7",
        },
        {
          label: `500k - ${RATE_ROBLOX * 50} Robux`,
          value: "8",
        },
      ],
    },
    {
      label: "Nhập link Gamepass",
      name: "linkpass",
      type: "INPUT",
      validate: { required: "Bạn cần nhập link" },
    },
  ];
  // Handle
  const onSubmit: SubmitHandler<InputsBuyRobux> = async (data) => {
    console.log(data);
  };

  return (
    <FormBase textBtn="Mua ngay" dataForm={dataForm} onSubmit={onSubmit} />
  );
}
