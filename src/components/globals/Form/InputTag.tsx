import { HStack, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function InputTag({
  limit,
  onChange,
  isDisable,
  values,
}: {
  limit?: number | undefined;
  onChange?: (value: Array<string | number>) => void;
  isDisable?: boolean;
  values?: Array<string | number>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState<Array<string | number>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "") {
      setInputValues((vl) => [...vl, value]);
      e.target.value = "";
    }
  };
  const handleDeleteTag = (index: number) => {
    const newArray = [
      ...inputValues.slice(0, index),
      ...inputValues.slice(index + 1),
    ];
    setInputValues(newArray);
    // setInputValues((vl) => vl.filter((elm) => elm !== value));
  };

  useEffect(() => {
    values && setInputValues(values);
  }, [values]);

  useEffect(() => {
    if (onChange) {
      onChange(inputValues);
    }
  }, [inputValues]);

  return (
    <>
      <HStack
        border="1px solid"
        px={3}
        py={1}
        borderRadius="5px"
        minH="48px"
        bg={isDisable ? "gray.200" : ""}
      >
        {inputValues.map((tag, index) => (
          <Tag
            key={index}
            size="md"
            borderRadius="full"
            variant="solid"
            colorScheme="purple"
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleDeleteTag(index)} />
          </Tag>
        ))}
        {inputValues.length < (limit ?? 100) && (
          <Input
            border="none"
            onChange={handleInputChange}
            _focus={{ boxShadow: "none" }}
            minW="150px"
            w={inputValue.length * 7 + "px"}
            onBlur={handleInputBlur}
            disabled={isDisable}
          />
        )}
      </HStack>
    </>
  );
}
