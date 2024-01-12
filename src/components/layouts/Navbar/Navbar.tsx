import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import Skeleton from "@/components/global/Skeleton/Skeleton";

export default function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box as="nav" position="fixed" top={0} left={0} right={0} zIndex={10}>
      <Flex
        bg="main.nav"
        color="white.100"
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 5, md: 20 }}
        align={"center"}
        boxShadow="base"
      >
        <Flex flex={{ base: 1 }} alignItems="center" justify="start">
          <Flex alignItems="center" gap={2}>
            <IconButton
              onClick={onToggle}
              display={{ base: "flex", lg: "none" }}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} color="white.100" />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
              _hover={{
                bg: "black.200",
              }}
            />
            <Link as={ReactLink} to="/">
              <LogoNav />
            </Link>
          </Flex>

          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={4}
        >
          <NavbarDropdown />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav isOpen={isOpen} onClose={onClose} />
      </Collapse>
    </Box>
  );
}

function LogoNav() {
  const data = useInformationShopData();
  return (
    <>
      {data?.status === "loading" ? (
        <Skeleton w="150px" height="40px" rounded="lg" />
      ) : (
        <Image
          src={data?.data?.data.information.logo_url}
          alt="logo"
          height="50px"
        />
      )}
    </>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("black.100", "gray.800");
  const dataInformation = useInformationShopData();

  return (
    <Stack as="ul" listStyleType="none" direction={"row"} spacing={4}>
      {navItemWithData(dataInformation?.plugin?.link_fanpage ?? "").map(
        (navItem) => (
          <Box key={navItem.label} as="li">
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={4}
                  as={ReactLink}
                  to={navItem.href ?? "#"}
                  color="white.100"
                  fontSize={"md"}
                  fontWeight={600}
                  textTransform="uppercase"
                  display="flex"
                  gap=".3rem"
                  alignItems="center"
                  _hover={{
                    textDecoration: "none",
                    color: "red",
                    borderBottom: "1px",
                  }}
                >
                  <Text>{navItem.label}</Text>
                  {navItem.icon ? (
                    <Icon as={FiArrowUpRight} color="gray" />
                  ) : null}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        )
      )}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "black.100" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dataInformation = useInformationShopData();

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="main.item">
          <DrawerCloseButton />
          <DrawerHeader>
            <Center>
              <LogoNav />
            </Center>
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column">
            {navItemWithData(dataInformation?.plugin?.link_fanpage ?? "").map(
              (navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
              )
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={1} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color="white.100">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            color="white.100"
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mb="1rem"
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
          color="white.100"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  icon?: boolean;
}

function navItemWithData(linkPage: string) {
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Nạp thẻ",
      children: [
        {
          label: "Nạp qua thẻ cào",
          subLabel: "Thông qua các nhà mạng viễn thông",
          href: "/profile/recharge",
        },
        // {
        //   label: "Nạp qua ATM",
        //   subLabel: "Chuyển khoản trực tiếp qua ngân hàng +20%",
        //   href: "#",
        // },
      ],
    },
    {
      label: "Liên hệ Fanpage hỗ trợ",
      href: linkPage,
      icon: true,
    },
    // {
    //   label: "Tin tức",
    //   href: "#",
    //   icon: true,
    // },
  ];
  return NAV_ITEMS;
}
