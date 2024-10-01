export const passwordValidate = {
    required: "Mật khẩu là bắt buộc",
    minLength: {
        value: 8,
        message: "Mật khẩu phải có ít nhất 8 ký tự",
    },
    pattern: {
        value: /^(?=.*\d).{8,}$/,
        message: "Mật khẩu phải chứa ít nhất 1 số",
    },
}