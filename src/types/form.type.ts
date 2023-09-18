import { ButtonProps } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, UseFormWatch } from "react-hook-form";

export type InputsBuyRobux = {
  type_withdraw: string;
  linkpass: string;
};

export type InputsWithdrawDiamond = {
  type_withdraw: string;
  id_game: string;
};

export type InputsRecharge = {
  card_type: string;
  amount: number | string;
  serial: number | string;
  code: number | string;
};

export interface IFormBase {
  isLoading?: boolean;
  dataForm: Array<IFormInput>;
  textBtn: string;
  CustomComponent?: any;
  hiddenLable?: boolean;
  onSubmit: SubmitHandler<any>;
  dataDefault?: object;
  icon?: React.ReactElement;
}

export interface IFormInput {
  label: string;
  isRequired?: boolean;
  name: string;
  type: "SELECT" | "INPUT" | "TEXTAREA" | "NUMBER" | "FILE" | "SWITCH";
  preview?: boolean;
  default?: string;
  placeholder?: string;
  disable?: boolean;
  max?: number;
  min?: number;
  multiple?: boolean;
  gridAreaName?: string;
  validate?: { required: string };
  selects?: Array<{
    label: string;
    value: string;
  }>;
}

export interface IButtonNextUser extends ButtonProps {
  nameCheck: string;
  watch: UseFormWatch<FieldValues>;
}
