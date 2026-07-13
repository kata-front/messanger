import { jwtVerify, SignJWT } from "jose";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

type User = {
  name: string;
  email: string;
  sub: string;
};

export const generateAccessToken = async (user: User) => {
  return await new SignJWT(user)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
};

export const generateRefreshToken = async (userId: string) => {
  return await new SignJWT({
    sub: userId,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
};


export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify<User | {
      sub: string
    }>(token, secret);
    return payload
  } catch {
    return null
  }
}

export const createAndSetTokens = async (cookieStorage: ResponseCookies, user: User) => {
  const commonOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }
  
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user.sub);
  cookieStorage.set('accessToken', accessToken, {
    ...commonOptions, 
    maxAge: 15 * 60
  });
  cookieStorage.set('refreshToken', refreshToken, {
    ...commonOptions, 
    maxAge: 7 * 24 * 60 * 60
  });
}