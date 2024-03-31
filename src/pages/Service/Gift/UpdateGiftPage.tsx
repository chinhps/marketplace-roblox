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
import { gamePassApi, serviceGroupApi, serviceOddsApi } from "@/apis/service";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { objectToFormData } from "@/utils/function";

export default function UpdateGiftPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const [idOdds, setIdOdds] = useState<number>();

  const gamePassMutation = useMutation({
    mutationFn: (dataForm: FormData) => gamePassApi.create(dataForm),
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
  });

  const oddsDetailQuery = useQuery({
    queryKey: ["odds-detail", idOdds],
    queryFn: () => serviceOddsApi.get(idOdds ?? 0),
    cacheTime: 5 * 1000,
    retry: false,
    enabled: !!idOdds,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {},
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
    gamePassMutation.mutate(formData);
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
                123
              </option>
            ))}
          </Select>
        </FormControl>
      </CardCollection>
    </>
  );
}
