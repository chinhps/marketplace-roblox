import { IFormInput } from "@/types/form.type";
import { IServiceType } from "@/types/service.type";

export const initialFormState: Array<IFormInput> = [
  {
    label: "Ưu tiên",
    name: "prioritize",
    type: "NUMBER",
    isRequired: true,
    gridAreaName: "prioritize",
  },
  {
    label: "Tên dịch vụ",
    name: "name_service_image",
    type: "INPUT",
    isRequired: true,
    gridAreaName: "name_service_image",
  },
  {
    label: "Note cho dịch vụ",
    name: "note_service",
    type: "INPUT",
    isRequired: true,
    gridAreaName: "note_service",
  },
  {
    label: "Giá tiền",
    name: "price_service",
    type: "NUMBER",
    default: "0",
    min: 0,
    gridAreaName: "price_service",
  },
  {
    label: "Giảm giá (%)",
    name: "sale_service",
    type: "NUMBER",
    default: "50",
    gridAreaName: "sale_service",
    min: 0,
    max: 100,
  },
  {
    label: "Kích hoạt",
    name: "active_service",
    type: "SWITCH",
    gridAreaName: "active_service",
  },
  {
    label: "Thông báo cho dịch vụ",
    name: "notification_service",
    type: "HTML",
    gridAreaName: "notification_service",
  },
  {
    label: "Hình ảnh đại diện",
    isRequired: true,
    name: "thumb_service_image",
    type: "FILE",
  },
];

export const handleImageByService = (type: string) => {
  let serviceForm: Array<IFormInput> = [];
  switch (type) {
    case IServiceType.BOX:
      serviceForm.push({
        label: "Loại tiền tệ",
        name: "currency",
        type: "SELECT",
        selects: [
          {
            label: "Không có đơn vị",
            value: "1",
          },
          {
            label: "Kim cương",
            value: "2",
          },
          {
            label: "Robux",
            value: "3",
          },
        ],
      });
      break;
    case IServiceType.LUCKY_BOX:
      serviceForm.push({
        label: "Ảnh nền của box",
        name: "image_1",
        type: "FILE",
      });
      serviceForm.push({
        label: "Quà hiển thị khi đang rút",
        name: "image_3",
        type: "FILE",
      });
      serviceForm.push({
        label: "Quà hiển thị khi chưa rút",
        name: "image_2",
        type: "FILE",
      });
      break;
    case IServiceType.LUCKY_CARD:
      serviceForm.push({
        label: "Thẻ mặc định",
        name: "image_1",
        type: "FILE",
      });
      break;
    case IServiceType.WHEEL:
      serviceForm.push({
        label: "Ảnh nền vòng quay",
        name: "image_1",
        type: "FILE",
      });
      break;
    case IServiceType.LINKTO:
      serviceForm.push({
        label: "Đường dẫn tới",
        name: "link_to",
        type: "INPUT",
      });
      break;
    case IServiceType.ACCOUNT:
      break;
  }
  return serviceForm;
};
