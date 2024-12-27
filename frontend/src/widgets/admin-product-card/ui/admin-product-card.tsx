import classes from "./admin-product-card.module.scss"
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react"
import { requestTypeDefaultVale, useGetProductQuery } from "@entities/product"
import { useParams } from "react-router-dom"
import { useState } from "react"
import {
    useEditProductCategoryMutation,
    useEditProductDescriptionMutation,
    useEditProductNameMutation,
    useEditProductPriceMutation,
    useEditProductStockQuantityMutation,
} from "../api/admin-api"

export function AdminProductCard() {
    const [editName] = useEditProductNameMutation()
    const [editCategory] = useEditProductCategoryMutation()
    const [editPrice] = useEditProductPriceMutation()
    const [editDescription] = useEditProductDescriptionMutation()
    const [editQuantity] = useEditProductStockQuantityMutation()

    const params = useParams<{ product_id: string }>()
    // Получение товара из стора или из запроса
    const {
        data = requestTypeDefaultVale,
        isError,
        isLoading,
    } = useGetProductQuery(Number(params.product_id))
    const { product, features } = data
    const [value, setValue] = useState("")
    const [selectedField, setSelectedField] = useState<
        "name" | "category" | "price" | "description" | "quantity" | "" | string
    >("")

    function handleClick() {
        switch (selectedField) {
            case "name":
                editName({ id: product.product_id, value })
                break
            case "category":
                editCategory({ id: product.product_id, value })
                break
            case "price":
                editPrice({ id: product.product_id, value })
                break
            case "description":
                editDescription({ id: product.product_id, value })
                break
            case "quantity":
                editQuantity({ id: product.product_id, value })
                break
            default:
                console.log("unknown case")
        }
    }

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

    console.log(product)

    return (
        <div className={classes.adminProduct}>
            <h4>{product.product_name}</h4>
            <h6>ID: {product.product_id}</h6>
            <div className={classes.block}>
                <Select
                    size='lg'
                    aria-label='Select which value to update'
                    placeholder='Выберите интересующее вас поле'
                    onChange={(e) => setSelectedField(e.target.value)}
                >
                    <SelectItem value={"category"}>Category</SelectItem>
                    <SelectItem value={"name"}>Name</SelectItem>
                    <SelectItem value={"price"}>Price</SelectItem>
                    <SelectItem value={"description"}>Description</SelectItem>
                    <SelectItem value={"quantity"}>Quantity</SelectItem>
                </Select>
                <div className={classes.input}>
                    <Input
                        size='lg'
                        placeholder='введите значение...'
                        required
                        value={value}
                        onValueChange={setValue}
                    />
                    <Button size='lg' color='danger'>
                        Update Value
                    </Button>
                </div>
            </div>
        </div>
    )
}
