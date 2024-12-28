import classes from "./items-list.module.scss"
import { productsMaper } from "../lib/maper"
import { Product, productDefaultValue } from "@entities/product"
import { Pagination, Spinner } from "@nextui-org/react"
import { useMemo, useState } from "react"

type ItemsListProps = {
    data: Product[] | undefined
}

export function ItemsList({ data }: ItemsListProps) {
    const [page, setPage] = useState<number>(1)
    const rowsPerPage = 6

    const totalPages = useMemo(() => {
        if (!data) return 1
        return Math.ceil(data.length / rowsPerPage)
    }, [data, rowsPerPage])

    const resultData = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        if (data) {
            return data.slice(start, end)
        } else {
            return [productDefaultValue]
        }
    }, [data, page])

    return (
        <div>
            <div className={classes.list}>
                {data ? (
                    productsMaper(resultData)
                ) : (
                    <Spinner label='loading...' />
                )}
            </div>
            <div className='flex justify-center w-full'>
                <Pagination
                    showShadow
                    showControls
                    total={totalPages}
                    page={page}
                    onChange={(value) => {
                        setPage(value)
                    }}
                />
            </div>
        </div>
    )
}
