import { Input } from "@chakra-ui/react";

export default function InputCustom({
  type,
  placeholder,
  register,
  name,
}: {
  type?: "text" | "password";
  placeholder: string;
  name: string;
  register: any;
}) {
  return (
    <>
      <Input
        type={type ?? "text"}
        variant="filled"
        className="input-animation"
        placeholder={placeholder}
        _placeholder={{ fontWeight: "700", fontSize: "17px" }}
        py="2rem"
        px="1.5rem"
        {...register(name)}
      />
    </>
  );
}
