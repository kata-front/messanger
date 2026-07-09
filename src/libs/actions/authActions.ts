"use server";

import { z } from "zod";
import { actionClient } from "../actionClient";
import { prisma } from "../prisma";
import { createAndSetTokens } from "../auth/jwt";
import { cookies } from "next/headers";
import { hashPassword, verifyPassword } from "../auth/password";

const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(50, {
      message: "Password must be at most 50 characters long",
    }),
});

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(50, {
        message: "Name must be at most 50 characters long",
      }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(50, {
        message: "Password must be at most 50 characters long",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(50, {
        message: "Password must be at most 50 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginAction = actionClient
  .inputSchema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          success: false,
          error: { message: "Invalid email or password" },
        };
      } else {
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
          return {
            success: false,
            error: { message: "Invalid email or password" },
          };
        }

        const cookieStorage = await cookies();

        await createAndSetTokens(cookieStorage, {
          name: user.name,
          email: user.email,
          sub: user.id,
        });

        return { success: true, data: { email, name: user.name } };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: { message: "Internal server error" } };
    }
  });

export const RegisterAction = actionClient
  .inputSchema(RegisterSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      const user = await prisma.user.create({
        data: { name, email, password: await hashPassword(password) },
      });

      const cookieStorage = await cookies();

      await createAndSetTokens(cookieStorage, {
        name: user.name,
        email: user.email,
        sub: user.id,
      });

      return { success: true, data: { email, name } };
    } catch (error: any) {
      if (error?.code === "P2002") {
        return {
          success: false,
          error: { message: "Пользователь с таким email уже существует" },
        };
      }
      console.error("Login error:", error);
      return { success: false, error: { message: "Internal server error" } };
    }
  });
