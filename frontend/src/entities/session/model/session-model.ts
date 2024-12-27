import { z } from "zod"

export type UserId = number
export type UserBalance = number
export type UserName = string
export type UserSurname = string
export type UserLogin = string
export type UserEmail = string
export type UserPassword = string
export type UserIsAdmin = boolean

export type User = {
    user_id: number
    user_balance: number
    user_name: string
    userSurname: string
    user_login: string
    user_email: string
    user_password: string
    user_admin: boolean
    // avatar: Uint8Array
}

export const UserSchema = z.object({
    user_id: z.number(),
    user_balance: z.number(),
    user_name: z.string(),
    user_surname: z.string(),
    user_login: z.string(),
    user_email: z.string().email(),
    user_password: z.string(),
    user_admin: z.boolean(),
    // avatar: z.instanceof(Uint8Array),
})
