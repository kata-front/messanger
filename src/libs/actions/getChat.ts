'use server'

import { prisma } from "../prisma";
import { getAuthAction } from "./getAuth";

const getChatAction = async (chatId: string) => {
    const { user } = await getAuthAction();

    if (!user) {
        throw new Error("Not authorized");
    }

    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            partisipants: {
                some: {
                    id: user.id
                }
            }
        },
        select: {
            partisipants: {
                where: {
                    id: {
                        not: user.id
                    }
                },
                select: {
                    name: true
                }
            },
            messages: {
                select: {
                    userId: true,
                    text: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    })

    if (!chat) throw new Error("Chat not found");

    return chat
}

export default getChatAction