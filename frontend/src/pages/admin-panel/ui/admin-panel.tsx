import { useNavigate } from "react-router-dom"
import classes from "./admin-panel.module.scss"
import { Button, Input, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"

export function AdminPanel() {
    const [editValue, setEditValue] = useState<string>("")
    const navigate = useNavigate()

    function editButtonHandler() {
        navigate(`edit-product/${editValue}`)
    }

    return (
        <div className={classes.adminPanel}>
            <h1 className={classes.title}>Admin panel</h1>
            <Tabs className={classes.content}>
                <Tab title='Создать новый продукт'>
                    <h2 className='mb-5'>Создайте новый продукт</h2>
                </Tab>
                <Tab title='Администрирование сайта'>
                    <h2 className='mb-5'>
                        Здесь вы можете вносить изменения в существующие товары
                    </h2>
                    <div className={classes.editProducts}>
                        <Input
                            placeholder='Введите id товара'
                            onValueChange={setEditValue}
                        />
                        <Button color='primary' onPress={editButtonHandler}>
                            Отредактировать
                        </Button>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
