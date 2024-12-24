import { ReactNode } from "react"
import { NavButton } from "../model/model"
import { AdminNavButton } from "../ui/admin-nav-button"

export const mapNavButtons = (buttons: NavButton[]): ReactNode => {
    const result = buttons.map((el) => (
        <AdminNavButton key={el.link} value={el.textValue} link={el.link} />
    ))

    return result
}
