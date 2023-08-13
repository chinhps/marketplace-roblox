import { useForm } from "react-hook-form";
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IFormBase } from "@/types/form.type";
import FileCustom from "./Form/FileCustom";

export default function FormBase({
  dataForm,
  textBtn,
  CustomComponent,
  onSubmit,
  hiddenLable,
  dataDefault,
  icon,
}: IFormBase) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    dataDefault &&
      Object.entries(dataDefault).forEach(([key, value]) => {
        if (value) {
          setValue(key, value);
        }
      });
  }, []);

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
              gridArea={form.gridAreaName}
              mb={3}
              key={index}
              isInvalid={errors[form.name] ? true : false}
            >
              {!hiddenLable && <FormLabel>{form.label}</FormLabel>}
              {form.type === "FILE" ? (
                <FileCustom />
              ) : form.type === "INPUT" ? (
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
                  variant="outline"
                  fontSize="sm"
                  fontWeight="500"
                  // size="lg"
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                  placeholder={form.label}
                />
              ) : form.type === "NUMBER" ? (
                <NumberInput
                  variant="auth"
                  max={form.max ?? undefined}
                  min={form.min ?? 1}
                >
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
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                >
                  <option value="">{form.label}</option>
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
          {icon ? (
            <IconButton
              bg="main.item"
              color="main.text"
              type="submit"
              aria-label="submit"
              size="lg"
              icon={icon}
            />
          ) : (
            <Button
              isLoading={isSubmitting}
              fontSize="md"
              type="submit"
              variant="outlineRed"
              w="100%"
              size="lg"
            >
              {textBtn}
            </Button>
          )}
        </Test>
      </form>
    </>
  );
}
