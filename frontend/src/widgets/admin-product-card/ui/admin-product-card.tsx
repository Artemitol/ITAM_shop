import classes from "./admin-product-card.module.scss"
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react"
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
        <div className={classes.adminProduct}>
            <h4>{product.product_name}</h4>
            <h6>ID: {product.product_id}</h6>
            <div className={classes.block}>
                <Select
                    size='lg'
                    aria-label='Select which value to update'
                    placeholder='Выберите интересующее вас поле'
                >
                    <SelectItem>Category</SelectItem>
                    <SelectItem>Name</SelectItem>
                </Select>
                <div className={classes.input}>
                    <Input size='lg' placeholder='введите значение...' />
                    <Button size='lg' color='danger'>
                        Update Value
                    </Button>
                </div>
            </div>
        </div>
    )
}
