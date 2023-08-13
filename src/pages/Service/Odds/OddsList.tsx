import ActionList from "@/components/globals/ActionList";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Td, Text, Tr } from "@chakra-ui/react";

export default function OddsList() {
  return (
    <>
      <TableCustom
        thead={[
          "ID",
          "Tỷ lệ admin",
          "Tỷ lệ người dùng",
          "Lượt sử dụng",
          "Ngày tạo",
          "Thao tác",
        ]}
      >
        {new Array(7).fill(0).map((vl, index) => (
          <Tr key={index}>
            <Td>#{index + 1}</Td>
            <Td>
              <Text>
                DẠNG QUÀ: <Badge colorScheme="green">FIXED</Badge>
              </Text>
              <Text>[1,2,1,2,1,2,1,2,1,2]</Text>
            </Td>
            <Td>
              <Text>
                DẠNG QUÀ: <Badge colorScheme="green">RANDOM</Badge>
              </Text>
              <Text>[1,2,1,2,1,2,1,2,1,2]</Text>
            </Td>
            <Td>23</Td>
            <Td>2023-07-31 20:07:16</Td>
            <Td>
              <ActionList />
            </Td>
          </Tr>
        ))}
      </TableCustom>
    </>
  );
}
