import React, { useState } from "react"
import { Button, Card, Input, Spacer } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "@entities/session"

export function LoginPage() {
    const navigate = useNavigate()
    const [login] = useLoginMutation()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = () => {
        login({ login: email, password: password })
        console.log("Logging in with:", { email, password })
    }

    return (
        <Card style={{ padding: "20px", width: "100%", maxWidth: "400px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h3>
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
            <div className='flex flex-row justify-between'>
                <Button color='primary' fullWidth onPress={handleLogin}>
                    Login
                </Button>
                <Button
                    onPress={() => {
                        navigate("/register")
                    }}
                >
                    Register
                </Button>
            </div>
        </Card>
    )
}
