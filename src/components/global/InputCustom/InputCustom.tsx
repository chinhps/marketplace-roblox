import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function InputCustom({
  type,
  placeholder,
  register,
  name,
  validate,
  errors,
}: {
  type?: "text" | "password";
  placeholder: string;
  name: string;
  register: any;
  validate?: Object;
  errors?: FieldErrors<FieldValues>;
}) {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <>
      <FormControl isInvalid={errors?.[name] ? true : false}>
        <InputGroup>
          <Input
            type={
              (type === "password"
                ? show === true
                  ? "text"
                  : "password"
                : type) ?? "text"
            }
            variant="filled"
            className="input-animation"
            placeholder={placeholder}
            _placeholder={{ fontWeight: "700", fontSize: "17px" }}
            py="2rem"
            px="1.5rem"
            {...register(name, validate)}
          />
          {type === "password" && (
            <InputRightElement height="100%" mr="1rem">
              {show ? (
                <FiEye onClick={handleClick} />
              ) : (
                <FiEyeOff onClick={handleClick} />
              )}
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage>
          {errors?.[name] && (errors[name]?.message as string)}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
