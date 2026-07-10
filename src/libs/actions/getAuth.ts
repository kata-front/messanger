"use server";

import { cookies } from "next/headers";
import { verifyToken } from "../auth/jwt";
import { prisma } from "../prisma";

export async function getAuthAction() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { user: null };
    }

    const payload = await verifyToken(accessToken);
    if (!payload?.sub) {
      return { user: null };
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return { user: null };
    }

    return { user: { name: user.name, email: user.email } };
  } catch (error) {
    console.error("getAuthAction error:", error);
    return { user: null };
  }
}