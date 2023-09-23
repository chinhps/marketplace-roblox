import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { Badge, Td, Text, Tr } from "@chakra-ui/react";
import moment from "moment";
import { FiCornerDownLeft, FiCornerUpRight } from "react-icons/fi";

export default function PluginListPage() {
  return (
    <>
      <CardCollection title="Danh sách các Plugins" fontSize="25px">
        <Text>
          Lịch sử mua tài khoản. Chỉ có Admin và Support mới có thể thay đổi
          trạng thái! CTV không nhận được tiền nếu bị HOÀN TIỀN
        </Text>
        <Text>Thay đổi trạng thái không tự động hoàn tiền cho khách!</Text>

        {/* <TableListPlugin /> */}
      </CardCollection>
    </>
  );
}

// export function TableListPlugin({
//   query,
//   data,
// }: {
//   query: UseQueryResult;
//   data: PurchaseResponse[];
// }) {
//   return (
//     <>
//       <TableCustom
//         thead={[
//           "ID",
//           "Tài khoản",
//           "Thông tin(Private)",
//           "Thời gian",
//           "Hoàn tiền",
//           "Thao tác",
//         ]}
//       >
//         {data.map((vl) => (
//           <Tr key={vl.id}>
//             <Td>#{vl.id}</Td>
//             <Td>
//               <Text>ACC: #{vl.account_id}</Text>
//               <Text>
//                 <Badge colorScheme="green">123</Badge>
//               </Text>
//             </Td>
//             <Td>
//               {vl.detail_public.map((detail, index) => (
//                 <Text key={index}>
//                   {detail.name}: {detail.value}
//                 </Text>
//               ))}
//             </Td>
//             <Td>{moment(vl.created_at).format("DD/MM/yyyy hh:mm")}</Td>
//             <Td>
//               {vl.refund === "YES" ? (
//                 <Badge colorScheme="red">Hoàn tiền</Badge>
//               ) : (
//                 <Badge colorScheme="green">Bình thường</Badge>
//               )}
//             </Td>
//             <Td>
//               <ActionList
//                 actions={["CUSTOM"]}
//                 icon={
//                   vl.refund === "YES" ? (
//                     <FiCornerDownLeft />
//                   ) : (
//                     <FiCornerUpRight />
//                   )
//                 }
//               />
//             </Td>
//           </Tr>
//         ))}
//       </TableCustom>
//     </>
//   );
// }
