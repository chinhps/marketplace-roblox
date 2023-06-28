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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight, FiGitlab } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { IInfoUserResponse } from "@/types/response/auth.type";
import { numberFormat } from "@/utils/price";
import { useUserData } from "@/hooks/UserDataProvider";
import ModelLogout from "@/components/global/Model/ModelLogout";

export default function NavbarDropdown() {
  const userData = useUserData();

  return (
    <>
      {!token() || userData?.status === "error" ? (
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
      ) : userData?.status === "loading" ? (
        <Button variant="user" isLoading w="150px"></Button>
      ) : userData?.data ? (
        <MenuCustom data={userData?.data} />
      ) : null}
    </>
  );
}

function MenuCustom({ data }: { data: IInfoUserResponse }) {
  const toast = useToast(customToast);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      <ModelLogout isOpen={isOpen} onClose={onClose} />
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
          paddingBottom={0}
          borderColor="main.item3"
          boxShadow="md"
          style={
            { "--menu-bg": "var(--bg-item-main-color)" } as React.CSSProperties
          }
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
          <MenuItem
            commandSpacing={0}
            as={Button}
            bg="main.item3"
            onClick={onOpen}
          >
            Đăng xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
