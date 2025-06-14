import shopApi from "@/apis/shop";
import {
  HStack,
  Input,
  List,
  ListItem,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

interface InputTagProps<T = any> {
  limit?: number;
  onChange?: (value: Array<T>) => void;
  isDisable?: boolean;
  values?: Array<T>;
  name?: string;
  getDisplayValue?: (item: T) => string | React.ReactNode;
  parseInput?: (input: string) => T | null;
}

const InputTag = <T,>({
  limit,
  onChange,
  isDisable,
  values,
  name,
  getDisplayValue = (item) => item?.toString?.() || "",
  parseInput,
}: InputTagProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [localValues, setLocalValues] = useState<Array<T>>(values || []);
  const isControlled = values !== undefined;
  const inputValues = isControlled ? values! : localValues;

  const deleteTag = useCallback((index: number) => {
    const newTags = inputValues.filter((_, i) => i !== index);
    if (!isControlled) {
      setLocalValues(newTags);
    }
    onChange && onChange(newTags);
  }, [inputValues, isControlled, onChange]);

  const addTag = useCallback((tag: T) => {
    const newTags = [...inputValues, tag];
    if (!isControlled) {
      setLocalValues(newTags);
    }
    onChange && onChange(newTags);
    setInputValue("");
  }, [inputValues, isControlled, onChange]);

  const shopAllQuery = useQuery({
    queryKey: ["shop-all"],
    queryFn: () => shopApi.all(),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
    enabled: name === "domain"
  });

  return (
    <>
      <HStack
        border="1px solid"
        borderColor="gray.300"
        p={3}
        borderRadius="5px"
        minH="48px"
        flexWrap="wrap"
      >
        {inputValues.map((tag, index) => (
          <Tag
            key={index}
            size="md"
            borderRadius="full"
            variant="solid"
            colorScheme="purple"
            color="white"
          >
            <TagLabel>{getDisplayValue && getDisplayValue(tag)}</TagLabel>
            <TagCloseButton onClick={() => deleteTag(index)} />
          </Tag>
        ))}
        {parseInput && inputValues.length < (limit ?? 100) && (
          <Input
            value={inputValue}
            border="none"
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              const parsed = parseInput(inputValue);
              if (parsed !== null) {
                addTag(parsed);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const parsed = parseInput(inputValue);
                if (parsed !== null) {
                  addTag(parsed);
                }
              }
            }}
            disabled={isDisable}
            list={name}
            _focus={{ boxShadow: "none" }}
            minW="200px"
            h="auto"
            flex="1"
          />
        )}
        {name === "domain" ? (
          <List as="datalist" id={name}>
            {shopAllQuery.data?.data.data.map((vl, index) => (
              <ListItem key={index} as="option">
                {vl.domain}
              </ListItem>
            ))}
          </List>
        ) : null}
      </HStack>
    </>
  );
};

export default InputTag;
