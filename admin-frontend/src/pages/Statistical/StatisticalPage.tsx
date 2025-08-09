import shopApi from "@/apis/shop";
import { statisticalApi } from "@/apis/statistical";
import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { CustomStyleFilter } from "@/components/layouts/DefaultLayout";
import { IFormInput, IFormSearchProps } from "@/types/form.type";
import { numberFormat } from "@/utils/function";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

const rateShare = 0.33;
const percelDiamonds = new Map();
percelDiamonds.set(88, 20000);
percelDiamonds.set(220, 50000);
percelDiamonds.set(440, 100000);
percelDiamonds.set(880, 200000);
percelDiamonds.set(2200, 500000);

percelDiamonds.set(113, 20000);
percelDiamonds.set(283, 50000);
percelDiamonds.set(566, 100000);
percelDiamonds.set(1132, 200000);
percelDiamonds.set(2830, 500000);

export default function StatisticalPage() {
  const [_, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<any>({});
  const [shop, setShop] = useState<string>("");

  const shopAllQuery = useQuery({
    queryKey: ["shop-all"],
    queryFn: () => shopApi.all(),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });

  const statisticalByShopQuery = useQuery({
    queryKey: ["statistical-detail", shop, filter],
    queryFn: () => statisticalApi.byDomain(shop, filter),
    retry: false,
    enabled: shop !== "",
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(filter.jsonPriceAccount ?? "[]")["7kzPWvPduyTMhrW"]);

  return (
    <>
      <CardCollection title="Thống kê doanh thu" fontSize="25px">
        <Text>Thống kê doanh thu</Text>
        <Text color="red">Các trường hợp "Không xác định" là các trường hợp không được tính vào tổng</Text>
        <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />

        <Flex mt="1rem" gap="1rem">
          <VStack gap=".5rem">
            {shopAllQuery.data?.data.data.map((vl) => (
              <Button
                key={vl.id}
                w="100%"
                onClick={() => vl.domain && setShop(vl.domain)}
                colorScheme={vl.domain === shop ? "purple" : "gray"}
              >
                {vl.domain}
              </Button>
            ))}
          </VStack>
          <Box>
            <Heading textTransform="uppercase" mb="1rem" size="md">
              {shop}
            </Heading>
            <Heading size="md">Tài khoản</Heading>
            {statisticalByShopQuery.data?.data.accounts.map((account) => (
              <Text key={account.id}>
                {account.note}
                <Text as="sup" mx=".5rem">
                  {numberFormat(account.price)}
                </Text>
                :
                <Text as="b" mx={5}>
                  {numberFormat(
                    account.game_list.game_key == "ACCOUNT"
                      ? account.accounts_sum_price * rateShare
                      : account.accounts_count *
                      JSON.parse(filter.jsonPriceAccount ?? "[]")[
                      account.service_key
                      ]
                  )}
                </Text>
                (Số lượng: {account.accounts_count}) | Key:{" "}
                {account.service_key}
              </Text>
            ))}
            <Text size="md" color="purple" fontWeight="bold">
              Tổng:{" "}
              {numberFormat(
                statisticalByShopQuery.data?.data.accounts.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    (currentValue.game_list.game_key == "ACCOUNT"
                      ? currentValue.accounts_sum_price * rateShare
                      : currentValue.accounts_count *
                      JSON.parse(filter.jsonPriceAccount ?? "[]")[
                      currentValue.service_key
                      ]),
                  0
                ) ?? 0
              )}
            </Text>

            <Divider my="1rem" />
            <Heading size="md">Rút/Mua Robux</Heading>
            {statisticalByShopQuery.data?.data.withdraws.robux.map(
              (withdraw, index) => (
                <Text key={index}>
                  {withdraw.withdraw_type}:{" "}
                  {numberFormat(withdraw.total, false)} Robux |{" "}
                  <Text as="b" mx={5}>
                    {numberFormat(withdraw.total * filter.rateRobux)}
                  </Text>
                </Text>
              )
            )}
            <Text size="md" color="purple" fontWeight="bold">
              Tổng:{" "}
              {numberFormat(
                statisticalByShopQuery.data?.data.withdraws.robux.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.total * filter.rateRobux,
                  0
                ) ?? 0
              )}
            </Text>
            <Divider my="1rem" />
            <Heading size="md">Mua Gamepass</Heading>
            {statisticalByShopQuery.data?.data.withdraws.gamepass.map(
              (withdraw, index) => (
                <Text key={index}>
                  {withdraw.withdraw_type}:{" "}
                  {withdraw.cost_type == 1 ? <>
                    {numberFormat(withdraw.total, false)} Robux |
                    <Text as="b" mx={5}>
                      {numberFormat(withdraw.total * filter.rateRobux)}
                    </Text>
                  </> : withdraw.cost_type == 2 ? numberFormat(withdraw.total)
                    : numberFormat(withdraw.total, false) + " (Không xác định)"}
                </Text>
              )
            )}
            <Text size="md" color="purple" fontWeight="bold">
              Tổng:{" "}
              {numberFormat(
                statisticalByShopQuery.data?.data.withdraws.gamepass.reduce(
                  (accumulator, currentValue) =>
                    accumulator + (currentValue.cost_type == 1 ? currentValue.total * filter.rateRobux : currentValue.cost_type == 2 ? currentValue.total : 0),
                  0
                ) ?? 0
              )}
            </Text>
            <Divider my="1rem" />
            <Heading size="md">UNIT & GEMS</Heading>
            {statisticalByShopQuery.data?.data.withdraws.units.map(
              (withdraw, index) => (
                <Text key={index}>
                  {withdraw.withdraw_type}:{" "}
                  {withdraw.cost_type == 1 ? <>
                    {numberFormat(withdraw.total, false)} Robux |
                    <Text as="b" mx={5}>
                      {numberFormat(withdraw.total * filter.rateRobux)}
                    </Text>
                  </> : withdraw.cost_type == 2 ? numberFormat(withdraw.total)
                    : numberFormat(withdraw.total, false) + " (Không xác định)"}
                </Text>
              )
            )}
            <Text size="md" color="purple" fontWeight="bold">
              Tổng:{" "}
              {numberFormat(
                statisticalByShopQuery.data?.data.withdraws.units.reduce(
                  (accumulator, currentValue) =>
                    accumulator + (currentValue.cost_type == 1 ? currentValue.total * filter.rateRobux : currentValue.cost_type == 2 ? currentValue.total : 0),
                  0
                ) ?? 0
              )}
            </Text>
            <Divider my="1rem" />
            <Heading size="md">Rút kim cương</Heading>
            {statisticalByShopQuery.data?.data.withdraws.diamond.map(
              (withdraw, index) => (
                <Text key={index}>
                  Gói {withdraw.parcel}: {withdraw.total} | Tổng:{" "}
                  <Text as="b" mx={5}>
                    {numberFormat(
                      ((percelDiamonds.get(withdraw.parcel) *
                        filter.rateDiamond) /
                        100) *
                      withdraw.total
                    )}
                  </Text>
                  ({numberFormat((percelDiamonds.get(withdraw.parcel) * filter.rateDiamond) / 100)})
                </Text>
              )
            )}
            <Text size="md" color="purple" fontWeight="bold">
              Tổng:{" "}
              {numberFormat(
                statisticalByShopQuery.data?.data.withdraws.diamond.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    ((percelDiamonds.get(currentValue.parcel) *
                      filter.rateDiamond) /
                      100) *
                    currentValue.total,
                  0
                ) ?? 0
              )}
            </Text>
            <Divider my="1rem" />
            <Heading size="md" color="purple">
              Tổng kết:{" "}
              {numberFormat(
                (statisticalByShopQuery.data?.data.accounts.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    (currentValue.game_list.game_key == "ACCOUNT"
                      ? currentValue.accounts_sum_price * rateShare
                      : currentValue.accounts_count *
                      JSON.parse(filter.jsonPriceAccount ?? "[]")[
                      currentValue.service_key
                      ]),
                  0
                ) ?? 0) +
                (statisticalByShopQuery.data?.data.withdraws.robux.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.total * filter.rateRobux,
                  0
                ) ?? 0) +
                (statisticalByShopQuery.data?.data.withdraws.diamond.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    ((percelDiamonds.get(currentValue.parcel) *
                      filter.rateDiamond) /
                      100) *
                    currentValue.total,
                  0
                ) ?? 0) +
                (statisticalByShopQuery.data?.data.withdraws.gamepass.reduce(
                  (accumulator, currentValue) =>
                    accumulator + (currentValue.cost_type == 1 ? currentValue.total * filter.rateRobux : currentValue.cost_type == 2 ? currentValue.total : 0),
                  0
                ) ?? 0) +
                (statisticalByShopQuery.data?.data.withdraws.units.reduce(
                  (accumulator, currentValue) =>
                    accumulator + (currentValue.cost_type == 1 ? currentValue.total * filter.rateRobux : currentValue.cost_type == 2 ? currentValue.total : 0),
                  0
                ) ?? 0)
              )}
            </Heading>
          </Box>
        </Flex>
      </CardCollection>
    </>
  );
}

function FormSearch({ setFilter, filter, setPage }: IFormSearchProps) {
  const dataForm: Array<IFormInput> = [
    {
      label: "Ngày bắt đầu",
      name: "start_date",
      type: "DATE",
      isRequired: true,
    },
    {
      label: "Ngày kết thúc",
      name: "end_date",
      type: "DATE",
      isRequired: true,
    },
    {
      label: "Json Giá tài khoản",
      name: "jsonPriceAccount",
      type: "INPUT",
      isRequired: true,
    },
    {
      label: "Giá 1 Robux",
      name: "rateRobux",
      type: "INPUT",
      isRequired: true,
    },
    {
      label: "Rate kim cương",
      name: "rateDiamond",
      type: "INPUT",
      isRequired: true,
    },
  ];

  // Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setPage(1);
    setFilter(data);
  };

  return (
    <>
      <FormBase
        dataForm={dataForm}
        onSubmit={onSubmit}
        textBtn="Tìm kiếm"
        CustomComponent={CustomStyleFilter}
        hiddenLable={true}
        icon={<FiSearch />}
        dataDefault={filter}
      />
    </>
  );
}
