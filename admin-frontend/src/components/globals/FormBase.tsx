import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Select,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IFormBase } from "@/types/form.type";
import { FileCustomRHF } from "./Form/FileCustom";
import InputNumberCustom from "./Form/InputNumberCustom";
import { handleCopy } from "@/utils/function";
import CKEditorCustom from "./Form/QuillEditorCustom";
import { useQuery } from "@tanstack/react-query";
import shopApi from "@/apis/shop";

export default function FormBase({
  dataForm,
  textBtn,
  CustomComponent,
  onSubmit,
  hiddenLable,
  dataDefault,
  icon,
  isSubmitCustom,
}: IFormBase) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    dataDefault &&
      Object.entries(dataDefault).forEach(([key, value]) => {
        if (value) {
          setValue(key, value);
        }
      });
  }, [dataDefault]);

  const shopAllQuery = useQuery({
    queryKey: ["shop-all"],
    queryFn: () => shopApi.all(),
    retry: false,
    cacheTime: 12000,
    refetchOnWindowFocus: false,
  });

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
                    <FileCustomRHF
                      onChange={onChange}
                      value={value ?? (form.default ? [form.default] : null)}
                      multiple={form?.multiple}
                    />
                  )}
                  control={control}
                  name={form.name}
                />
              ) : form.type === "SWITCH" ? (
                <Controller
                  render={({ field: { onChange, value, name } }) => (
                    <>
                      <Switch
                        fontSize="sm"
                        fontWeight="500"
                        size="lg"
                        onChange={onChange}
                        name={name}
                        isChecked={value}
                        value={value}
                      />
                    </>
                  )}
                  defaultValue={form.default}
                  control={control}
                  name={form.name}
                  // rules={form.validate ?? null}
                />
              ) : form.type === "DATE" ? (
                <Input
                  variant="auth"
                  type="date"
                  disabled={form.disable}
                  {...register(form.name, {
                    value: form.default ?? null,
                    ...(form.validate ?? null),
                  })}
                  placeholder={form.placeholder ?? form.label}
                />
              ) : form.type === "INPUT" ? (
                <InputGroup>
                  <Input
                    variant="auth"
                    disabled={form.disable}
                    list={form.name}
                    {...register(form.name, {
                      value: form.default ?? null,
                      ...(form.validate ?? null),
                    })}
                    placeholder={form.placeholder ?? form.label}
                  />
                  {form.copy ? (
                    <InputRightElement width="4.5rem" height="100%">
                      <Button
                        size="sm"
                        onClick={() => handleCopy(watch(form.name))}
                      >
                        Copy
                      </Button>
                    </InputRightElement>
                  ) : null}
                  {form.name === "domain" ? (
                    <List as="datalist" id={form.name}>
                      {shopAllQuery.data?.data.data.map((vl, index) => (
                        <ListItem key={index} as="option">
                          {vl.domain}
                        </ListItem>
                      ))}
                    </List>
                  ) : null}
                </InputGroup>
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
              ) : form.type === "HTML" ? (
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <CKEditorCustom onChange={onChange} value={value} />
                  )}
                  control={control}
                  name={form.name}
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
              isLoading={isSubmitCustom ?? isSubmitting}
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
