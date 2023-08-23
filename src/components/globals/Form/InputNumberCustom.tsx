import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";

interface IInputNumberCustom extends NumberInputProps {
  onChange?: (vl: string) => void;
}

export default function InputNumberCustom({
  onChange,
  ...props
}: IInputNumberCustom) {
  return (
    <>
      <NumberInput
        variant="auth"
        onChange={onChange}
        size="lg"
        {...props}
        defaultValue={0}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
}
