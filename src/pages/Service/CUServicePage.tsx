import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import { Button } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";

export default function CUServicePage() {
  const onSubmit: SubmitHandler<any> = () => {};
  const [dataFormState, setDataFormState] = useState<Array<IFormInput>>(() => {
    return [
      {
        label: "Loại dịch vụ",
        name: "game_list",
        type: "SELECT",
        selects: [
          {
            label: "LUCKY_CARD",
            value: "LUCKY_CARD",
          },
          {
            label: "WHEEL",
            value: "WHEEL",
          },
          {
            label: "BOX",
            value: "BOX",
          },
          {
            label: "LINKTO",
            value: "LINKTO",
          },
          {
            label: "LUCKY_BOX",
            value: "LUCKY_BOX",
          },
          {
            label: "ACCOUNT",
            value: "ACCOUNT",
          },
        ],
      },
      {
        label: "Tên dịch vụ",
        name: "name_service_image",
        type: "INPUT",
      },
      {
        label: "Note cho dịch vụ",
        name: "note_service",
        type: "INPUT",
      },
      {
        label: "Giá tiền",
        name: "price_service",
        type: "INPUT",
      },
      {
        label: "Giảm giá (%)",
        name: "sale_service",
        type: "NUMBER",
        default: "0",
        min: 0,
        max: 100,
      },
      {
        label: "Kích hoạt",
        name: "active_service",
        type: "SELECT",
        selects: [
          {
            label: "Kích hoạt",
            value: "ON",
          },
          {
            label: "Không kích hoạt",
            value: "OFF",
          },
        ],
      },
      {
        label: "Thông báo cho dịch vụ",
        name: "notification_service",
        type: "TEXTAREA",
      },
      {
        label: "Hình ảnh đại diện",
        name: "thumb_service_image",
        type: "FILE",
      },
    ];
  });

  const handleImageByService = () => {
    setDataFormState((vl) => [
      ...vl,
      {
        label: "werdfwe",
        name: "dwfw",
        type: "INPUT",
      },
    ]);
  };

  return (
    <>
      <CardCollection title="Thêm dịch vụ" fontSize="25px">
        <FormBase
          dataForm={dataFormState}
          textBtn="Thêm mới ngay"
          onSubmit={onSubmit}
        />
        <Button onClick={() => handleImageByService()}>sdf</Button>
      </CardCollection>
    </>
  );
}
