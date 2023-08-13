import ActionList from "@/components/globals/ActionList";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Image, Td, Text, Tr } from "@chakra-ui/react";

export default function ServiceGroupList() {
  return (
    <>
      <TableCustom
        thead={["ID", "Ưu tiên", "Tên", "Kích hoạt", "Thao tác", "Hình ảnh"]}
      >
        {new Array(7).fill(0).map((vl, index) => (
          <Tr key={index}>
            <Td>#{index + 1}</Td>
            <Td>12</Td>
            <Td>Jacquelyn Wisoky</Td>
            <Td>
              <Image w="200px" src="https://i.imgur.com/RGyMGhs.png" alt="" />
            </Td>
            <Td>
              <Badge colorScheme="green">Kích hoạt</Badge>
            </Td>
            <Td>
              <ActionList />
            </Td>
          </Tr>
        ))}
      </TableCustom>
    </>
  );
}
