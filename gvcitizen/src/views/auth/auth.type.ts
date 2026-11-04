export interface LoginFormValues {
    identifier: string
    password: string
    rememberMe: boolean
}

export interface RegisterFormValues {
    name: string
    phone: string
    email: string
    address: string
    password: string
    confirmPassword: string
    agreeTerms: boolean
}

export interface ForgotPasswordFormValues {
    phone: string
    otp: string[]
    newPassword: string
    confirmPassword: string
}

export type PasswordStrength = "none" | "weak" | "medium" | "strong"
