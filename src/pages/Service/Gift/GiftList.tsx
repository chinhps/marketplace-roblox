import ActionList from "@/components/globals/ActionList";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Image, Td, Text, Tr } from "@chakra-ui/react";

export default function GiftList() {
  return (
    <>
      <TableCustom
        thead={[
          "ID",
          "Hình ảnh",
          "Loại quà",
          "COST",
          "Giá trị",
          "VIP",
          "Tỷ lệ (%)",
          "Thao tác",
        ]}
      >
        {new Array(7).fill(0).map((vl, index) => (
          <Tr key={index}>
            <Td>#{index + 1}</Td>
            <Td>
              <Image w="60px" src="https://i.imgur.com/cGgbtv7.png" alt="" />
            </Td>
            <Td>
              <Badge colorScheme="green">FIXED</Badge>
            </Td>
            <Td>23</Td>
            <Td>
              <Badge colorScheme="purple">20 Kim cương</Badge>
            </Td>
            <Td>
              <Badge colorScheme="green">Có</Badge>
            </Td>
            <Td>30%</Td>
            <Td>
              <ActionList />
            </Td>
          </Tr>
        ))}
      </TableCustom>
    </>
  );
}
