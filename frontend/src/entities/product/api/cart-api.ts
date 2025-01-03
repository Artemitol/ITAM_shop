import { baseApi } from "@shared/api"
import { Product, productDTOschema, ProductId } from "../model/product-model"

export const cartApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        // Cart
        // GET
        getCart: create.query<Product[] | null, void>({
            query: () => "/cart",
            transformResponse: (responce: unknown) => {
                try {
                    return productDTOschema.array().parse(responce)
                } catch (error) {
                    console.log("Error parsing wishlist response:", error)
                    return null
                }
            },
            providesTags: ["Cart"],
        }),
        // POST
        addToCart: create.mutation<void, ProductId>({
            query: (id) => ({ method: "POST", url: `/cart/add/${id}` }),
            // Обновляем во всех списках, что теперь товар в корзине
            // В том числе перерисовываем страницу с определенным товаром, чтобы отобразить новый ui
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId },
            ],
        }),
        createProduct: create.mutation<void, Partial<Product>>({
            query: (product) => ({
                method: "POST",
                body: product,
                url: `/createnewprod`,
            }),
            invalidatesTags: (result, error, product) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: product.product_id },
            ],
        }),

        // DELETE
        removeFromCart: create.mutation<void, ProductId>({
            query: (id) => ({ method: "DELETE", url: `/cart/remove/${id}` }),
            // Обновляем во всех списках, что теперь товар НЕ в корзине
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId },
            ],
        }),
    }),
    overrideExisting: true,
})

export const {
    useAddToCartMutation,
    useGetCartQuery,
    useRemoveFromCartMutation,
    useCreateProductMutation,
} = cartApi
