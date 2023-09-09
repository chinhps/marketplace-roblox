import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IFormBase } from "@/types/form.type";
import { FileCustomRHF } from "./Form/FileCustom";
import InputNumberCustom from "./Form/InputNumberCustom";

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
    control,
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
              isRequired={form.isRequired}
              isInvalid={errors[form.name] ? true : false}
            >
              {!hiddenLable && <FormLabel>{form.label}</FormLabel>}
              {form.type === "FILE" ? (
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <FileCustomRHF onChange={onChange} value={value} multiple={form?.multiple} />
                  )}
                  control={control}
                  name={form.name}
                />
              ) : form.type === "SWITCH" ? (
                <Switch
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                  {...register(form.name, {
                    value: form.default ?? false,
                    ...(form.validate ?? null),
                  })}
                />
              ) : form.type === "INPUT" ? (
                <Input
                  variant="auth"
                  disabled={form.disable}
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                  placeholder={form.placeholder ?? form.label}
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
                  placeholder={form.placeholder ?? form.label}
                />
              ) : form.type === "NUMBER" ? (
                <>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <InputNumberCustom
                        handleChange={onChange}
                        value={value}
                        min={form.min}
                        max={form.max}
                      />
                    )}
                    defaultValue={form.default}
                    control={control}
                    name={form.name}
                    // rules={form.validate ?? null}
                  />
                </>
              ) : form.type === "SELECT" ? (
                <Select
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                  placeholder={form.placeholder ?? form.label}
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
              gridArea="button"
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
