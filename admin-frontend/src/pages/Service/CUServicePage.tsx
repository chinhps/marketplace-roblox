import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  IconButton,
  Input,
  Select,
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
import React, { useEffect, useState } from "react";
import {
  IGiftAdd,
  IOddsAdd,
  IServiceMutation,
  IServiceType,
} from "@/types/service.type";
import { Link, useParams } from "react-router-dom";
import { FiPlus, FiTool, FiX } from "react-icons/fi";
import ModelBase from "@/components/globals/Model/ModelBase";
import InputExcept from "@/components/globals/Form/InputExcept";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serviceApi, serviceGroupApi, serviceOddsApi } from "@/apis/service";
import { objectToFormData } from "@/utils/function";
import { handleImageByService, initialFormState } from "@/utils/service";
import { ServiceOdds } from "@/types/response/service.type";
import ModelAddOdds from "@/components/globals/Model/ServiceOdds";

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
              dataOdds={serviceDetail.data?.data.data.service_detail.service_odds}
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

function AddNewOdds({
  dataOdds,
  onChange,
  idTypeOdds,
  setIdTypeOdds,
}: {
  dataOdds?: ServiceOdds | null;
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

  useEffect(() => {
    if (idTypeOdds === 0) {
      setOddsData(undefined);
      return;
    }

    if (dataOdds) {
      const giftTypeMapping: { [key: number]: IGiftAdd["typeGift"] } = {
        1: "ROBUX",
        2: "DIAMOND",
        3: "QUANHUY",
      };
      const transformedData: IOddsAdd = {
        isRandomAdmin: dataOdds.odds_admin_type === "RANDOM",
        isRandomUser: dataOdds.odds_user_type === "RANDOM",
        oddsAdmin: JSON.parse(dataOdds.odds_admin || "[]"),
        oddsUser: JSON.parse(dataOdds.odds_user || "[]"),
        listGift: dataOdds.service_gifts.map((gift: any) => ({
          image: gift.image,
          isRandom: gift.gift_type === "RANDOM",
          isVip: gift.vip === "YES",
          message: gift.text_custom || "",
          percent: gift.percent_random,
          typeGift:
            giftTypeMapping[gift.game_currency_id] || "NOT",
          value:
            gift.gift_type === "RANDOM"
              ? [gift.value1, gift.value2]
              : gift.value1,
        })),
      };
      console.log('transformedData',transformedData)
      setOddsData(transformedData);
    }
  }, [idTypeOdds, oddsAll.data]);
  console.log('oddsData',oddsData)
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
          <IconButton
            onClick={onOpen}
            size="lg"
            aria-label={idTypeOdds ? "Edit" : "Add new"}
            icon={idTypeOdds ? <FiTool /> : <FiPlus />}
          />
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
