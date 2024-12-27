import { baseApi } from "@shared/api"
import {
    requestDTOschema,
    Product,
    productDTOschema,
    ProductId,
    RequestType,
} from "../model/product-model"

export const productsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        // GET Product
        getProduct: create.query<RequestType, ProductId>({
            query: (productId) => `/get_item_page/${productId}`,
            transformResponse: (responce: unknown) =>
                requestDTOschema.parse(responce),
            providesTags: (result, error, productId) => [
                { type: "Product", id: productId },
            ],
        }),
        // DELETE
        removeProduct: create.mutation<void, ProductId>({
            query: (id) => ({ url: `/deleteproduct/${id}`, method: "POST" }),
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId },
            ],
        }),

        // GET Сatalog
        getProducts: create.query<Product[], void>({
            query: () => ({ url: "/catalog"}),
            transformResponse: (responce: unknown) =>
                productDTOschema.array().parse(responce),
            providesTags: ["Catalog"],
        }),
    }),
    overrideExisting: true,
})

export const {
    // Product
    useGetProductQuery,
    useRemoveProductMutation,

    // Catalog
    useGetProductsQuery,
} = productsApi
