import { useState } from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface ISelectCustom {
  defaultOption: string;
  options: Array<string>;
  onChange: (option: string) => void;
}

export default function SelectCustom({
  defaultOption,
  options,
  onChange,
}: ISelectCustom) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
        {selectedOption}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
