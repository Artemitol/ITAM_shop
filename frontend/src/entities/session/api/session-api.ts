import { baseApi } from "@shared/api"

export const sessionBaseApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        login: create.mutation({
            query: (body) => ({ url: "/login", body: body }),
        }),
    }),
    overrideExisting: true,
})
