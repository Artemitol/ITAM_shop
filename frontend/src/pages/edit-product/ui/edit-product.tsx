import { useGetProductQuery } from "@entities/product"

export function EditProduct() {
    const { data } = useGetProductQuery()

    return <div></div>
}
