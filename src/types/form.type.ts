import { ButtonProps } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, UseFormWatch } from "react-hook-form"

export type InputsBuyRobux = {
    type_withdraw: string;
    linkpass: string;
};

export interface IFormBase {
    dataForm: Array<IFormInput>,
    textBtn: string,
    CustomComponent?: any,
    hiddenLable?: boolean,
    onSubmit: SubmitHandler<any>
}

export interface IFormInput {
    label: string,
    name: string,
    type: 'SELECT' | 'INPUT' | 'TEXTAREA' | 'NUMBER',
    default?: string,
    max?: number,
    min?: number,
    validate?: { required: string },
    selects?: Array<{
        label: string,
        value: string
    }>
}

export interface IButtonNextUser extends ButtonProps {
    nameCheck: string;
    watch: UseFormWatch<FieldValues>;
  }