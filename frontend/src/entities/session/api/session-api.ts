import { baseApi } from "@shared/api"
import { User, UserLogin, UserPassword } from "../model/session-model"

export const sessionBaseApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        login: create.mutation<
            void,
            { login: UserLogin; password: UserPassword }
        >({
            query: (body) => ({ url: "/login", body: body, method: "POST" }),
        }),

        register: create.mutation<void, Partial<User>>({
            query: (body) => ({ url: "/register", body: body, method: "POST" }),
        }),
    }),
    overrideExisting: true,
})

export const { useLoginMutation, useRegisterMutation } = sessionBaseApi
