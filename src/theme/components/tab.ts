import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
    tab: {
        color: "gray.400",
        textTransform: "uppercase",
        fontWeight: "bold",
        _selected: {
            color: "main.item",
            borderColor: "red",
        }
    },
    indicator: {
        backgroundColor: "main.item",
    },
    tabpanel: {
        padding: "0"
    },
})

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle })