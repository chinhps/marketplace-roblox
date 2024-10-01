import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

export default function TableCustom({
  children,
  thead,
}: {
  children: React.ReactNode;
  thead: Array<string>;
}) {
  return (
    <>
      <TableContainer mt="0.5rem">
        <Table variant="unstyled">
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
