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

export default function WithdrawRobux() {
  const userData = useUserData();
  return (
    <>
      <Flex flexDirection="column" gap={8}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Rút Robux
          </Heading>
          <Text mb={2} fontSize="sm">
            Rút Robux 120h bằng Gamepass
          </Text>
          <Divider />
        </Box>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          gap={10}
        >
          <GridItem colSpan={1}>
            <Text as="b">
              Robux hiện có:
              <Text as="b" color="ocean.100" pl={2}>
                {numberFormat(userData?.data.data.robux ?? 0, false)}
              </Text>
            </Text>
            <Divider orientation="horizontal" my={2} />
            <FormWithdrawRobux />
          </GridItem>
          <GridItem colSpan={1}>
            <Heading as="h2" size="md" mb={3}>
              HƯỚNG DẪN RÚT ROBUX
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

const dataForm: Array<IFormInput> = [
  {
    label: "Gói rút",
    name: "type_withdraw",
    type: "SELECT",
    isRequired: true,
    selects: [
      {
        label: "200 Robux",
        value: "1",
      },
      {
        label: "500 Robux",
        value: "2",
      },
      {
        label: "1,000 Robux",
        value: "3",
      },
      {
        label: "2,000 Robux",
        value: "4",
      },
      {
        label: "3,000 Robux",
        value: "5",
      },
      {
        label: "5,000 Robux",
        value: "6",
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

function FormWithdrawRobux() {
  const toast = useToast();
  const withdrawMutate = useMutation({
    mutationFn: ({ type_withdraw, linkpass }: InputsBuyRobux) =>
      withdrawApi.robux({
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
      textBtn="Rút ngay"
      dataForm={dataForm}
      isLoading={withdrawMutate.isLoading}
      onSubmit={onSubmit}
    />
  );
}
