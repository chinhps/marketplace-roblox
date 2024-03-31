import CardCollection from "@/components/globals/CardCollection";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { serviceOddsApi } from "@/apis/service";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { objectToFormData } from "@/utils/function";
import FormBase from "@/components/globals/FormBase";
import { IFormInput } from "@/types/form.type";

export default function UpdateGiftPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [formInit, setFormInit] = useState<Array<IFormInput>>([]);
  const [idOdds, setIdOdds] = useState<number>();

  const giftsMutation = useMutation({
    mutationFn: (dataForm: FormData) => serviceOddsApi.create(dataForm),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      oddsDetailQuery.refetch();
    },
  });

  const oddsListQuery = useQuery({
    queryKey: ["odds-all"],
    queryFn: () => serviceOddsApi.list({ page: 0, filter: { limit: 0 } }),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setFormInit([]);
    },
  });

  const oddsDetailQuery = useQuery({
    queryKey: ["odds-detail", idOdds],
    queryFn: () => serviceOddsApi.get(idOdds ?? 0),
    cacheTime: 5 * 1000,
    retry: false,
    enabled: !!idOdds,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setFormInit(
        data.data.service_gifts?.map((gift) => {
          return {
            label: gift.text_custom ?? "Không tồn tại",
            name: "gift." + gift.id,
            type: "FILE",
            default: gift.image ?? "",
          };
        }) ?? []
      );
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    objectToFormData(formData, {
      idOdds: idOdds,
      ...data,
    });
    giftsMutation.mutate(formData);
  };

  return (
    <>
      <CardCollection
        title="Cập nhật hình ảnh quà"
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
          <FormLabel>Chọn kịch bản</FormLabel>
          <Select
            variant="auth"
            onChange={(e) => setIdOdds(Number(e.target.value))}
            value={idOdds ?? ""}
          >
            {oddsListQuery.data?.data.data.map((vl) => (
              <option key={vl.id} value={vl.id}>
                #{vl.id} | {vl.service_details?.map((detail) => detail.slug)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormBase
          dataForm={formInit}
          onSubmit={onSubmit}
          textBtn="CẬP NHẬT NGAY"
        />
      </CardCollection>
    </>
  );
}
