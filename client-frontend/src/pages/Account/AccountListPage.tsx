import GameApi from "@/apis/games/gameApi";
import FormBase from "@/components/global/Form/FormBase";
import Account from "@/components/global/Service/Account";
import { IFormInput } from "@/types/form.type";
import { Box, Center, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "@/components/global/Skeleton/Skeleton";
import Paginate from "@/components/global/Paginate/Paginate";
import { styleTextShadow } from "@/utils/const";

const gameApi = new GameApi();

export default function AccountListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (slug) {
      gameApi.setSlug(slug);
    }
    setFilter(Object.fromEntries([...searchParams]));
  }, []);
  const serviceInfoQuery = useQuery({
    queryKey: ["service", slug],
    queryFn: () => gameApi.getDataAccount(),
    enabled: !!slug,
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const accountQuery = useQuery({
    queryKey: ["service-accounts", slug, filter, page],
    queryFn: () => gameApi.getAccountList(page, filter),
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
      <Box as="header" mt="1rem" px={{ base: 5, lg: 0 }}>
        <Text size="sm" color="white.100">
          Danh mục
        </Text>
        <Heading
          as="h1"
          textTransform="uppercase"
          fontSize="35px"
          mb={5}
          sx={styleTextShadow}
        >
          {serviceInfoQuery.isLoading ? (
            <Skeleton height="40px" width="40%" rounded="md" />
          ) : (
            serviceInfoQuery.data?.data.data.service_image.name
          )}
        </Heading>
        <Box mb="1rem">
          {serviceInfoQuery.isLoading ? (
            <Skeleton height="20px" width="30%" rounded="md" />
          ) : (
            <Box
              color="white.100"
              dangerouslySetInnerHTML={{
                __html:
                  serviceInfoQuery.data?.data.data.notification ??
                  "Chưa có thông báo",
              }}
            />
          )}
        </Box>
        {!serviceInfoQuery.isLoading &&
        serviceInfoQuery.data?.data.data.game_type === "ACCOUNT" ? (
          <FormSearch setFilter={setFilter} setPage={setPage} filter={filter} />
        ) : null}
      </Box>
      {accountQuery.data?.data.data.length === 0 && (
        <Center py={20} px={7}>
          <Text color="white.100" fontWeight="bold" textAlign="center">
            Sản phẩm đã được mua hết, vui lòng báo cho admin để được bổ sung.
            Xin cảm ơn!
          </Text>
        </Center>
      )}
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        gap={5}
        px={{ base: 2, lg: 0 }}
        mt={{ base: "2rem", lg: 0 }}
      >
        {accountQuery.isLoading
          ? new Array(10)
              .fill(0)
              .map((_, index) => <Account.loading key={index} />)
          : accountQuery.data?.data.data.map((account) => (
              <Account
                key={account.id}
                data={account}
                thumbService={
                  serviceInfoQuery.data?.data.data.service_image.image
                }
              />
            ))}
      </SimpleGrid>
      <Paginate paginate={accountQuery.data?.data.paginate} action={setPage} />
    </>
  );
}

type InputsFormSearch = {
  id: number;
  price: string;
  sort: string;
};

function FormSearch({
  setFilter,
  filter,
  setPage,
}: {
  setFilter: (data: InputsFormSearch) => void;
  filter: object;
  setPage: (page: number) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  // Function update query
  const updateQueryParameters = (newParams: object) => {
    const searchParams = new URLSearchParams(location.search);
    // Remove query null, undifined or ""
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        searchParams.delete(key);
        return;
      }
      searchParams.set(key, value);
    });
    // Update Url with new query
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const dataForm: Array<IFormInput> = [
    {
      label: "Tìm kiếm bằng MS",
      name: "id",
      type: "INPUT",
    },
    {
      label: "Chọn giá tiền",
      name: "price",
      type: "SELECT",
      selects: [
        {
          label: `Dưới 50K`,
          value: "1",
        },
        {
          label: `Từ 50K - 200K`,
          value: "2",
        },
        {
          label: `Từ 200K - 500K`,
          value: "3",
        },
        {
          label: `Từ 500K - 1 Triệu`,
          value: "4",
        },
        {
          label: `Trên 1 Triệu`,
          value: "5",
        },
        {
          label: `Trên 5 Triệu`,
          value: "6",
        },
        {
          label: `Trên 10 Triệu`,
          value: "7",
        },
      ],
    },
    {
      label: "Sắp xếp theo giá",
      name: "sort",
      type: "SELECT",
      selects: [
        {
          label: `Thấp đến cao`,
          value: "1",
        },
        {
          label: `Cao đến thấp`,
          value: "2",
        },
      ],
    },
  ];
  // Handle
  const onSubmit: SubmitHandler<InputsFormSearch> = async (data) => {
    setPage(1);
    setFilter(data);
    updateQueryParameters(data);
  };

  return (
    <FormBase
      dataForm={dataForm}
      onSubmit={onSubmit}
      textBtn="Tìm kiếm"
      CustomComponent={CustomStyle}
      hiddenLable={true}
      dataDefault={filter}
    />
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: 0, lg: 5 }}
        alignContent="center"
      >
        {children}
      </Flex>
    </>
  );
}
