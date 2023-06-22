import { IFormBase } from "@/types/form.type";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";

export default function FormBase({
  dataForm,
  textBtn,
  CustomComponent,
  onSubmit,
  hiddenLable,
}: IFormBase) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function Test({ children }: { children: React.ReactNode }) {
    return (
      <>
        {CustomComponent ? (
          <CustomComponent>{children}</CustomComponent>
        ) : (
          children
        )}
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Test>
          {dataForm?.map((form, index) => (
            <FormControl
              mb={5}
              key={index}
              isInvalid={errors[form.name] ? true : false}
            >
              {!hiddenLable && <FormLabel>{form.label}</FormLabel>}
              {form.type === "INPUT" ? (
                <Input
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                  placeholder={form.label}
                />
              ) : form.type === "TEXTAREA" ? (
                <Textarea
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                  placeholder={form.label}
                />
              ) : form.type === "NUMBER" ? (
                <NumberInput max={form.max ?? undefined} min={form.min ?? 1}>
                  <NumberInputField
                    {...register(form.name, {
                      value: form.default ?? null,
                      ...(form.validate ?? null),
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              ) : form.type === "SELECT" ? (
                <Select
                  variant="main"
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                >
                  {form.selects?.map((select, index) => (
                    <option key={index} value={select.value}>
                      {select.label}
                    </option>
                  ))}
                </Select>
              ) : null}
              <FormErrorMessage>
                {errors[form.name] && (errors[form.name]?.message as string)}
              </FormErrorMessage>
            </FormControl>
          ))}
          <Button
            isLoading={isSubmitting}
            fontSize="md"
            type="submit"
            variant="blue"
            w="100%"
            h="50"
          >
            <Text className="showText">{textBtn}</Text>
          </Button>
        </Test>
      </form>
    </>
  );
}
