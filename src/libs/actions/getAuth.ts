'use server'

import { cookies } from "next/headers"
import { verifyToken } from "../auth/jwt"

const getAuthAction = async () => {
    const cookieStorage = await cookies()

    const accessToken = cookieStorage.get('accessToken')

    if (accessToken) {
        const user = await verifyToken(accessToken.value)

        if (user) {
            return user
        }
    }

    const refreshToken = cookieStorage.get('refreshToken')

    if (refreshToken) {
        const user = await verifyToken(refreshToken.value)

        if (user) {
            return user
        }

        return null
    }

    //! TODO: Доделать этот action и реализовать его использование в layout.tsx
}