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
import React, { useCallback, useEffect, useState } from "react";
import {
  IGiftAdd,
  IOddsAdd,
  IServiceMutation,
  IServiceType,
} from "@/types/service.type";
import { Link } from "react-router-dom";
import { FiPlus, FiSlack, FiUser, FiUsers } from "react-icons/fi";
import InputTag from "@/components/globals/Form/InputTag";
import ModelBase from "@/components/globals/Model/ModelBase";
import FileCustom from "@/components/globals/Form/FileCustom";
import InputNumberCustom from "@/components/globals/Form/InputNumberCustom";
import InputExcept from "@/components/globals/Form/InputExcept";
import { useMutation } from "@tanstack/react-query";
import { serviceApi } from "@/apis/service";
import { objectToFormData } from "@/utils/function";
import { handleImageByService, initialFormState } from "@/utils/service";

const initialFormStateGifts: IGiftAdd = {
  image: {} as File,
  isRandom: false,
  isVip: false,
  message: "",
  percent: 0,
  typeGift: "NOT",
  value: 0,
};
const initialFormStateOdds: IOddsAdd = {
  isRandomAdmin: false,
  isRandomUser: false,
  oddsAdmin: [],
  oddsUser: [],
  listGift: [],
};

export default function CUServicePage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [dataDomainExcept, setDataDomainExcept] =
    useState<Array<string | number>>();
  const [dataFormState, setDataFormState] = useState<IFormInput[]>(() =>
    structuredClone(initialFormState)
  );
  const [typeService, setTypeService] = useState<string>("");
  const [dataOdds, setDataOdds] = useState<IOddsAdd>();
  const [except, setExcept] = useState<boolean>(true);
  const [idTypeOdds, setIdTypeOdds] = useState<number>(0);

  const serviceMutation = useMutation({
    mutationFn: ({ formData, data }: IServiceMutation) =>
      serviceApi.create({ formData, data }),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });
  /****----------------
  *      END-HOOK
  ----------------****/

  /****----------------
   *      Handle
  ----------------****/
  const handleChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeService(e.target.value);
    setDataFormState([
      ...initialFormState,
      ...handleImageByService(e.target.value),
    ]);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = new FormData();
    const form = {
      dataForm: data,
      dataOdds: dataOdds ?? null,
      typeService: typeService,
      dataExcept: dataDomainExcept,
      idTypeOdds: idTypeOdds,
      except: except,
    };
    objectToFormData(formData, form);
    serviceMutation.mutate({
      formData,
      data: JSON.stringify(form),
    });
  };
  /****----------------
   *      END-Handle
  ----------------****/
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

        <InputExcept
          except={except}
          setExcept={setExcept}
          onChange={(data) => setDataDomainExcept(data)}
        />

        {(typeService === IServiceType.LUCKY_BOX ||
          typeService === IServiceType.LUCKY_CARD ||
          typeService === IServiceType.WHEEL) && (
          <AddNewOdds
            onChange={(data) => setDataOdds(data)}
            idTypeOdds={idTypeOdds}
            setIdTypeOdds={setIdTypeOdds}
          />
        )}

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

function GiftAdd({
  onChange,
  onClickScript,
  id,
  giftType,
}: {
  onChange: (data: IGiftAdd, id: number) => void;
  onClickScript: (id: number, type: "ADMIN" | "USER") => void;
  id: number;
  giftType: string;
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
      (value: string | boolean | Array<string | number> | File | number) => {
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
    []
  );

  const handleChangeFileImage = (data: File[]) => {
    if (data.length > 0) {
      handleChangeCustom("image")(data[0]);
    }
  };

  useEffect(() => {
    onChange(formState, id);
  }, [formState]);

  return (
    <>
      <HStack spacing="1rem">
        <FileCustom multiple={false} onChange={handleChangeFileImage} />
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
                placeholder="-- Chọn loại quà --"
                defaultValue={giftType}
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
                <Input onChange={handleChange("value")} variant="auth" />
              )}
            </FormControl>
            <FormControl isRequired mb="1rem">
              <FormLabel>Note</FormLabel>
              <Input
                value={
                  typeof formState.value !== "object" ? formState.value : ""
                }
                onChange={handleChange("message")}
                variant="auth"
              />
            </FormControl>
            <FormControl isRequired mb="1rem">
              <FormLabel>Tỷ lệ (%)</FormLabel>
              <InputNumberCustom
                handleChange={handleChangeCustom("percent")}
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

function ModelAddOdds({
  onClose,
  onChange,
}: {
  onClose: () => void;
  onChange: (data: IOddsAdd) => void;
}) {
  const [listGift, setListGift] = useState<Array<IGiftAdd>>([]);
  const [giftType, setGiftType] = useState<string>("");
  const [formState, setFormState] = useState<IOddsAdd>(() => {
    const temp = structuredClone(initialFormStateOdds);
    return temp;
  });

  const handleChangeNumberGifts = (countGift: number) => {
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
    onChange(formState);
    onClose();
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
        oddsAdmin: [...prev.oddsAdmin],
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
      oddsUser: [...prev.oddsUser],
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
          <InputNumberCustom
            handleChange={handleChangeNumberGifts}
            defaultValue={0}
            value={listGift.length}
            min={1}
            max={100}
          />
        </FormControl>
        <FormControl mb="1rem">
          <FormLabel>Loại quà</FormLabel>
          <Select
            onChange={(e) => setGiftType(e.target.value)}
            variant="auth"
            placeholder="-- Chọn loại quà --"
          >
            <option value="NOT">Không có</option>
            <option value="DIAMOND">Kim cương</option>
            <option value="ROBUX">Robux</option>
            <option value="QUANHUY">Quân huy</option>
          </Select>
        </FormControl>
        <Button w="100%" variant="auth" size="lg" onClick={handleSubmit} mt={4}>
          Hoàn thành
        </Button>
      </HStack>
      <Divider my="2rem" />
      {listGift.map((_, index) => (
        <FormControl key={index} isRequired mb="2rem">
          <FormLabel>Quà {index + 1}</FormLabel>
          <GiftAdd
            id={index}
            giftType={giftType}
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

function AddNewOdds({
  onChange,
  idTypeOdds,
  setIdTypeOdds,
}: {
  onChange: (data: IOddsAdd) => void;
  idTypeOdds: number;
  setIdTypeOdds: (data: number) => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ModelBase isOpen={isOpen} onClose={onClose} size="6xl">
        <ModelAddOdds onClose={onClose} onChange={onChange} />
      </ModelBase>
      <FormControl isRequired mb="1rem">
        <FormLabel>Tỷ lệ</FormLabel>
        <HStack>
          <Select
            onChange={(e) => setIdTypeOdds(Number(e.target.value))}
            variant="auth"
            fontSize="sm"
            fontWeight="500"
            size="lg"
          >
            <option value="0"> --- Tạo mới tỷ lệ --- </option>
          </Select>
          {idTypeOdds === 0 && (
            <Box>
              <IconButton
                onClick={onOpen}
                size="lg"
                aria-label="Add new"
                icon={<FiPlus />}
              />
            </Box>
          )}
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
