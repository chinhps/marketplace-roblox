import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

export default function CUShopPage() {
  const { id } = useParams();
  const [isCreate, setIsCreate] = useState(true);
  useEffect(() => {
    if (id) {
      setIsCreate(false);
    }
  }, []);

  const onSubmit: SubmitHandler<any> = () => {};

  return (
    <>
      <CardCollection
        title={isCreate ? "Tạo mới shop" : `Chỉnh sửa shop #${id}`}
        fontSize="25px"
        button={
          <Link to="../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <Text>Thông báo cho quản trị viên trước khi thực hiện</Text>

        <FormBase
          dataForm={[
            {
              label: "Tên miền(Domain)",
              name: "domain",
              type: "INPUT",
              gridAreaName: "a",
            },
            {
              label: "Tiêu đề shop(Title)",
              name: "title",
              type: "INPUT",
              gridAreaName: "b",
            },
            {
              label: "Tiền dành cho người dùng mới",
              name: "priceForNewUser",
              type: "NUMBER",
              default: "0",
              gridAreaName: "c",
              min: 0,
              max: 50000,
            },
            {
              label: "Keyword SEO Google",
              name: "keyword",
              type: "TEXTAREA",
              gridAreaName: "d",
            },
            {
              label: "Logo(Chỉ 1 ảnh)",
              name: "logo",
              type: "FILE",
              gridAreaName: "item1",
            },
            {
              label: "Ảnh nền(Chỉ 1 ảnh)",
              name: "background",
              type: "FILE",
              gridAreaName: "item2",
            },
            {
              label: "Favicon(Chỉ 1 ảnh)",
              name: "favicon",
              type: "FILE",
              gridAreaName: "item3",
            },
          ]}
          CustomComponent={CustomStyle}
          textBtn={isCreate ? "Thêm mới" : "Cập nhật"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={2}
        templateRows="auto auto"
        mt="1rem"
        templateAreas={`
          "a a a"
          "b b b"
          "c c c"
          "d d d"
          "item1 item2 item3"
        `}
      >
        {children}
      </Grid>
    </>
  );
}
