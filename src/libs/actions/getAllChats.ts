"use server";

import { prisma } from "../prisma";
import { getAuthAction } from "./getAuth";

const getAllChats = async () => {
  try {
    const { user } = await getAuthAction();
    if (!user) throw new Error("User not found");

    const chats = await prisma.chat.findMany({
      where: {
        partisipants: { some: { id: user.id } },
      },
      select: {
        id: true,
        partisipants: {
          where: {
            id: { not: user.id }, // исключаем текущего пользователя
          },
          select: {
            name: true, // берём только имя собеседника
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            text: true,
            createdAt: true,
          },
        },
      },
    });

    return { success: true, data: chats };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message || "Internal server error" },
    };
  }
};

export default getAllChats;
