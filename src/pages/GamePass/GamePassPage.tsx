import FormBase from "@/components/global/Form/FormBase";
import { IFormInput } from "@/types/form.type";
import { Box, Divider, Text, useToast } from "@chakra-ui/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { HeadingService } from "../GameList/GameListGlobal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import GameApi from "@/apis/games/gameApi";
import { gamePassApi } from "@/apis/games/gamePassApi";
import { customToast } from "@/utils/const";

const gameApi = new GameApi();

const initialFormState: IFormInput[] = [
  {
    label: "Chọn gói",
    name: "id_parcel",
    type: "SELECT",
    isRequired: true,
    placeholder: "--- Chọn gói ---",
    selects: [],
  },
  {
    label: "TÊN ĐĂNG NHẬP ACC ROBLOX",
    name: "username_roblox",
    type: "INPUT",
    isRequired: true,
    placeholder: "Nhập tên đăng nhập acc roblox của bạn",
  },
  {
    label: "MẬT KHẨU ROLOX",
    name: "password_roblox",
    type: "INPUT",
    isRequired: true,
    placeholder: "Nhập mật khẩu acc roblox của bạn",
  },
  {
    label: "GHI CHÚ THÊM CHO ADMIN",
    name: "note_roblox",
    type: "TEXTAREA",
    placeholder: "Ghi chú",
  },
];

export default function GamePassPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const { slug } = useParams();
  const toast = useToast(customToast);
  const [formState, _] = useState<IFormInput[]>(() =>
    structuredClone(initialFormState)
  );
  useEffect(() => {
    if (slug) {
      gameApi.setSlug(slug);
    }
  }, []);
  const gamePassMutate = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: object }) =>
      gamePassApi.buyGamePass({ slug, data }),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
        status: "success",
      });
    },
  });
  const serviceInfoQuery = useQuery({
    queryKey: ["service", slug],
    queryFn: () => gameApi.getData(),
    enabled: !!slug,
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      // Update select parcel
      const itemToUpdate = formState.find((item) => item.name === "id_parcel");
      if (itemToUpdate) {
        itemToUpdate.selects = data.data.parcels.map((item) => {
          return {
            label: item.text,
            value: item.id,
          };
        });
      }
    },
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    slug &&
      gamePassMutate.mutate({
        slug: slug,
        data: { ...data, id_parcel: Number(data.id_parcel) },
      });
  };

  return (
    <>
      <HeadingService
        textBtn="Hướng dẫn"
        linkHistory="/profile/history/withdraw"
        notification={
          <Box
            dangerouslySetInnerHTML={{
              __html: serviceInfoQuery.data?.data.data.notification ?? "",
            }}
          />
        }
      >
        {serviceInfoQuery.data?.data.data.service_image.name}
      </HeadingService>

      <Text color="red">Vui lòng đọc kĩ hướng dẫn trước khi giao dịch</Text>
      <Text color="red">
        CỐ TÌNH ĐIỀN SAI THÔNG TIN NHIỀU LẦN HOẶC CHƯA TẮT XÁC MINH 2 BƯỚC CÓ
        THỂ SẼ DẪN ĐẾN MẤT TIỀN
      </Text>
      <Divider my="1rem" borderColor="main.item3" />
      <FormBase
        dataForm={formState}
        onSubmit={onSubmit}
        textBtn="Mua ngay"
        isLoading={gamePassMutate.isLoading}
      />
    </>
  );
}
