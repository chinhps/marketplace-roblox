import { withdrawApi } from "@/apis/withdraw";
import FormBase from "@/components/global/Form/FormBase";
import { useUserData } from "@/hooks/UserDataProvider";
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
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

export default function BuyRobuxPage() {
  const userData = useUserData();

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
                {numberFormat(userData?.data.data.price ?? 0)}
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
              src={`https://www.youtube-nocookie.com/embed/_cxEO6yIcJU`}
            ></Box>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}

const RATE_ROBLOX = 100;

const dataForm: Array<IFormInput> = [
  {
    label: "Gói nạp",
    name: "type_withdraw",
    type: "SELECT",
    isRequired: true,
    selects: [
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
    isRequired: true,
  },
];

function FormBuyRobux() {
  const toast = useToast();
  const withdrawMutate = useMutation({
    mutationFn: ({ type_withdraw, linkpass }: InputsBuyRobux) =>
      withdrawApi.buyRobux({
        type_withdraw,
        linkpass,
      }),

    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });
  // Handle
  const onSubmit: SubmitHandler<InputsBuyRobux> = async (data) => {
    withdrawMutate.mutate({
      type_withdraw: data.type_withdraw,
      linkpass: data.linkpass,
    });
  };

  return (
    <FormBase
      textBtn="Mua ngay"
      dataForm={dataForm}
      isLoading={withdrawMutate.isLoading}
      onSubmit={onSubmit}
    />
  );
}
