import { Outlet } from "react-router-dom"
import classes from "./admin-panel.module.scss"
import { navButtonsConfig } from "../config/navigation-config"
import { mapNavButtons } from "@widgets/admin-nav-button"

export function AdminPanel() {
    return (
        <div className={classes.adminPanel}>
            <h1 className={classes.title}>Admin panel</h1>
            <div className={classes.content}>
                <div className={classes.navButtons}>
                    {mapNavButtons(navButtonsConfig)}
                </div>
                <div className={classes.tabsContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
