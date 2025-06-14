import { Button, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import InputTag from "./InputTag";

export default function InputExcept({
  onChange,
  except,
  setExcept,
  data,
}: {
  onChange: (value: (string | number)[]) => void;
  except: boolean;
  setExcept: (status: (prev: boolean) => boolean) => void;
  data?: Array<string | number>;
}) {
  return (
    <>
      <FormControl isRequired mb="1rem">
        <HStack>
          <FormLabel>
            {except
              ? "Hiển thị tất cả nhưng các tên miền sau không được hiển thị"
              : "Chỉ các tên miền sau được hiển thị"}
          </FormLabel>
          <Button
            variant="outline"
            size="sm"
            colorScheme="blue"
            mb={3}
            onClick={() => setExcept((prev) => !prev)}
          >
            Chuyển chế độ
          </Button>
        </HStack>
        <InputTag parseInput={(s) => s.trim() || null} name="domain" onChange={onChange} values={data} />
      </FormControl>
    </>
  );
}
