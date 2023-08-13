import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export default function FileCustom() {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      //   const newFile: File[] = Array.from(files);
      setFileList((old) => [...old, ...files]);
    }
  };
  console.log(fileList);

  return (
    <>
      <HStack>
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
            cursor="pointer"
            top="0"
            w="full"
            h="full"
            opacity="0"
            outline="none"
            onChange={handleFileDrop}
          />
        </Center>
      </HStack>
    </>
  );
}
