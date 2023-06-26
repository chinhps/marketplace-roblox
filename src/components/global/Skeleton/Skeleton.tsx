import { Box, BoxProps } from "@chakra-ui/react";

export default function Skeleton(props: BoxProps) {
  return <Box className="skeleton" height="100%" rounded="md" {...props}></Box>;
}
