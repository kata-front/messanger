"use server";

import { prisma } from "../prisma";
import { getAuthAction } from "./getAuth";

const findUserAction = async (name: string) => {
  const { user } = await getAuthAction();

  if (!user) {
    throw new Error("Not authorized");
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
      NOT: {
        id: user.id,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return users;
};

const createOrGetChat = async (id: string) => {
  const { user } = await getAuthAction();

  if (!user) {
    throw new Error("Not authorized");
  }

  const chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { partisipants: { some: { id: user.id } } },
        { partisipants: { some: { id: id } } },
      ],
    },
    select: {
      messages: {
        select: {
          text: true,
          createdAt: true,
        },
      },
    },
  });

  if (chat) {
    return chat;
  }

  const newChat = await prisma.chat.create({
    data: {
      partisipants: {
        connect: [{ id: user.id }, { id: id }],
      },
    },
  });

  return newChat;
};

export { findUserAction, createOrGetChat };
