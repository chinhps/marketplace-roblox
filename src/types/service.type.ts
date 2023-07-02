import { BoxProps, ButtonProps } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface ServiceInterface {
    service_name: string;
    service_image: string;
    service_counter: number;
    service_counter_text: string;
    service_price: number;
    service_type: string;
    service_slug: string;
}

export interface ServicePriceProps extends BoxProps {
    borderColor: string;
    children: React.ReactNode;
}

export interface ButtonCustomProps extends ButtonProps {
    variant: string;
    children: React.ReactNode;
}

export interface GameActionProps {
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    onSubmit: SubmitHandler<FieldValues>;
    register: UseFormRegister<FieldValues>;
    isSubmitting: boolean;
    service_price: number;
    cardsRef?: React.RefObject<HTMLDivElement>;
    watch?: UseFormWatch<FieldValues> | undefined;
    isTry?: boolean;
    hiddenNumloop?: boolean;
    textButton?: string;
    handleClickSubmitCustom?: () => void;
    handleTry?: (numberLoop: number) => void;
}

export interface GameSelectNumloop extends Pick<GameActionProps, "register" | "service_price"> {
    hidden: boolean | null;
}

export interface ServiceHandlePostProps {
    type: "REAL" | "FAKE";
    numrolllop: number;
}

export interface ListGiftsInterface {
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    img5: string,
    img6: string,
    img7: string,
    img8: string,
    img9: string,
}