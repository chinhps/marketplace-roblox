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
import { useEffect, useState } from "react";

export default function InputTag({
  limit,
  onChange,
  isDisable,
  values,
  name,
}: {
  limit?: number | undefined;
  onChange?: (value: Array<string | number>) => void;
  isDisable?: boolean;
  values?: Array<string | number>;
  name?: string;
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

  const shopAllQuery = useQuery({
    queryKey: ["shop-all"],
    queryFn: () => shopApi.all(),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });

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
        p={3}
        borderRadius="5px"
        minH="48px"
        bg={isDisable ? "gray.200" : ""}
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
            border="none"
            onChange={handleInputChange}
            _focus={{ boxShadow: "none" }}
            minW="150px"
            h="auto"
            w={inputValue.length * 7 + "px"}
            onBlur={handleInputBlur}
            disabled={isDisable}
            list={name}
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
}
