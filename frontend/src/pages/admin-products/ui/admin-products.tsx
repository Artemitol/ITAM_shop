import classes from "./admin-products.module.scss"
import {
    Button,
    Input,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react"
import { productDefaultValue, useGetProductsQuery } from "@entities/product"
import { useMemo, useState } from "react"
import { RemoveIcon } from "@shared/ui/icons"
import { useRemoveProductMutation } from "@entities/product/api/item-api"

export function AdminProducts() {
    const { data, isError, isLoading } = useGetProductsQuery()
    const [removeItem] = useRemoveProductMutation()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<string>("5")

    const displayedItems = useMemo(() => {
        const start = (currentPage - 1) * Number(itemsPerPage)
        const end = start + Number(itemsPerPage)

        if (data) {
            return data.slice(start, end)
        } else {
            return [productDefaultValue]
        }
    }, [currentPage, data, itemsPerPage])

    if (isLoading || !data) {
        return <Spinner style={{ marginTop: "7rem" }} label='Loading' />
    }

    if (isError) {
        return <div>No data was provided</div>
    }

    return (
        <div className={classes.adminProducts}>
            <div className={classes.filters}>
                <Input
                    className='mb-5'
                    placeholder='enter value...'
                    label='Enter products per page'
                    value={itemsPerPage}
                    onValueChange={setItemsPerPage}
                />
                <Button color='primary'>Создать новый продукт</Button>
            </div>
            <Table
                isCompact
                selectionMode='multiple'
                bottomContent={
                    <div className='flex w-full justify-center'>
                        <Pagination
                            showControls
                            initialPage={1}
                            total={data.length / Number(itemsPerPage)}
                            page={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                }
                bottomContentPlacement='inside'
                aria-label='Table of products'
            >
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Category</TableColumn>
                    <TableColumn>Quantity</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"no items was provided"}>
                    {displayedItems.map((row, key) => (
                        <TableRow key={key}>
                            <TableCell>{row.product_id}</TableCell>
                            <TableCell>{row.product_name}</TableCell>
                            <TableCell>{row.product_price}</TableCell>
                            <TableCell>{row.product_category}</TableCell>
                            <TableCell>{row.product_stock_quantity}</TableCell>
                            <TableCell>
                                <Button
                                    isIconOnly
                                    variant='light'
                                    onPress={() => {
                                        removeItem(row.product_id)
                                    }}
                                >
                                    <RemoveIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
