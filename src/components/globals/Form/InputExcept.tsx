import { Button, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import InputTag from "./InputTag";
import { useState } from "react";

export default function InputExcept({
  onChange,
}: {
  onChange: (value: (string | number)[]) => void;
}) {
  const [except, setExcept] = useState<"ON" | "OFF">("ON");
  return (
    <>
      <FormControl isRequired mb="1rem">
        <HStack>
          <FormLabel>
            {except === "ON"
              ? "Hiển thị tất cả nhưng các tên miền sau không được hiển thị"
              : "Chỉ các tên miền sau được hiển thị"}
          </FormLabel>
          <Button
            variant="outline"
            size="sm"
            colorScheme="blue"
            mb={3}
            onClick={() => setExcept((prev) => (prev === "OFF" ? "ON" : "OFF"))}
          >
            Chuyển chế độ
          </Button>
        </HStack>
        <InputTag onChange={onChange} />
      </FormControl>
    </>
  );
}
