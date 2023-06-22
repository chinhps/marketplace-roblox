import { GameSelectNumloop } from "@/types/service.type";
import { numberFormat } from "@/utils/price";
import { Select } from "@chakra-ui/react";

export default function SelectNumloop({
  service_price,
  register,
  hidden,
}: GameSelectNumloop) {
  return (
    <Select
      display={hidden ? "none" : "block"}
      w="300px"
      variant="auth"
      fontSize="sm"
      ms={{ base: "0px", md: "0px" }}
      mb="24px"
      border="solid 1px"
      borderColor="red.200"
      fontWeight="500"
      size="lg"
      {...register("numrolllop", { required: "Bạn cần chọn số lần quay" })}
    >
      <option value="1">
        Chơi 1 lần - Giá {numberFormat(service_price * 1)}
      </option>
      <option value="2">
        Chơi 3 lần - Giá {numberFormat(service_price * 3)}
      </option>
      <option value="3">
        Chơi 5 lần - Giá {numberFormat(service_price * 5)}
      </option>
      <option value="4">
        Chơi 7 lần - Giá {numberFormat(service_price * 7)}
      </option>
      <option value="5">
        Chơi 10 lần - Giá {numberFormat(service_price * 10)}
      </option>
    </Select>
  );
}
