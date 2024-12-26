import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spinner,
} from "@nextui-org/react"
import { requestTypeDefaultVale, useGetProductQuery } from "@entities/product"
import { useParams } from "react-router-dom"

export function AdminProductCard() {
    const params = useParams<{ product_id: string }>()
    // Получение товара из стора или из запроса
    const {
        data = requestTypeDefaultVale,
        isError,
        isLoading,
    } = useGetProductQuery(Number(params.product_id))
    const { product, features } = data

    if (isLoading) {
        return <Spinner label='Loading product data' />
    }

    if (isError || (!data && !isLoading)) {
        return (
            <Spinner
                label='Error acquired while parsing product data or this product doesn`t exists'
                color='danger'
                labelColor='danger'
            />
        )
    }

    return (
        <Card>
            <CardHeader>{product.product_name}</CardHeader>
            <CardBody>{}</CardBody>
            <CardFooter></CardFooter>
        </Card>
    )
}
