import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react"
import classes from "./create-new-product.module.scss"
import { useState } from "react"
import { Product, useCreateProductMutation } from "@entities/product"

export function CreateNewProduct() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const [createProduct] = useCreateProductMutation()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const product: Partial<Product> = {
            product_name: name,
            product_category: category,
            product_price: Number(price),
            product_description: description,
            product_stock_quantity: Number(quantity),
        }

        createProduct(product)
        setIsOpen(true)
    }
    return (
        <div className={classes.createProduct}>
            <h3 className={classes.title}>Create new product</h3>
            <form onSubmit={handleSubmit} className={classes.fields}>
                <Input
                    placeholder='введите значение'
                    label='Название'
                    labelPlacement='outside'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder='введите значение'
                    label='Категория'
                    labelPlacement='outside'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                    placeholder='введите значение'
                    label='Цена'
                    labelPlacement='outside'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    placeholder='введите значение'
                    label='Описание'
                    labelPlacement='outside'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    placeholder='введите значение'
                    label='Количество'
                    labelPlacement='outside'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Button type='submit'>Отправить</Button>
            </form>
            <Modal isOpen={isOpen}>
                <ModalHeader>
                    <h4>Product Created</h4>
                </ModalHeader>
                <ModalBody>
                    <p>Your product has been successfully created.</p>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={() => setIsOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
