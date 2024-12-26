import { ProductId } from "@entities/product"
import { baseApi } from "@shared/api"

export const adminApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        // Редактирование полей в бд
        editProductName: create.mutation<
            void,
            { id: ProductId; value: string }
        >({
            query: ({ id, value }) => ({
                method: "POST",
                body: value,
                url: `/editproductname/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId.id },
            ],
        }),
        editProductPrice: create.mutation<
            void,
            { id: ProductId; value: string }
        >({
            query: ({ id, value }) => ({
                method: "POST",
                body: value,
                url: `/editproductprice/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId.id },
            ],
        }),
        editProductDescription: create.mutation<
            void,
            { id: ProductId; value: string }
        >({
            query: ({ id, value }) => ({
                method: "POST",
                body: value,
                url: `/editproductdescription/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                { type: "Product", id: productId.id },
            ],
        }),
        editProductCategory: create.mutation<
            void,
            { id: ProductId; value: string }
        >({
            query: ({ id, value }) => ({
                method: "POST",
                body: value,
                url: `/editproductcategory/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                { type: "Product", id: productId.id },
            ],
        }),
        editProductStockQuantity: create.mutation<
            void,
            { id: ProductId; value: string }
        >({
            query: ({ id, value }) => ({
                method: "POST",
                body: value,
                url: `/editproductstockquantity/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                { type: "Product", id: productId.id },
            ],
        }),

        // Административные функции
        deleteProduct: create.mutation<void, ProductId>({
            query: (id) => ({
                method: "POST",
                url: `/deleteproduct/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId },
            ],
        }),
        // addFeaturesToItem: create.mutation<
        //     void,
        //     { id: ProductId; feature: {} }
        // >({
        //     query: ({ id, value }) => ({
        //         method: "POST",
        //         body: value,
        //         url: `/add_features_to_item/${id}`,
        //     }),
        //     invalidatesTags: (result, error, productId) => [
        //         { type: "Product", id: productId.id },
        //     ],
        // }),
        updateImageForProduct: create.mutation<
            void,
            { id: ProductId; value: { ImageData: string } }
        >({
            query: ({ id, value }) => ({
                method: "POST",
                body: value,
                url: `/updateimageforproduct/${id}`,
            }),
            invalidatesTags: (result, error, productId) => [
                "Cart",
                "Catalog",
                "Wishlist",
                { type: "Product", id: productId.id },
            ],
        }),
    }),
    overrideExisting: true,
})
