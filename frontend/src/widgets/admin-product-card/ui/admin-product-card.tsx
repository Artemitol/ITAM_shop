import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { requestTypeDefaultVale, useGetProductQuery } from "@entities/product"
import { useParams } from "react-router-dom"

export function AdminProductCard() {
    const params = useParams<{ product_id: string }>()
    // Получение товара из стора или из запроса
    const { data = requestTypeDefaultVale } = useGetProductQuery(
        Number(params.product_id)
    )
    const { product, features } = data

    return (
        <Card>
            <CardHeader>{product.product_name}</CardHeader>
            <CardBody>
                {

                }
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    )
}
