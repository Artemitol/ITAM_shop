import React, { useState } from "react"
import { Button, Card, Input, Spacer } from "@nextui-org/react"
import { useRegisterMutation } from "@entities/session"

export function Register() {
    const [register] = useRegisterMutation()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleRegister = () => {
        register({
            user_login: email,
            user_password: password,
        })
        console.log("Register with:", { email, password })
    }

    return (
        <Card style={{ padding: "20px", width: "100%", maxWidth: "400px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                Register
            </h3>
            <Input
                type='email'
                fullWidth
                placeholder='Email'
                value={email}
                onValueChange={(value) => setEmail(value)}
            />
            <Spacer y={1.5} />
            <Input
                type='password'
                fullWidth
                placeholder='Password'
                value={password}
                onValueChange={(value) => setPassword(value)}
            />
            <Spacer y={1.5} />
            <Button color='primary' onPress={handleRegister}>
                Register
            </Button>
        </Card>
    )
}
