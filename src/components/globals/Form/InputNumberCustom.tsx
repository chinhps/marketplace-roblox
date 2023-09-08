import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";

interface IInputNumberCustom extends NumberInputProps {
  handleChange: (vl: number) => void;
}

export default function InputNumberCustom({
  handleChange,
  ...props
}: IInputNumberCustom) {
  return (
    <>
      <NumberInput
        variant="auth"
        onChange={(e) => handleChange && handleChange(Number(e) ?? 0)}
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
