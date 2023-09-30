import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function FileCustom({
  onChange,
  multiple,
}: {
  onChange?: (data: File[]) => void;
  multiple?: boolean;
}) {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      setFileList((old) => [...old, ...files]);
    }
  };

  useEffect(() => {
    onChange && onChange(fileList);
  }, [fileList]);

  return (
    <>
      <Flex flexWrap="wrap" gap="1rem">
        {fileList.map((file, index) => (
          <Center
            key={index}
            cursor="pointer"
            flexDirection="column"
            border="2px dashed "
            borderColor="red.200"
            p="1rem"
            rounded="7px"
            width="200px"
            height="200px"
          >
            <Box
              display="inline-block"
              position="relative"
              overflow="hidden"
              borderRadius="md"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
              w="100%"
              height="100%"
            >
              <Image
                w="100%"
                height="100%"
                objectFit="cover"
                src={URL.createObjectURL(file)}
                alt="sdfds"
              />
            </Box>
            <Text
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              fontWeight="500"
              width="100%"
            >
              {file.name}
            </Text>
          </Center>
        ))}
        {fileList.length == 0 && (
          <Center
            position="relative"
            flexDirection="column"
            border="2px dashed "
            borderColor="red.200"
            rounded="7px"
            width="200px"
            height="200px"
          >
            <Icon as={FiPlus} fontSize="20px" />
            <Text>Upload</Text>
            <Input
              position="absolute"
              type="file"
              multiple={multiple}
              cursor="pointer"
              top="0"
              w="full"
              h="full"
              opacity="0"
              outline="none"
              onChange={handleFileDrop}
            />
          </Center>
        )}
      </Flex>
    </>
  );
}

export function FileCustomRHF({
  onChange,
  multiple,
  value,
}: {
  onChange: (data: (File | string)[]) => void;
  multiple?: boolean;
  value: string[] | null;
}) {
  const [fileList, setFileList] = useState<(File | string)[]>([]);

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      setFileList((old) => {
        const newData = [...old, ...files];
        onChange(newData);
        return newData;
      });
    }
  };
  const fileRemove = (file: File | string) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  useEffect(() => {
    if (value && typeof value === "object") {
      setFileList([...value]);
    }
  }, [value]);

  return (
    <>
      <Flex flexWrap="wrap" gap="1rem">
        {fileList.map((file, index) => (
          <Center
            key={index}
            cursor="pointer"
            flexDirection="column"
            border="2px dashed "
            borderColor="red.200"
            p="1rem"
            rounded="7px"
            width="200px"
            height="200px"
          >
            <Box
              display="inline-block"
              position="relative"
              overflow="hidden"
              borderRadius="md"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
              w="100%"
              height="100%"
            >
              <Button
                position="absolute"
                right={0}
                top={0}
                p={0}
                variant="outlineAuth"
                onClick={() => fileRemove(file)}
              >
                <FiX height="10px" />
              </Button>
              <Image
                w="100%"
                height="100%"
                objectFit="cover"
                src={
                  file && typeof file === "object"
                    ? URL.createObjectURL(file)
                    : typeof file === "string"
                    ? file
                    : ""
                }
                alt="hinh anh"
              />
            </Box>
            <Text
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              fontWeight="500"
              width="100%"
            >
              {typeof file === "string"
                ? file
                : file && typeof file === "object"
                ? file.name
                : ""}
            </Text>
          </Center>
        ))}
        {fileList.length == 0 && (
          <Center
            position="relative"
            flexDirection="column"
            border="2px dashed "
            borderColor="red.200"
            rounded="7px"
            width="200px"
            height="200px"
          >
            <Icon as={FiPlus} fontSize="20px" />
            <Text>Upload</Text>
            <Input
              position="absolute"
              type="file"
              multiple={multiple}
              cursor="pointer"
              top="0"
              w="full"
              h="full"
              opacity="0"
              outline="none"
              onChange={handleFileDrop}
            />
          </Center>
        )}
      </Flex>
    </>
  );
}
