import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export default function useDisclosureData<T>(defaultValue: T | null ) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<T | null>(defaultValue);

  const onOpenData = (newData: T) => {
    onOpen();
    setData(newData);
  };

  const onCloseData = () => {
    setData(null);
    onClose();
  };

  return { isOpen, onOpenData, onCloseData, data };
}