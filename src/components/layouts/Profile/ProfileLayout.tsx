import { Outlet } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListIcon,
  Text,
  Box,
  List,
  ListItem,
  HStack,
  Grid,
  GridItem,
  Flex,
  Img,
  Stack,
  Divider,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { numberFormat } from "@/utils/price";
import { listOption } from "@/utils/const";
import IsAuthentication from "@/guards/IsAuthentication";
import { useQueryClient } from "@tanstack/react-query";
import { IInfoUserResponse } from "@/types/response/auth.type";

export default function ProfileLayout() {
  return (
    <IsAuthentication>
      <SimpleGrid columns={10} spacing={3}>
        <GridItem colSpan={2} bg="white.500" p={5}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={8} bg="white.500" p={10}>
          <Outlet />
        </GridItem>
      </SimpleGrid>
    </IsAuthentication>
  );
}

function SideBar() {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState<IInfoUserResponse>(["user"]);

  return (
    <>
      <Grid templateColumns="repeat(10,1fr)" gap={3} alignItems="center">
        <GridItem colSpan={3}>
          <Flex justifyContent="center">
            <Img
              w="100%"
              rounded="md"
              src="https://i.imgur.com/CP32c7B.jpg"
              alt="chinh.dev"
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={7}>
          <Box flex="1">
            <Stack spacing={1}>
              <Text fontSize="15px">
                <Text as="b" pr={1}>
                  ID:
                </Text>
                {queryState?.data?.data.providerId}
              </Text>
              <Text fontSize="15px">
                <Text as="b" pr={1}>
                  Tên:
                </Text>
                {queryState?.data?.data.name}
              </Text>
              <Text fontSize="15px">
                <Text as="b" pr={1}>
                  Số dư:
                </Text>
                <Text color="ocean.200" as="b" pr={1}>
                  {numberFormat(queryState?.data?.data.price ?? 0)}
                </Text>
              </Text>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
      <Divider mt={3} />
      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple mt={2}>
        <ListSideBar />
      </Accordion>
    </>
  );
}

function ListSideBar() {
  return (
    <>
      {listOption.map((option, index) => (
        <AccordionItem border="none" key={index}>
          <AccordionButton>
            <Box as="b" flex="1" color="ocean.200" textAlign="left">
              {option.lable}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={2}>
            <List>
              {option.children.map((child, index2) => (
                <ListItem key={index2}>
                  <Link to={child.link}>
                    <HStack py={1}>
                      <ListIcon as={FaChevronRight} height="10px" />
                      <Text>{child.lable}</Text>
                    </HStack>
                  </Link>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </>
  );
}
