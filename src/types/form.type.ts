import { SubmitHandler } from "react-hook-form";

export interface IFormBase {
  dataForm: Array<IFormInput>;
  textBtn: string;
  CustomComponent?: any;
  hiddenLable?: boolean;
  onSubmit: SubmitHandler<any>;
  dataDefault?: object;
  icon?: React.ReactElement;
}

export interface IFormInput {
  copy?: boolean;
  label: string;
  isRequired?: boolean;
  name: string;
  type: "SELECT" | "INPUT" | "TEXTAREA" | "NUMBER" | "FILE" | "SWITCH" | "HTML";
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

export interface IQueryForm {
  page: number;
  filter: object;
}

export interface IFormSearchProps {
  setFilter: (data: object) => void;
  filter: object;
  setPage: (page: number) => void;
}
