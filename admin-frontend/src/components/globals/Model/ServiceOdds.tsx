import { IGiftAdd, IOddsAdd, IOddsItem } from "@/types/service.type";
import { Button, Divider, FormControl, FormLabel, HStack, IconButton, Input, Select, Switch, Text, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputTag from "../Form/InputTag";
import InputNumberCustom from "../Form/InputNumberCustom";
import { FileCustomRHF } from "../Form/FileCustom";
import { FiSlack, FiUser, FiUsers } from "react-icons/fi";

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
    console.log('formState', 'hehe');
    useEffect(() => {
        console.log('initialData', initialData)
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
        let updatedGifts: IGiftAdd[];
    
        if (listGift.length < countGiftNew) {
            const newGifts = new Array(countGiftNew - listGift.length)
                .fill(null)
                .map(() => ({
                    ...structuredClone(initialFormStateGifts),
                    typeGift: giftType as IGiftAdd['typeGift']
                }));
            updatedGifts = [...listGift, ...newGifts];
        } else if (listGift.length > countGiftNew) {
            updatedGifts = listGift.slice(0, countGiftNew);
        } else {
            return;
        }
    
        setListGift(updatedGifts);
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
            {listGift.map((gift, index) => (
                <FormControl key={index} isRequired mb="2rem">
                    <FormLabel>Quà {index + 1}</FormLabel>
                    <GiftAdd
                        id={index}
                        gift={gift}
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

const GiftAdd = React.memo(function GiftAdd({
    onChange,
    onClickScript,
    id,
    giftType,
    gift
}: {
    onChange: (data: IGiftAdd, id: number) => void;
    onClickScript: (id: number, type: "ADMIN" | "USER") => void;
    id: number;
    giftType: string;
    gift: IGiftAdd;
}) {
    const [isRandom, setIsRandom] = useState<boolean>(false);
    const [formState, setFormState] = useState<IGiftAdd>(gift ?? initialFormStateGifts);
    const prevFormState = useRef(formState);
    const handleChange = useCallback(
        (name: keyof IGiftAdd) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const target = event.target;
            const value = target.type === "checkbox" ? target.checked : target.value;
            setFormState((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleChangeCustom = useCallback(
        (name: keyof IGiftAdd) => (value: string | boolean | Array<string | number | object> | File | number) => {
            setFormState((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleChangeFileImage = (data: (string | File)[]) => {
        if (data.length > 0) {
            handleChangeCustom("image")(data[0]);
        }
    };

    useEffect(() => {
        const { message, ...rest } = formState;
        const { message: prevMessage, ...prevRest } = prevFormState.current;
        if (JSON.stringify(rest) !== JSON.stringify(prevRest)) {
            onChange(formState, id);
            prevFormState.current = { ...formState };
        }
    }, [formState, id, onChange]);

    useEffect(() => {
        handleChangeCustom("message")(
            typeof formState.value !== "object" ? formState.value : ""
        );
    }, [formState.value, handleChangeCustom]);

    useEffect(() => {
        handleChangeCustom("typeGift")(giftType);
    }, [giftType]);

    return (
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
    );
});

export default React.memo(ModelAddOdds);