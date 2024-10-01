import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  TableCaption,
} from "@chakra-ui/react";

export default function TableCustom({
  children,
  thead,
  caption,
}: {
  children: React.ReactNode;
  thead: Array<string>;
  caption?: string;
}) {
  return (
    <>
      <TableContainer mt="0.5rem">
        <Table variant="unstyled">
          <TableCaption>{caption}</TableCaption>
          <Thead bg="main.item" color="main.text">
            <Tr>
              {thead.map((vl, index) => (
                <Th key={index}>{vl}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontWeight="500">{children}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
