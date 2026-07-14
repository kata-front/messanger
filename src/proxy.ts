import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createAndSetTokens, verifyToken } from "./libs/auth/jwt";
import { prisma } from "./libs/prisma";

export const proxy = async(req: NextRequest) => {
    const cookieStorage = await cookies();

    const accessToken = cookieStorage.get('accessToken')
        
    if (accessToken) {
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
            return NextResponse.redirect(new URL('/chats', req.url))
        }

        const payload = await verifyToken(accessToken.value)

        if (payload?.name) {
            return NextResponse.next()
        }
    }

    const refreshToken = cookieStorage.get('refreshToken')

    if (refreshToken) {
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
            return NextResponse.redirect(new URL('/chats', req.url))
        }

        const payload = await verifyToken(refreshToken.value)

        if (payload?.sub) {
            const user = await prisma.user.findUnique({
                where: { id: payload.sub },
                select: { id: true, name: true, email: true },
            })

            if (!user) {
                cookieStorage.delete('refreshToken')
                return NextResponse.redirect(new URL('/login', req.url))
            }

            await createAndSetTokens(cookieStorage, {
                name: user.name,
                email: user.email,
                sub: user.id,
            })

            return NextResponse.next()
        }
    }

    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
    matcher: ['/', '/chats/:path*', '/profile/:path*', '/login', '/register'],
}