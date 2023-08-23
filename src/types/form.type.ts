import { SubmitHandler } from "react-hook-form"

export interface IFormBase {
    dataForm: Array<IFormInput>,
    textBtn: string,
    CustomComponent?: any,
    hiddenLable?: boolean,
    onSubmit: SubmitHandler<any>,
    dataDefault?: object,
    icon?: React.ReactElement
}

export interface IFormInput {
    label: string,
    isRequired?: boolean,
    name: string,
    type: 'SELECT' | 'INPUT' | 'TEXTAREA' | 'NUMBER' | "FILE" | "SWITCH",
    preview?: boolean,
    default?: string,
    placeholder?: string,
    disable?: boolean,
    max?: number,
    min?: number,
    gridAreaName?: string,
    validate?: { required: string },
    selects?: Array<{
        label: string,
        value: string
    }>
}
