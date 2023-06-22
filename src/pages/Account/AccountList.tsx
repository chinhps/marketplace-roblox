import FormBase from "@/components/global/Form/FormBase";
import Account from "@/components/global/Service/Account";
import { IFormInput } from "@/types/form.type";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";

export default function AccountList() {
  const styleTextShadow = {
    color: "white",
    textShadow: "0 0 30px black", // Điều chỉnh giá trị để tạo hiệu ứng bóng chữ
  };

  return (
    <>
      <Box as="header" mt="1rem" px={{ base: 2, lg: 0 }}>
        <Text size="sm" sx={styleTextShadow}>
          Danh mục
        </Text>
        <Heading as="h1" fontSize="35px" mb={5} sx={styleTextShadow}>
          THỬ VẬN MAY BLOX FRUITS 19K
        </Heading>
        <Box mb="1rem">
          <Text fontSize="17px" sx={styleTextShadow}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            tempore neque soluta ullam cumque totam quisquam expedita error
            dignissimos nemo sint inventore molestiae numquam sapiente,
            excepturi minima consequuntur aperiam laudantium!
          </Text>
        </Box>
        <FormSearch />
      </Box>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        gap={5}
        px={{ base: 2, lg: 0 }}
        mt={{ base: "2rem", lg: 0 }}
      >
        {new Array(15).fill(0).map((_, index) => (
          <Account key={index} />
        ))}
      </SimpleGrid>
    </>
  );
}

type InputsFormSearch = {
  id: number;
  price: string;
  sort: string;
};

function FormSearch() {
  const dataForm: Array<IFormInput> = [
    {
      label: "Tìm kiếm bằng ID",
      name: "id",
      type: "INPUT",
    },
    {
      label: "Chọn giá tiền",
      name: "price",
      type: "SELECT",
      selects: [
        {
          label: "Khoảng giá tiền",
          value: "",
        },
        {
          label: `10k - Robux`,
          value: "1",
        },
      ],
    },
    {
      label: "Sắp sếp theo",
      name: "sort",
      type: "SELECT",
      selects: [
        {
          label: "Sắp sếp theo",
          value: "",
        },
        {
          label: `10k - Robux`,
          value: "1",
        },
      ],
    },
  ];

  // Handle
  const onSubmit: SubmitHandler<InputsFormSearch> = async (data) => {
    console.log(data);
  };

  return (
    <FormBase
      dataForm={dataForm}
      onSubmit={onSubmit}
      textBtn="Tìm kiếm"
      CustomComponent={CustomStyle}
      hiddenLable={true}
    />
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        px={{ base: 2, lg: 0 }}
        gap={{ base: 0, lg: 5 }}
        alignContent="center"
      >
        {children}
      </Flex>
    </>
  );
}
