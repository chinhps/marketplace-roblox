import { listOption, token } from "@/utils/const";
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
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight, FiGitlab } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { IInfoUserResponse } from "@/types/response/auth.type";
import { handleCopy, numberFormat } from "@/utils/price";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <MenuList overflow="hidden" paddingBottom={0} boxShadow="md">
          <MenuItem
            onClick={() => handleCopy(data.data.providerId)}
            as={Flex}
            gap={5}
          >
            <Img
              w="50px"
              src="/icon.jpeg"
              rounded="md"
              alt="icon avatar by chinh.dev"
            />
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
            <MenuGroup key={vl.lable} title={vl.lable}>
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
            mt="1rem"
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
