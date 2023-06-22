import { Box, Container, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import EventBanner from "./EventBanner";

export default function Banner() {
  return (
    <>
      <Box
        as="header"
        overflow="hidden"
        display="flex"
        mt="5rem"
        position="relative"
      >
        <Box
          zIndex={2}
          position="absolute"
          left={0}
          right={0}
          top="60%"
          bottom={0}
          bgGradient="linear(to bottom,  #ff000000, white 70%)"
        />
        <Box
          position="absolute"
          backgroundImage="/banner.gif"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          filter="blur(20px)"
          bottom={0}
          top={0}
          left={0}
          right={0}
        />
        <Container
          position="relative"
          maxW="container.2xl"
          p={0}
          flex="1"
          display="flex"
          alignItems="center"
        >
          <SimpleGrid
            zIndex={3}
            columns={{ base: 1, lg: 8 }}
            w="100%"
            spacing=".7rem"
            py="3rem"
          >
            <GridItem
              colSpan={{ base: 1, lg: 6 }}
              rounded="5px"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image src="/banner.gif" alt="banner" w="100%" />
            </GridItem>
            <GridItem
              colSpan={{ base: 1, lg: 2 }}
              bg="white.100"
              rounded="5px"
              overflow="hidden"
              minH="500px"
            >
              <EventBanner />
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
