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
import { ChangeEvent, useCallback, useEffect, useState, FC } from "react";

interface InputTagProps {
  limit?: number;
  onChange?: (value: Array<string | number>) => void;
  isDisable?: boolean;
  values?: Array<string | number>;
  name?: string;
}

const InputTag: FC<InputTagProps> = ({
  limit,
  onChange,
  isDisable,
  values,
  name,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValues, setInputValues] = useState<Array<string | number>>(
    values || []
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (inputValue) {
      setInputValues((prevValues) => [...prevValues, inputValue]);
      setInputValue("");
    }
  }, [inputValue]);

  const handleDeleteTag = useCallback((index: number) => {
    setInputValues((prevValues) => prevValues.filter((_, i) => i !== index));
  }, []);

  const shopAllQuery = useQuery({
    queryKey: ["shop-all"],
    queryFn: () => shopApi.all(),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    if (values && values.toString() != inputValues.toString()) {
      setInputValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (onChange) {
      onChange(inputValues);
    }
  }, [inputValues, onChange]);

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
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleDeleteTag(index)} />
          </Tag>
        ))}
        {inputValues.length < (limit ?? 100) && (
          <Input
            value={inputValue}
            border="none"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
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
