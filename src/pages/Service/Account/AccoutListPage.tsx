import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import { Badge, Image, Td, Text, Tr } from "@chakra-ui/react";

const detail_public = [
  {
    key: "CHAMPS",
    name: "Tướng",
    value: 40,
  },
  {
    key: "SKINS",
    name: "Trang phục",
    value: 582,
  },
];
const detail_private = [
  {
    key: "USERNAME",
    name: "Tài khoản",
    value: "pwillms",
  },
  {
    key: "PASSWORD",
    name: "Mật khẩu",
    value: "t0,ya&",
  },
  {
    key: "FA2",
    name: "Mã 2FA",
    value: "Eos.",
  },
];

export default function AccoutListPage() {
  return (
    <>
      <CardCollection title="Quản lý tài khoản" fontSize="25px">
        <Text>Quản lý tài khoản</Text>
        <TableCustom
          thead={[
            "ID",
            "Tên dịch vụ",
            "Thông tin(Public)",
            "Thông tin(Private)",
            "Trạng thái",
            "Giá",
            "Thao tác",
          ]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>#{index + 1}</Td>
              <Td>
                <Text>#ID: 43</Text>
                <Text>ADMIN: Dexter Murazik</Text>
                <Text>Tên DV: Nicholas Dibbert DVM</Text>
              </Td>
              <Td>
                {detail_public.map((value, i) => (
                  <Text key={i}>
                    {value.name}:
                    <Badge colorScheme="purple" marginLeft="5px">
                      {value.value}
                    </Badge>
                  </Text>
                ))}
              </Td>
              <Td>
                {detail_private.map((value, i) => (
                  <Text key={i}>
                    {value.name}:
                    <Badge colorScheme="green" marginLeft="5px">
                      {value.value}
                    </Badge>
                  </Text>
                ))}
              </Td>
              <Td>
                <Text>
                  Kích hoạt:
                  <Badge colorScheme="red" marginLeft="5px">
                    YES
                  </Badge>
                </Text>
                <Text>
                  Trạng thái:
                  <Badge colorScheme="green" marginLeft="5px">
                    Đã bán
                  </Badge>
                </Text>
              </Td>
              <Td>{numberFormat(100000)}</Td>
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
