import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import {
  Box,
  Button,
  Checkbox,
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
  Textarea,
  VStack,
  useDisclosure,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Collapse,
  SimpleGrid,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import {
  IGiftAdd,
  IOddsAdd,
  IOddsItem,
  IServiceMutation,
  IServiceType,
} from "@/types/service.type";
import { Link, useParams } from "react-router-dom";
import { FiPlus, FiSlack, FiTool, FiUser, FiUsers, FiX } from "react-icons/fi";
import InputTag from "@/components/globals/Form/InputTag";
import ModelBase from "@/components/globals/Model/ModelBase";
import { FileCustomRHF } from "@/components/globals/Form/FileCustom";
import InputNumberCustom from "@/components/globals/Form/InputNumberCustom";
import InputExcept from "@/components/globals/Form/InputExcept";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceApi, serviceGroupApi, serviceOddsApi } from "@/apis/service";
import { objectToFormData } from "@/utils/function";
import { handleImageByService, initialFormState } from "@/utils/service";

const initialFormStateGifts: IGiftAdd = {
  image: {} as File,
  isRandom: false,
  isVip: true,
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

type IFormField = {
  public_form?: IFormInput[],
  private_form?: IFormInput[]
}

export default function CUServicePage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id, idDetail } = useParams();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const [dataDomainExcept, setDataDomainExcept] =
    useState<Array<string | number>>();
  const [dataFormState, setDataFormState] = useState<IFormInput[]>(() =>
    structuredClone(initialFormState)
  );
  const [typeService, setTypeService] = useState<string>("");
  const [dataOdds, setDataOdds] = useState<IOddsAdd>();
  const [except, setExcept] = useState<boolean>(true);
  const [idTypeOdds, setIdTypeOdds] = useState<number>(0);
  const [idGroup, setIdGroup] = useState<number>();
  const [formFields, setFormFields] = useState<IFormField>({ public_form: [], private_form: [] });
  const [isFormSectionOpen, setIsFormSectionOpen] = useState<boolean>(false);

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
  const groupListQuery = useQuery({
    queryKey: ["service-group-all"],
    queryFn: () => serviceGroupApi.list({ page: 0, filter: { limit: 0 } }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const serviceDetail = useQuery({
    queryKey: ["service-detail", id],
    queryFn: () => serviceApi.get(Number(id), Number(idDetail)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      handleChangeService(data.data.game_list.game_key);
      setIdGroup(data.data.service_detail.service_group_id);
      setExcept(data.data.service_detail.excluding === "ON");
      setDataDomainExcept(
        data.data.service_detail.shop_list?.map((shopObj) => shopObj.domain)
      );
      if (data.data.service_detail.service_odds_id !== 0) {
        setIdTypeOdds(data.data.service_detail.service_odds_id);
      }

      setFormFields(({
        ...(data.data.private_form && { private_form: data.data.private_form }),
        ...(data.data.public_form && { public_form: data.data.public_form }),
      }));

      setFormValue({
        private_form: data.data.private_form,
        public_form: data.data.public_form,
        name_service_image: data.data.service_detail.service_image?.name,
        note_service: data.data.note,
        price_service: data.data.price,
        sale_service: data.data.sale,
        prioritize: data.data.service_detail.prioritize,
        active_service: data.data.active === "ON",
        notification_service: data.data.notification,
        thumb_service_image: [data.data.service_detail.service_image?.thumb],
        currency: data.data.currency?.id,
        image_1: [
          JSON.parse(data.data.service_detail.service_image?.images ?? "")
            .image_1,
        ],
        image_2: [
          JSON.parse(data.data.service_detail.service_image?.images ?? "")
            .image_2,
        ],
        image_3: [
          JSON.parse(data.data.service_detail.service_image?.images ?? "")
            .image_3,
        ],
      });
      if (data.data.game_list.game_key === "LINKTO") {
        setFormValue((prev) => {
          return {
            ...prev,
            link_to: data.data.information.link_to,
          };
        });
      }
    },
  });
  /****----------------
  *      END-HOOK
  ----------------****/

  /****----------------
   *      Handle
  ----------------****/
  const handleChangeService = (value: string) => {
    setTypeService(value);
    setDataFormState([...initialFormState, ...handleImageByService(value)]);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = new FormData();
    const form = {
      idService: id ?? null,
      idServiceDetail: idDetail ?? null,
      idGroup: idGroup,
      dataForm: {
        ...data,
        private_form: formFields.private_form,
        public_form: formFields.public_form
      },
      dataOdds: dataOdds ?? null,
      typeService: typeService,
      dataExcept: dataDomainExcept,
      idTypeOdds: idTypeOdds ?? 0,
      except: except,
    };
    objectToFormData(formData, form);
    serviceMutation.mutate({
      formData,
      data: JSON.stringify(form),
    });
  };

  const addField = (type: 'private_form' | 'public_form') => {
    const newField: IFormInput = { label: '', name: '', type: 'INPUT' };
    setFormFields(prev => ({
      ...prev,
      [type]: [...(prev[type] ?? []), newField],
    }));
  };

  const removeField = (type: 'private_form' | 'public_form', index: number) => {
    setFormFields(prev => ({
      ...prev,
      [type]: (prev[type] ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (
    type: 'private_form' | 'public_form',
    index: number,
    updatedField: IFormInput
  ) => {
    setFormFields(prev => ({
      ...prev,
      [type]: (prev[type] ?? []).map((field, i) =>
        i === index ? updatedField : field
      ),
    }));
  };

  /****----------------
   *      END-Handle
  ----------------****/
  return (
    <>
      <CardCollection
        title={
          id
            ? `Chỉnh sửa dịch vụ #${id} ` + typeService
            : "Tạo mới dịch vụ " + typeService
        }
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
          <FormLabel>Nhóm dịch vụ</FormLabel>
          <Select
            variant="auth"
            onChange={(e) => setIdGroup(Number(e.target.value))}
            value={idGroup ?? ""}
            placeholder="-- Chọn nhóm dịch vụ --"
          >
            {groupListQuery.data?.data.data.map((vl) => (
              <option key={vl.id} value={vl.id}>
                {vl.name} | Kích hoạt: {vl.active}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired mb="1rem">
          <FormLabel>Chọn loại dịch vụ</FormLabel>
          <Select
            variant="auth"
            placeholder="Loại Chọn loại dịch vụ"
            onChange={(e) => handleChangeService(e.target.value)}
            value={typeService ?? ""}
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
        {serviceDetail.data?.data.data.is_form && (
          <FormControl mb="1rem">
            <FormLabel>Form hiển thị</FormLabel>
            <Button size="sm" mb={2} onClick={() => setIsFormSectionOpen(prev => !prev)}>
              {isFormSectionOpen ? 'Ẩn thiết lập Form' : 'Hiển thị thiết lập Form'}
            </Button>
            <Collapse in={isFormSectionOpen} animateOpacity>
              <Tabs>
                <TabList>
                  <Tab>Private Form</Tab>
                  <Tab>Public Form</Tab>
                  <Tab>JSON</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={3} mt={2}>
                      {formFields.private_form?.map((field, index) => (
                        <FieldConfigurator
                          key={index}
                          field={field}
                          onChange={(updated) => handleFieldChange('private_form', index, updated)}
                          onRemove={() => removeField('private_form', index)}
                        />
                      ))}
                    </SimpleGrid>
                    <Button onClick={() => addField('private_form')}>Thêm trường Private</Button>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={3} mt={2}>
                      {formFields.public_form?.map((field, index) => (
                        <FieldConfigurator
                          key={index}
                          field={field}
                          onChange={(updated) => handleFieldChange('public_form', index, updated)}
                          onRemove={() => removeField('public_form', index)}
                        />
                      ))}
                    </SimpleGrid>
                    <Button onClick={() => addField('public_form')}>Thêm trường Public</Button>
                  </TabPanel>
                  <TabPanel>
                    <VStack mt={2}>
                      <Textarea
                        placeholder="JSON FormFields"
                        rows={8}
                        value={JSON.stringify(formFields, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setFormFields(parsed);
                          } catch { /* ignore invalid JSON */ }
                        }}
                      />
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Collapse>
          </FormControl>
        )}
        <InputExcept
          except={except}
          setExcept={setExcept}
          data={dataDomainExcept}
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
            isSubmitCustom={serviceMutation.isLoading}
            dataDefault={formValue}
            dataForm={dataFormState}
            textBtn={id ? "Cập nhật" : "Thêm mới"}
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
      (value: string | boolean | Array<string | number | object> | File | number) => {
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
    []
  );

  const handleChangeFileImage = (data: (string | File)[]) => {
    if (data.length > 0) {
      handleChangeCustom("image")(data[0]);
    }
  };

  useEffect(() => {
    onChange(formState, id);
    handleChangeCustom("message")(
      typeof formState.value !== "object" ? formState.value : ""
    );
  }, [formState]);
  useEffect(() => {
    handleChangeCustom("typeGift")(giftType);
  }, [giftType]);

  return (
    <>
      <HStack spacing="1rem">
        <FileCustomRHF
          value={null}
          multiple={false}
          onChange={handleChangeFileImage}
        />
        <VStack flexDirection="column" flex={1}>
          <FormControl isRequired mb="1rem">
            <HStack justifyContent="space-between">
              <FormLabel>Loại quà</FormLabel>
              <HStack mb={2}>
                <Text fontWeight="bold">
                  VIP(Chỉ admin mới có thể quay trúng quà VIP)
                </Text>
                <Switch
                  onChange={handleChange("isVip")}
                  defaultChecked={true}
                />
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
                <InputTag parseInput={(s) => s.trim() || null} limit={2} onChange={handleChangeCustom("value")} />
              ) : (
                <Input onChange={handleChange("value")} variant="auth" />
              )}
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
  initialData
}: {
  onClose: () => void;
  onChange: (data: IOddsAdd) => void;
  initialData?: IOddsAdd;
}) {
  const [listGift, setListGift] = useState<Array<IGiftAdd>>(initialData?.listGift || []);
  const [giftType, setGiftType] = useState<string>(initialData?.listGift?.[0]?.typeGift || "");
  const [formState, setFormState] = useState<IOddsAdd>(() => {
    return initialData || structuredClone(initialFormStateOdds);
  });

  useEffect(() => {
    if (initialData) {
      // Ensure formState is properly updated with initialData
      setFormState(initialData);
      
      // Update the gift list
      if (initialData.listGift?.length) {
        setListGift([...initialData.listGift]);
        
        // Set gift type from the first gift if available
        if (initialData.listGift[0]?.typeGift) {
          setGiftType(initialData.listGift[0].typeGift);
        }
      }
    }
  }, [initialData]);

  const handleChangeNumberGifts = (countGift: number) => {
    let countGiftNew = Number(countGift);
    // Keep existing gifts when increasing count
    if (listGift.length < countGiftNew) {
      const newGifts = new Array(countGiftNew - listGift.length)
        .fill(null)
        .map(() => ({
          ...structuredClone(initialFormStateGifts),
          typeGift: giftType as IGiftAdd['typeGift']
        }));
      
      const updatedGifts = [...listGift, ...newGifts];
      setListGift(updatedGifts);
      
      // Update formState.listGift to match
      setFormState(prev => ({
        ...prev,
        listGift: updatedGifts
      }));
      return;
    }
    
    // When reducing count, keep as many existing gifts as possible
    const updatedGifts = listGift.slice(0, countGiftNew);
    setListGift(updatedGifts);
    
    // Update formState.listGift to match
    setFormState(prev => ({
      ...prev,
      listGift: updatedGifts
    }));
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
    const updatedListGift = [...formState.listGift];
    updatedListGift[id] = {
      ...data,
      typeGift: giftType as IGiftAdd['typeGift']
    };
    
    setFormState(prev => ({
      ...prev,
      listGift: updatedListGift
    }));
  };

  const handleSubmit = () => {
    // Ensure all gifts have the correct type before submitting
    const finalFormState = {
      ...formState,
      listGift: formState.listGift.map(gift => ({
        ...gift,
        typeGift: giftType as IGiftAdd['typeGift']
      }))
    };
    onChange(finalFormState);
    onClose();
  };

  const handleClickAddScript = (id: number, type: "ADMIN" | "USER") => {
    const newItem: IOddsItem = {
      id,
      description: formState.listGift[id]?.message || formState.listGift[id]?.value?.toString() || "",
    };
    // ADMIN
    if (type === "ADMIN") {
      handleChangeOddsAdmin(newItem);
      return;
    }

    // USER
    handleChangeOddsUser(newItem);
  };

  const handleChangeOddsAdmin = (newItem?: IOddsItem, defaultValue?: IOddsItem[]) => {
    setFormState((prev) => {
      const base = defaultValue ?? prev.oddsAdmin;
      const updated = newItem ? [...base, newItem] : base;

      return {
        ...prev,
        oddsAdmin: updated,
      };
    });
  }

  const handleChangeOddsUser = (newItem?: IOddsItem, defaultValue?: Array<IOddsItem>) => {
    setFormState((prev) => {
      const base = defaultValue ?? prev.oddsUser;
      const updated = newItem ? [...base, newItem] : base;

      return {
        ...prev,
        oddsUser: updated,
      };
    });
  }

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
          values={formState.oddsAdmin}
          getDisplayValue={e => e.description}
          onChange={(gifts) => handleChangeOddsAdmin(undefined, gifts)}
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
          values={formState.oddsUser}
          getDisplayValue={e => e.description}
          onChange={(gifts) => handleChangeOddsUser(undefined, gifts)}
        />
      </FormControl>

      <HStack>
        <FormControl isRequired mb="1rem">
          <FormLabel>Số lượng quà</FormLabel>
          <InputNumberCustom
            handleChange={handleChangeNumberGifts}
            defaultValue={listGift.length}
            value={listGift.length}
            min={1}
            max={100}
          />
        </FormControl>
        <FormControl mb="1rem">
          <FormLabel>Loại quà</FormLabel>
          <Select
            value={giftType}
            onChange={(e) => {
              const newType = e.target.value;
              setGiftType(newType);
              
              // Update all gifts with the new type
              const updatedGifts = listGift.map(gift => ({
                ...gift,
                typeGift: newType as IGiftAdd['typeGift']
              }));
              
              setListGift(updatedGifts);
              setFormState(prev => ({
                ...prev,
                listGift: updatedGifts
              }));
            }}
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
        {/* <FileCustom multiple={true} /> */}
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
  const [oddsData, setOddsData] = useState<IOddsAdd | undefined>();

  const handleOddsChange = (data: IOddsAdd) => {
    setOddsData(data);
    onChange(data);
  };

  const oddsAll = useQuery({
    queryKey: ["odds-all"],
    queryFn: () => serviceOddsApi.list({ page: 0, filter: { limit: 0 } }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <ModelBase isOpen={isOpen} onClose={onClose} size="6xl">
        <ModelAddOdds
          onClose={onClose}
          onChange={handleOddsChange}
          initialData={oddsData}
        />
      </ModelBase>
      <FormControl isRequired mb="1rem">
        <FormLabel>Tỷ lệ</FormLabel>
        <HStack>
          <Select
            variant="auth"
            value={idTypeOdds ?? ""}
            onChange={(e) => setIdTypeOdds(Number(e.target.value))}
          >
            <option value="0"> --- Tạo mới tỷ lệ --- </option>
            {oddsAll.data?.data.data.map((odd) => (
              <option key={odd.id} value={odd.id}>
                {odd.note ?? "Chưa đặt tên #" + odd.id}
              </option>
            ))}
          </Select>
          {idTypeOdds === 0 && (
            <IconButton
              onClick={onOpen}
              size="lg"
              aria-label="Add new"
              icon={idTypeOdds ? <FiTool /> : <FiPlus />}
            />
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
          "active_service prioritize"
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

type FieldConfiguratorProps = {
  field: IFormInput;
  onChange: (updatedField: IFormInput) => void;
  onRemove: () => void;
}

const FieldConfigurator: React.FC<FieldConfiguratorProps> = ({ field, onChange, onRemove }) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...field, type: e.target.value as IFormInput['type'] });
  };

  const handleInputChange = (property: keyof IFormInput, value: any) => {
    onChange({ ...field, [property]: value });
  };

  return (
    <Box position="relative" p={4} mb={4}>
      <IconButton aria-label="Remove field" top={0} right={0} zIndex={10} position="absolute" variant="ghost" icon={<FiX />} onClick={onRemove} />
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select value={field.type} onChange={handleTypeChange}>
          <option value="SELECT">SELECT</option>
          <option value="INPUT">INPUT</option>
          <option value="TEXTAREA">TEXTAREA</option>
          <option value="NUMBER">NUMBER</option>
          <option value="FILE">FILE</option>
          <option value="SWITCH">SWITCH</option>
          <option value="HTML">HTML</option>
          <option value="DATE">DATE</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={field.name} onChange={(e) => handleInputChange('name', e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Label</FormLabel>
        <Input value={field.label} onChange={(e) => handleInputChange('label', e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Placeholder</FormLabel>
        <Input value={field.placeholder ?? ''} onChange={(e) => handleInputChange('placeholder', e.target.value || undefined)} />
      </FormControl>
      <FormControl>
        <FormLabel>Grid Area Name</FormLabel>
        <Input value={field.gridAreaName ?? ''} onChange={(e) => handleInputChange('gridAreaName', e.target.value || undefined)} />
      </FormControl>
      <FormControl>
        <Checkbox isChecked={field.isRequired ?? false} onChange={(e) => handleInputChange('isRequired', e.target.checked)}>
          Is Required
        </Checkbox>
      </FormControl>
      {field.type === 'SELECT' && (
        <Box mt={4}>
          <Text>Options</Text>
          {(field.selects || []).map((option, index) => (
            <HStack key={index} mb={2}>
              <Input
                placeholder="Label"
                value={option.label}
                onChange={(e) => {
                  const newSelects = [...(field.selects || [])];
                  newSelects[index].label = e.target.value;
                  handleInputChange('selects', newSelects);
                }}
              />
              <Input
                placeholder="Value"
                value={option.value}
                onChange={(e) => {
                  const newSelects = [...(field.selects || [])];
                  newSelects[index].value = e.target.value;
                  handleInputChange('selects', newSelects);
                }}
              />
              <IconButton aria-label="Remove options" icon={<FiX />} onClick={() => {
                const newSelects = field.selects?.filter((_, i) => i !== index) || [];
                handleInputChange('selects', newSelects);
              }} />
            </HStack>
          ))}
          <Button onClick={() => {
            handleInputChange('selects', [...(field.selects || []), { label: '', value: '' }]);
          }}>Add Option</Button>
        </Box>
      )}
    </Box>
  );
};
