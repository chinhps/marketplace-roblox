import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import {
  Badge,
  Button,
  Image,
  SimpleGrid,
  Tag,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ServiceDetailList() {
  return (
    <>
      <CardCollection
        title="Thông tin của dịch vụ #23"
        fontSize="25px"
        button={
          <Link to="../">
            <Button leftIcon={<FiChevronLeft />}>Trở lại</Button>
          </Link>
        }
      >
        <Text>
          Bạn có thể xóa dịch vụ, nhưng không thể xóa được nếu tỷ lệ hoặc hình
          ảnh đang sử dụng ở dịch vụ khác.
        </Text>
        <TableCustom
          thead={[
            "ID",
            "Hình ảnh",
            "Thông tin",
            "Tỷ lệ",
            "Hiển thị",
            "Hành động",
          ]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>1</Td>
              <Td>
                <Image
                  w="100px"
                  h="50px"
                  objectFit="cover"
                  src="https://i.imgur.com/Owoq65A.png"
                  alt="alsd"
                />
              </Td>
              <Td>
                <Text>Ưu tiên: 3</Text>
                <Text>Tên nhóm: Mr. Jamel Abbott IV</Text>
                <Text w="200px" className="break-word">
                  Tên: Dolores quia nesciunt dolores quia rem.
                </Text>
                <Text>
                  <Badge colorScheme="green">
                    Slug: id-quia-ipsum-iusto-enim
                  </Badge>
                </Text>
              </Td>
              <Td>
                <Text w="200px" className="break-word">
                  Admin: [abc,dasd,asdas,asdas,asd,asdasdsdf]
                </Text>
                <Text className="break-word">
                  User: [abc,dasd,asdas,asdas,asd,asdasdsdf]
                </Text>
              </Td>
              <Td>
                <Badge colorScheme="orange">Tất cả ngoại trừ</Badge>
                <SimpleGrid columns={3} gap={1} mt={1}>
                  <Tag>abc.com</Tag>
                  <Tag>abc.com</Tag>
                  <Tag>abc.com</Tag>
                  <Tag>abc.com</Tag>
                </SimpleGrid>
              </Td>
              <Td>
                <ActionList />
              </Td>
            </Tr>
          ))}
        </TableCustom>
      </CardCollection>
    </>
  );
}
