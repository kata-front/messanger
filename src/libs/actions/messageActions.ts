"use server";

import z from "zod";
import { actionClient } from "../actionClient";
import { prisma } from "../prisma";
import { getAuthAction } from "./getAuth";

const MessageSchema = z.object({
  chatId: z.string().min(1, { message: "Chat ID is required" }),
  text: z.string().min(1, { message: "Text is required" }),
});

const sendMessage = actionClient
  .inputSchema(MessageSchema)
  .action(async ({ parsedInput: { chatId, text } }) => {
    try {
      const { user } = await getAuthAction();

      if (!user) throw new Error("User not found");

      const chat = await prisma.chat.findFirst({
        where: {
          id: chatId,
          partisipants: {
            some: {
              id: user.id,
            },
          },
        },
      });
      if (!chat) throw new Error("Chat not found");

      const message = await prisma.message.create({
        data: {
          text,
          chatId,
          userId: user.id,
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      });

      return { success: true, data: message };
    } catch (error) {
      console.error("Message error:", error);
      return { success: false, error: { message: "Internal server error" } };
    }
  });

const getMessage = actionClient
  .inputSchema(
    z.object({
      chatId: z.string().min(1, { message: "Chat ID is required" }),
    }),
  )
  .action(async ({ parsedInput: { chatId } }) => {
    try {
      const { user } = await getAuthAction();

      if (!user) throw new Error("User not found");

      const chat = await prisma.chat.findFirst({
        where: {
          id: chatId,
          partisipants: {
            some: {
              id: user.id,
            },
          },
        },
      });
      if (!chat) throw new Error("Chat not found");

      const messages = await prisma.message.findMany({
        where: {
          chatId,
        },
      });

      return { success: true, data: messages };
    } catch (error) {
      console.error("Message error:", error);
      return { success: false, error: { message: "Internal server error" } };
    }
  });

export { sendMessage, getMessage };
