import { customToast, listOption, token } from "@/utils/const";
import {
  Button,
  Flex,
  Icon,
  Img,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight, FiGitlab } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { IInfoUserResponse } from "@/types/response/auth.type";
import { numberFormat } from "@/utils/price";

export default function NavbarDropdown() {
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState<IInfoUserResponse>(["user"]);

  return (
    <>
      {!token || queryState?.status === "error" ? (
        <>
          <Link as={ReactLink} to="/auth/sign-in">
            <Button
              variant="black"
              display={{ base: "none", md: "inline-block" }}
            >
              Đăng nhập
            </Button>
          </Link>
          <Link as={ReactLink} to="/auth/sign-up">
            <Button variant="blue">Đăng ký ngay</Button>
          </Link>
        </>
      ) : queryState?.status === "loading" ? (
        <Button variant="user" isLoading w="150px"></Button>
      ) : queryState?.data ? (
        <MenuCustom data={queryState?.data} />
      ) : null}
    </>
  );
}

function MenuCustom({ data }: { data: IInfoUserResponse }) {
  const toast = useToast(customToast);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.data.providerId);
      toast({
        description: "Sao chép ID thành công!",
      });
    } catch (error) {
      toast({
        description: "Thất bại khi sao chép!",
        status: "warning",
      });
    }
  };

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        leftIcon={<Icon as={FiGitlab} />}
        variant="user"
        rightIcon={<FiChevronDown />}
      >
        | {numberFormat(data.data.price)}
      </MenuButton>
      <MenuList
        overflow="hidden"
        color="black.200"
        paddingBottom={0}
        borderColor="ocean.100"
        boxShadow="md"
        p="10px"
        minW="270px"
      >
        <MenuItem onClick={handleCopy} as={Flex} gap={5}>
          <Img w="50px" src="/icon.jpeg" alt="icon avatar by chinh.dev" />
          <List>
            <ListItem as={Flex} gap={2}>
              <Text fontWeight="bold">ID: </Text> {data.data.providerId}
            </ListItem>
            <ListItem as={Flex} gap={2}>
              <Text fontWeight="bold">Tên: </Text> {data.data.name}
            </ListItem>
            <ListItem as={Flex} gap={2}>
              <Text fontWeight="bold">Số dư: </Text>
              {numberFormat(data.data.price)}
            </ListItem>
          </List>
        </MenuItem>
        <MenuDivider />
        {listOption.map((vl) => (
          <MenuGroup key={vl.lable} title={vl.lable} color="ocean.200">
            {vl.children.map((vl2) => (
              <ReactLink key={vl2.lable} to={vl2.link}>
                <MenuItem fontSize="15px" icon={<FiChevronRight />}>
                  {vl2.lable}
                </MenuItem>
              </ReactLink>
            ))}
          </MenuGroup>
        ))}
        <MenuItem commandSpacing={0} as={Button} bg="ocean.100">
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
