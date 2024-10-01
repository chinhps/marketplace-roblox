import { IShopList } from "@/types/response/shop.type";
import { UserResponse } from "@/types/response/user.type";
import { Badge, Flex, Image, Text, VStack } from "@chakra-ui/react";

export default function UserInfo({
  user,
  shop,
}: {
  user: UserResponse | null;
  shop: IShopList | null;
}) {
  return (
    <>
      <Flex alignItems="center" gap="1rem">
        <Image
          width="30px"
          rounded="50%"
          src={"https://ui-avatars.com/api/?name=" + user?.name}
          alt="hihi"
        />
        <VStack alignItems="flex-start" gap={0} fontWeight="normal">
          {shop?.domain != null && (
            <Text>
              Domain: <Badge colorScheme="green">{shop?.domain}</Badge>
            </Text>
          )}
          <Text>ID Provider: {user?.provider_id}</Text>
          <Text>User ID: {user?.id}</Text>
          <Text>Tên: {user?.name}</Text>
        </VStack>
      </Flex>
    </>
  );
}
