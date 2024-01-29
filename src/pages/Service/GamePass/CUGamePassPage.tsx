import CardCollection from "@/components/globals/CardCollection";
import FormBase from "@/components/globals/FormBase";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { gamePassApi, serviceApi, serviceGroupApi } from "@/apis/service";
import { IFormInput } from "@/types/form.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { objectToFormData } from "@/utils/function";
import InputExcept from "@/components/globals/Form/InputExcept";

const initialFormState: IFormInput[] = [
  {
    label: "Tên hiển thị",
    name: "name_gamepass",
    type: "INPUT",
    isRequired: true,
    placeholder: "Tên hiển thị ra cho người dùng xem",
  },
  {
    label: "Chọn kích hoạt",
    name: "active",
    type: "SELECT",
    isRequired: true,
    selects: [
      {
        label: "Kích hoạt",
        value: "ON",
      },
      {
        label: "Hủy kích hoạt",
        value: "OFF",
      },
    ],
  },
  {
    label: "Thông tin gói",
    name: "parcels",
    type: "TEXTAREA",
    isRequired: true,
    placeholder: "Tên gói | Giá gói | Cost Robux",
  },
  {
    label: "Hướng dẫn rút",
    name: "exemple",
    type: "HTML",
    isRequired: true,
    placeholder: "Hướng dẫn rút cho người dùng",
  },
  {
    label: "Ảnh đại diện",
    name: "image",
    type: "FILE",
    isRequired: true,
  },
];

export default function CUGamePassPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { id, idDetail } = useParams();
  const toast = useToast();
  const [except, setExcept] = useState<boolean>(true);
  const [dataDomainExcept, setDataDomainExcept] =
    useState<Array<string | number>>();
  const [formState, _] = useState<IFormInput[]>(() =>
    structuredClone(initialFormState)
  );
  const [formValue, setFormValue] = useState({});
  const [idGroup, setIdGroup] = useState<number>();
  const [idOdds, setIdOdds] = useState<number>();

  const gamePassMutation = useMutation({
    mutationFn: (dataForm: FormData) => gamePassApi.create(dataForm),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      gamepassQuery.refetch();
    },
  });
  const groupListQuery = useQuery({
    queryKey: ["service-group-all"],
    queryFn: () => serviceGroupApi.list({ page: 0, filter: { limit: 0 } }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const gamepassQuery = useQuery({
    queryKey: ["game-pass-detail", id, idDetail],
    queryFn: () => serviceApi.get(Number(id), Number(idDetail)),
    cacheTime: 5 * 1000,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setExcept(data.data.service_detail.excluding === "ON");
      setIdGroup(data.data.service_detail.service_group_id);
      setIdOdds(data.data.service_detail.service_odds_id);
      setDataDomainExcept(
        data.data.service_detail.shop_list?.map((shopObj) => shopObj.domain)
      );
      setFormValue({
        name_gamepass: data.data.service_detail.service_image?.name,
        active: data.data.active,
        exemple: data.data.notification,
        parcels: data.data.service_detail.service_odds?.service_gifts
          .map(
            (gift) =>
              `${gift.text_custom}|${gift.value1}|${gift.cost}|${gift.id}\n`
          )
          .join(""),
        image: [data.data.service_detail.service_image?.thumb],
      });
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    objectToFormData(formData, {
      id: id ?? "",
      dataDomainExcept,
      idGroup: idGroup,
      idServiceDetail: idDetail ?? null,
      idOdds: idOdds,
      except,
      ...data,
    });
    gamePassMutation.mutate(formData);
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa Game Pass #${id}` : "Tạo mới Game Pass"}
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
          >
            {groupListQuery.data?.data.data.map((vl) => (
              <option key={vl.id} value={vl.id}>
                {vl.name} | Kích hoạt: {vl.active}
              </option>
            ))}
          </Select>
        </FormControl>
        <InputExcept
          except={except}
          setExcept={setExcept}
          onChange={(data) => setDataDomainExcept(data)}
        />

        <FormBase
          dataForm={formState}
          dataDefault={formValue}
          textBtn={id ? "Cập nhật" : "Thêm mới"}
          onSubmit={onSubmit}
        />
      </CardCollection>
    </>
  );
}
