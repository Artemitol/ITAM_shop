import { Product } from "@entities/product"
import { TableCell, TableRow } from "@nextui-org/react"

export function AdminUsableProduct({ product }: { product: Product }) {
    return (
        <TableRow key={product.product_id}>
            {Object.entries(product).map(([key, value]) => (
                <TableCell key={key}>{value}</TableCell>
            ))}
        </TableRow>
    )
}
