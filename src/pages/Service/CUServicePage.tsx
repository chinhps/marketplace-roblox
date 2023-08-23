import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  IconButton,
  Input,
  Select,
  Switch,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { IServiceType } from "@/types/service.type";
import { Link } from "react-router-dom";
import { FiPlus, FiSlack, FiUser, FiUsers } from "react-icons/fi";
import InputTag from "@/components/globals/Form/InputTag";
import ModelBase from "@/components/globals/Model/ModelBase";
import FileCustom from "@/components/globals/Form/FileCustom";
import InputNumberCustom from "@/components/globals/Form/InputNumberCustom";
import InputExcept from "@/components/globals/Form/InputExcept";

const formBase: Array<IFormInput> = [
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
    type: "INPUT",
    gridAreaName: "price_service",
  },
  {
    label: "Giảm giá (%)",
    name: "sale_service",
    type: "NUMBER",
    default: "0",
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
    type: "TEXTAREA",
    gridAreaName: "notification_service",
  },
  {
    label: "Hình ảnh đại diện",
    isRequired: true,
    name: "thumb_service_image",
    type: "FILE",
  },
];

export default function CUServicePage() {
  const [typeService, setTypeService] = useState<string>("");
  const [dataFormState, setDataFormState] =
    useState<Array<IFormInput>>(formBase);
  const toast = useToast();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };
  const handleChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeService(e.target.value);
    setDataFormState(formBase);
    handleImageByService(e.target.value);
  };

  const handleImageByService = (type: string) => {
    let serviceForm: Array<IFormInput> = [];

    switch (type) {
      case IServiceType.BOX:
        serviceForm.push({
          label: "Loại tiền tệ",
          name: "currency",
          type: "SELECT",
          selects: [
            {
              label: "Kim cương",
              value: "DIAMOND",
            },
            {
              label: "Robux",
              value: "ROBUX",
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

        // serviceForm.push(oddsInput);
        break;
      case IServiceType.LUCKY_CARD:
        serviceForm.push({
          label: "Thẻ mặc định",
          name: "image_1",
          type: "FILE",
        });
        // serviceForm.push(oddsInput);
        break;
      case IServiceType.WHEEL:
        serviceForm.push({
          label: "Ảnh nền vòng quay",
          name: "image_1",
          type: "FILE",
        });
        // serviceForm.push(oddsInput);
        break;
      case IServiceType.LINKTO:
        serviceForm.push({
          label: "Đường dẫn tới",
          name: "link_to",
          type: "INPUT",
        });
        break;
      case IServiceType.ACCOUNT:
        toast({
          description: "Không cần điền giá tiền",
          position: "bottom-right",
        });
        break;
    }
    setDataFormState((vl) => [...vl, ...serviceForm]);
  };

  return (
    <>
      <CardCollection
        title={"Thêm dịch vụ #" + typeService}
        fontSize="25px"
        button={
          <Link to="../../">
            <Button colorScheme="red" variant="outline">
              Trở về
            </Button>
          </Link>
        }
      >
        <FormControl isRequired mb="1rem">
          <FormLabel>Chọn loại dịch vụ</FormLabel>
          <Select
            variant="auth"
            fontSize="sm"
            fontWeight="500"
            size="lg"
            placeholder="Loại Chọn loại dịch vụ"
            onChange={handleChangeService}
          >
            <option value="LUCKY_BOX">Mở hộp may mắn</option>
            <option value="LUCKY_CARD">Lật thẻ bài</option>
            <option value="WHEEL">Vòng quay</option>
            <option value="BOX">Hòm vật phẩm (Dạng tài khoản)</option>
            <option value="LINKTO">Đến đường dẫn khác</option>
            <option value="ACCOUNT">Tài khoản Game</option>
            <option value="CATEGORY">Nhóm dịch vụ</option>
            <option value="RANDOM">Random tài khoản (Dạng tài khoản)</option>
          </Select>
        </FormControl>
        <InputExcept />
        {(typeService === IServiceType.LUCKY_BOX ||
          typeService === IServiceType.LUCKY_CARD ||
          typeService === IServiceType.WHEEL) && <AddNewOdds />}

        {typeService !== "" && (
          <FormBase
            dataForm={dataFormState}
            textBtn="Thêm mới ngay"
            onSubmit={onSubmit}
            CustomComponent={CustomStyle}
          />
        )}
      </CardCollection>
    </>
  );
}

interface IGiftAdd {
  typeGift: "ROBUX" | "DIAMOND" | "QUANHUY" | "NOT";
  message: string;
  value: number | string | Array<number>;
  percent: number;
  isRandom: boolean;
  isVip: boolean;
}

const initialFormStateGifts: IGiftAdd = {
  isRandom: false,
  isVip: false,
  message: "",
  percent: 0,
  typeGift: "NOT",
  value: 0,
};

interface IOddsAdd {
  isRandomAdmin: boolean;
  isRandomUser: boolean;
  oddsAdmin: Array<{
    id: number;
    description: string;
  }>;
  oddsUser: Array<{
    id: number;
    description: string;
  }>;
  listGift: Array<IGiftAdd>;
}

const initialFormStateOdds: IOddsAdd = {
  isRandomAdmin: false,
  isRandomUser: false,
  oddsAdmin: [],
  oddsUser: [],
  listGift: [],
};

function GiftAdd({
  onChange,
  onClickScript,
  id,
}: {
  onChange: (data: IGiftAdd, id: number) => void;
  onClickScript: (id: number, type: "ADMIN" | "USER") => void;
  id: number;
}) {
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [formState, setFormState] = useState<IGiftAdd>(initialFormStateGifts);

  const handleChange = useCallback(
    (name: keyof IGiftAdd) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement; // Type assertion
        const value =
          target.type === "checkbox" ? target.checked : target.value;
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
    []
  );

  const handleChangeCustom = useCallback(
    (name: keyof IGiftAdd) =>
      (value: string | boolean | Array<string | number>) => {
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
    []
  );

  useEffect(() => {
    onChange(formState, id);
  }, [formState]);

  return (
    <>
      <HStack spacing="1rem">
        <FileCustom multiple={false} />
        <VStack flexDirection="column" flex={1}>
          <FormControl isRequired mb="1rem">
            <HStack justifyContent="space-between">
              <FormLabel>Loại quà</FormLabel>
              <HStack mb={2}>
                <Text fontWeight="bold">
                  VIP(Chỉ admin mới có thể quay trúng quà VIP)
                </Text>
                <Switch onChange={handleChange("isVip")} />
              </HStack>
            </HStack>

            <HStack>
              <Select
                onChange={handleChange("typeGift")}
                variant="auth"
                fontSize="sm"
                fontWeight="500"
                size="lg"
                placeholder="-- Chọn loại quà --"
              >
                <option value="NOT">Không có</option>
                <option value="DIAMOND">Kim cương</option>
                <option value="ROBUX">Robux</option>
                <option value="QUANHUY">Quân huy</option>
              </Select>
              <IconButton
                colorScheme={isRandom ? "purple" : "blackAlpha"}
                size="lg"
                aria-label="random"
                icon={<FiSlack />}
                onClick={() => {
                  setIsRandom((vl) => !vl);
                  handleChangeCustom("isRandom")(!isRandom);
                }}
              />
              <IconButton
                onClick={() => onClickScript(id, "ADMIN")}
                colorScheme="blue"
                size="lg"
                aria-label="random"
                icon={<FiUser />}
              />
              <IconButton
                onClick={() => onClickScript(id, "USER")}
                colorScheme="red"
                size="lg"
                aria-label="random"
                icon={<FiUsers />}
              />
            </HStack>
          </FormControl>
          <HStack w="100%" spacing="1rem">
            <FormControl isRequired mb="1rem">
              <FormLabel>
                Giá trị (
                {isRandom
                  ? "Ngẫu nhiên cần 2 giá trị"
                  : "Cố định cần 1 giá trị"}
                )
              </FormLabel>
              {isRandom ? (
                <InputTag limit={2} onChange={handleChangeCustom("value")} />
              ) : (
                <Input
                  onChange={handleChange("value")}
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  size="lg"
                />
              )}
            </FormControl>
            <FormControl isRequired mb="1rem">
              <FormLabel>Thông báo khi trúng thưởng</FormLabel>
              <Input
                placeholder={
                  isRandom ? "Sử dụng ... để hiển thị random" : "Thông báo"
                }
                onChange={handleChange("message")}
                variant="auth"
                fontSize="sm"
                fontWeight="500"
                size="lg"
              />
            </FormControl>
            <FormControl isRequired mb="1rem">
              <FormLabel>Tỷ lệ (%)</FormLabel>
              <InputNumberCustom
                onChange={handleChangeCustom("percent")}
                min={0}
                max={100}
                precision={2}
                step={0.5}
              />
            </FormControl>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
}

function ModelAddOdds() {
  const [listGift, setListGift] = useState<Array<IGiftAdd>>([]);
  const [formState, setFormState] = useState<IOddsAdd>(initialFormStateOdds);

  const handleChangeNumberGifts = (countGift: string | number) => {
    let countGiftNew = Number(countGift);
    if (listGift.length < countGiftNew) {
      setListGift((prev) => [
        ...prev,
        ...new Array(countGiftNew - listGift.length).fill(
          initialFormStateGifts
        ),
      ]);
      return;
    }

    setListGift(
      listGift.slice(0, listGift.length - (listGift.length - countGiftNew))
    );
  };

  const handleChange =
    (name: keyof IOddsAdd) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = event.target as HTMLInputElement; // Type assertion
      const value = target.type === "checkbox" ? target.checked : target.value;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const handleAddGift = (data: IGiftAdd, id: number) => {
    formState.listGift[id] = data;
    setFormState(formState);
  };

  const handleSubmit = () => {
    console.log("formState", formState);
  };

  const handleClickAddScript = (id: number, type: "ADMIN" | "USER") => {
    // ADMIN
    if (type === "ADMIN") {
      formState.oddsAdmin.push({
        id: id,
        description: formState.listGift[id].message,
      });
      setFormState((prev) => ({
        ...prev,
        oddsAdmin: [...prev.oddsAdmin], // Thêm mảng mới với các phần tử cũ và phần tử mới
      }));
      return;
    }

    // USER
    formState.oddsUser.push({
      id: id,
      description: formState.listGift[id].message,
    });
    setFormState((prev) => ({
      ...prev,
      oddsUser: [...prev.oddsUser], // Thêm mảng mới với các phần tử cũ và phần tử mới
    }));
    return;
  };

  return (
    <>
      <FormControl isRequired mb="1rem">
        <HStack justifyContent="space-between">
          <FormLabel>
            Tỷ lệ Admin: (ADMIN khi Random quà sẽ Random tất cả quà không cần tỷ
            lệ)
          </FormLabel>
          <HStack mb={2}>
            <Text fontWeight="bold">Random</Text>
            <Switch onChange={handleChange("isRandomAdmin")} />
          </HStack>
        </HStack>
        <InputTag
          isDisable={formState.isRandomAdmin}
          values={formState.oddsAdmin.map((vl) => vl.description)}
        />
      </FormControl>

      <FormControl isRequired mb="1rem">
        <HStack justifyContent="space-between">
          <FormLabel>
            Tỷ lệ Người dùng: (Người dùng khi Random sẽ dựa theo tỷ lệ % của
            từng quà)
          </FormLabel>
          <HStack mb={2}>
            <Text fontWeight="bold">Random</Text>
            <Switch onChange={handleChange("isRandomUser")} />
          </HStack>
        </HStack>
        <InputTag
          isDisable={formState.isRandomUser}
          values={formState.oddsUser.map((vl) => vl.description)}
        />
      </FormControl>

      <HStack>
        <FormControl isRequired mb="1rem">
          <FormLabel>Số lượng quà</FormLabel>
          <HStack>
            <InputNumberCustom
              onChange={handleChangeNumberGifts}
              defaultValue={0}
              value={listGift.length}
              min={1}
              max={100}
            />
            <IconButton
              aria-label="add new gift"
              size="lg"
              onClick={() => handleChangeNumberGifts(listGift.length + 1)}
              icon={<FiPlus />}
            />
          </HStack>
        </FormControl>
        <Button variant="auth" size="lg" onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </HStack>
      <Divider my="2rem" />
      {listGift.map((_, index) => (
        <FormControl key={index} isRequired mb="2rem">
          <FormLabel>Quà {index + 1}</FormLabel>
          <GiftAdd
            id={index}
            onChange={handleAddGift}
            onClickScript={handleClickAddScript}
          />
        </FormControl>
      ))}
      <Divider my="2rem" />

      <FormControl isRequired mb="1rem">
        <FormLabel>Thao tác nhanh với nhiều quà</FormLabel>
        <FileCustom multiple={true} />
      </FormControl>
    </>
  );
}

function AddNewOdds() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(initialFormStateOdds);

  return (
    <>
      <ModelBase isOpen={isOpen} onClose={onClose} size="6xl">
        <ModelAddOdds />
      </ModelBase>
      <FormControl isRequired mb="1rem">
        <FormLabel>Tỷ lệ</FormLabel>
        <HStack>
          <Select
            variant="auth"
            fontSize="sm"
            fontWeight="500"
            size="lg"
            placeholder="-- Chọn tỷ lệ từ trước --"
          >
            <option value="LUCKY_BOX">--- Tạo mới ---</option>
            <option value="LUCKY_BOX">Mở hộp may mắn</option>
            <option value="LUCKY_CARD">Lật thẻ bài</option>
          </Select>
          <Box>
            <IconButton
              onClick={onOpen}
              size="lg"
              aria-label="Add new"
              icon={<FiPlus />}
            />
          </Box>
        </HStack>
      </FormControl>
    </>
  );
}

function CustomStyle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid
        gap={2}
        templateRows="auto"
        mt="1rem"
        templateAreas={`
          "name_service_image note_service"
          "price_service sale_service"
          "active_service active_service"
          "notification_service notification_service"
          ". ."
          ". ."
          "odds odds"
          "button button"
        `}
      >
        {children}
      </Grid>
    </>
  );
}
