import { handleCopy } from "@/utils/function";
import { Badge, BadgeProps } from "@chakra-ui/react";

interface IBadge extends BadgeProps {
  children: string | number;
}

export default function BadgeCustom({ children, ...props }: IBadge) {
  return (
    <>
      <Badge
        userSelect="none"
        {...props}
        marginLeft="5px"
        onDoubleClick={() => handleCopy(children.toString())}
      >
        {children}
      </Badge>
    </>
  );
}
