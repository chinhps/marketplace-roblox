import { withdrawApi } from "@/apis/withdraw";
import FormBase from "@/components/global/Form/FormBase";
import { useUserData } from "@/hooks/UserDataProvider";
import { IFormInput, InputsWithdrawDiamond } from "@/types/form.type";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

export default function WithdrawDiamondPage() {
  const userData = useUserData();
  return (
    <>
      <Flex flexDirection="column" gap={8}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Rút Kim Cương
          </Heading>
          <Text mb={2} fontSize="sm">
            Rút kim cương trực tiếp về tài khoản
          </Text>
          <Divider />
        </Box>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          gap={10}
        >
          <GridItem colSpan={1}>
            <Text as="b">
              Kim cương hiện có:
              <Text as="b" color="ocean.100" pl={2}>
                {numberFormat(userData?.data.data.diamond ?? 0, false)}
              </Text>
            </Text>
            <Divider orientation="horizontal" my={2} />
            <FormWithdrawDiamond />
          </GridItem>
          <GridItem colSpan={1}>
            <Heading as="h2" size="md" mb={3}>
              Thông báo
            </Heading>
            <OrderedList>
              <ListItem>Vui Lòng Nhập Đúng ID.</ListItem>
              <ListItem>
                Sau khi đã tạo đơn rút thành công, Vui lòng chờ từ 5-15p để hệ
                thống duyệt kim cương vào acc. Xin cảm ơn !
              </ListItem>
              <ListItem>
                Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua
              </ListItem>
            </OrderedList>
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
        label: "Gói rút 113 Kim Cương",
        value: "1",
      },
      {
        label: "Gói rút 283 Kim Cương (50% nhận được thêm 283 Kim Cương)",
        value: "2",
      },
      {
        label: "Gói rút 566 Kim Cương (50% nhận được thêm 566 Kim Cương)",
        value: "3",
      },
      {
        label: "Gói rút 1132 Kim Cương (50% nhận được thêm 1132 Kim Cương)",
        value: "4",
      },
      {
        label: "Gói rút 2830 Kim Cương (50% nhận được thêm 2830 Kim Cương)",
        value: "5",
      },
    ],
  },
  {
    label: "ID game của bạn",
    name: "id_game",
    type: "INPUT",
    isRequired: true,
  },
];

function FormWithdrawDiamond() {
  const toast = useToast();
  const withdrawMutate = useMutation({
    mutationFn: ({ type_withdraw, id_game }: InputsWithdrawDiamond) =>
      withdrawApi.diamond({
        type_withdraw,
        id_game,
      }),

    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });

  // Handle
  const onSubmit: SubmitHandler<InputsWithdrawDiamond> = (data) => {
    withdrawMutate.mutate({
      type_withdraw: data.type_withdraw,
      id_game: data.id_game,
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
