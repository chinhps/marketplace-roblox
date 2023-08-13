import { HStack, IconButton } from "@chakra-ui/react";
import { FiEdit, FiX } from "react-icons/fi";

export default function ActionList() {
  return (
    <HStack>
      <IconButton
        aria-label="Change"
        colorScheme="orange"
        variant="outline"
        icon={<FiEdit />}
      />
      <IconButton
        aria-label="Delete"
        colorScheme="pink"
        variant="outline"
        icon={<FiX />}
      />
    </HStack>
  );
}
