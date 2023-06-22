import Service from "@/components/global/Service/Service";
import { Center, Img, SimpleGrid } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Center mb="2rem">
        <Img alt="danh muc" src="/danhmuc.png" />
      </Center>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        gap={4}
        px={{ base: 2, lg: 0 }}
      >
        {Array(10)
          .fill(0)
          .map((_, key) => (
            <Service key={key} />
          ))}
      </SimpleGrid>
    </>
  );
}
