import { Input } from "@chakra-ui/react";

export interface IRechargeProps {}

// interface IRechargeLayout {
//   id: number;
//   placeholder?: string;
//   type: "NUMBER" | "SELECT";
//   children?: {
//     id: number;
//     value: string;
//     name: string;
//   }[];
// }

// const data: Array<IRechargeLayout> = [
//   {
//     id: 1,
//     type: "SELECT",
//     children: [
//       {
//         id: 1,
//         value: "viettel",
//         name: "Viettel",
//       },
//       {
//         id: 2,
//         value: "vinaphone",
//         name: "Vinaphone",
//       },
//       {
//         id: 3,
//         value: "mobifone",
//         name: "Mobifone",
//       },
//     ],
//   },
// ];

export default function Recharge() {
  return (
    <div>
      <Input />
    </div>
  );
}
