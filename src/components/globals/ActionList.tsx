import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiEdit, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ModelConfirm from "./Model/ModelConfirm";

export default function ActionList({
  linkUpdate,
  onClickExits,
  actions,
  isLoading,
}: {
  linkUpdate?: string;
  onClickExits?: () => void;
  actions?: Array<"EDIT" | "DELETE">;
  isLoading?: boolean;
}) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {onClickExits && (
        <ModelConfirm
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading ?? false}
          TextData={"Bạn có chắc muốn thực hiện không?"}
          handleConfirm={() => {
            onClickExits();
            onClose();
          }}
          children={null}
        />
      )}

      <HStack>
        {actions?.map((action) => {
          if (action === "EDIT") {
            return (
              <IconButton
                key={action}
                aria-label="Change"
                colorScheme="orange"
                variant="outline"
                onClick={() => navigate(linkUpdate ?? "")}
                icon={<FiEdit />}
              />
            );
          }
          if (action === "DELETE") {
            return (
              <IconButton
                key={action}
                aria-label="Delete"
                colorScheme="pink"
                variant="outline"
                onClick={onOpen}
                icon={<FiX />}
              />
            );
          }
        })}
      </HStack>
    </>
  );
}
