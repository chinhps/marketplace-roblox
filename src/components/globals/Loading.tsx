import { Center, Spinner } from "@chakra-ui/react";

export default function LoadingGlobal() {
  return (
    <>
      <Center
        position="fixed"
        inset={0}
        bg="main.loading"
        blur="md"
        zIndex={100}
      >
        <Spinner />
      </Center>
    </>
  );
}
