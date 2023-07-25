import { IPaginate } from "@/types/response/service.type";
import { Box, Icon, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";

export default function Paginate({
  paginate,
  action,
}: {
  paginate: IPaginate | undefined;
  action: (selected: number) => void;
}) {
  return <PaginatedItems paginate={paginate} action={action} />;
}

function PaginatedItems({
  paginate,
  action,
}: {
  paginate: IPaginate | undefined;
  action: (selected: number) => void;
}) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    action(selected + 1);
  };
  return (
    <>
      <Box ml="1rem" mt="3rem" color="white.100">
        <ReactPaginate
          className="navigate"
          breakLabel={<Text>...</Text>}
          nextLabel={<Icon as={FiChevronRight} />}
          pageClassName="page-paginate"
          previousLinkClassName="hd"
          nextLinkClassName="hd"
          activeClassName="active"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={paginate?.last_page ?? 0}
          previousLabel={<Icon as={FiChevronLeft} />}
          renderOnZeroPageCount={null}
        />
      </Box>
    </>
  );
}
