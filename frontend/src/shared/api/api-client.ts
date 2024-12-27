import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "http://localhost:8080/"

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
    endpoints: () => ({}),
    tagTypes: [
        "Catalog",
        "Product",
        "Wishlist",
        // Продукты внутри вишлиста
        "WishlistItem",
        "Cart",
        // Продукты внутри корзины
        "CartItem",
    ],
})
