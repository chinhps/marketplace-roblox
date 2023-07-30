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
        bg={useColorModeValue("#111111", "gray.800")}
        color={useColorModeValue("white.500", "white")}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 5, md: 20 }}
        align={"center"}
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
  const linkColor = useColorModeValue("white.500", "gray.200");
  const linkHoverColor = useColorModeValue("white.600", "white");
  const popoverContentBgColor = useColorModeValue("black.100", "gray.800");

  return (
    <Stack as="ul" listStyleType="none" direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} as="li">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={4}
                as={ReactLink}
                to={navItem.href ?? "#"}
                fontSize={"md"}
                fontWeight={600}
                textTransform="uppercase"
                color={linkColor}
                display="flex"
                gap=".3rem"
                alignItems="center"
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                  borderBottom: "2px",
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
      ))}
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
      _hover={{ bg: useColorModeValue("black.300", "gray.900") }}
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
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="white.100">
          <DrawerCloseButton />
          <DrawerHeader>
            <Center>
              <Image
                src="https://i.imgur.com/wUN2rtT.png"
                alt="logo"
                h="50px"
              />
            </Center>
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column">
            {NAV_ITEMS.map((navItem) => (
              <MobileNavItem key={navItem.label} {...navItem} />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
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
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
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
        href: "#",
      },
      {
        label: "Nạp qua ATM",
        subLabel: "Chuyển khoản trực tiếp qua ngân hàng +20%",
        href: "#",
      },
    ],
  },
  {
    label: "Liên hệ Fanpage hỗ trợ",
    href: "#",
    icon: true,
  },
  {
    label: "Tin tức",
    href: "#",
    icon: true,
  },
];
