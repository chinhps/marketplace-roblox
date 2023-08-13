import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const outline = defineStyle({
    border: '2px dashed',
    borderRadius: '7px',
})

export const textareaTheme = defineStyleConfig({
    variants: { outline },
})