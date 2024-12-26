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
    const rowsPerPage = 5

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
                    total={data?.length / rowsPerPage}
                    page={page}
                    onChange={(value) => {
                        setPage(value)
                    }}
                />
            </div>
        </div>
    )
}
