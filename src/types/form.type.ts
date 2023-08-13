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
    name: string,
    type: 'SELECT' | 'INPUT' | 'TEXTAREA' | 'NUMBER' | "FILE",
    preview?: boolean,
    default?: string,
    max?: number,
    min?: number,
    gridAreaName?: string,
    validate?: { required: string },
    selects?: Array<{
        label: string,
        value: string
    }>
}
