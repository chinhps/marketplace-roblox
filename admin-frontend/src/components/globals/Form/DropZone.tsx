import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

interface IFileDropzone {
  name: string;
  size: string;
}

export default function DropZone() {
  const [fileList, _] = useState<Array<IFileDropzone>>([]);
  return (
    <>
      <Box position="relative" w="full">
        <Stack
          direction="column"
          borderRadius="2xl"
          justify="center"
          p={10}
          align="center"
          border="2px dashed #4267B2"
        >
          <Image
            src="http://chính.vn/images/logo.png"
            alt="upload-file"
            w="100px"
          />
          <Text>Click vào đây để tải file của bạn lên</Text>
        </Stack>

        <Input
          position="absolute"
          type="file"
          top="0"
          w="full"
          h="full"
          opacity="0"
          cursor="pointer"
          outline="none"
          //   onChange={handleFileDrop}
        />
      </Box>

      <Stack direction="column" mt={10} justify="start" align="start" w="full">
        <Text fontWeight={500} fontSize="lg">
          File đã chọn
        </Text>

        {fileList.map((item, index) => (
          <Stack
            position="relative"
            direction="row"
            justifyContent="space-between"
            align="center"
            gap="20px"
            w="full"
            p="3"
            rounded="lg"
            key={index}
          >
            <Flex gap={5}>
              <Image
                src="http://chính.vn/images/logo.png"
                alt={item.name}
                w="50px"
              />

              <Stack direction="column" justify="start" align="start">
                <Text>{item.name}</Text>

                <Text>{item.size} byte</Text>
              </Stack>
            </Flex>

            <IconButton
              aria-label="Submit"
              variant="action"
              width="20px"
              borderRadius="50%"
              icon={<FiX />}
              //   onClick={() => fileRemove(item)}
            />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
