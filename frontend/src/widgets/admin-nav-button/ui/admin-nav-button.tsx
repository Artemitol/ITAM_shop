import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

type AdminNavButtonsProps = {
    value?: string
    link?: string
}

export function AdminNavButton({
    value = "",
    link = "",
}: AdminNavButtonsProps) {
    const navigate = useNavigate()

    return (
        <Button
            onPress={() => {
                navigate(link)
            }}
            size='lg'
            color='primary'
        >
            {value}
        </Button>
    )
}
