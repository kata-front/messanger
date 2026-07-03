"use server";

import { z } from "zod";
import { actionClient } from "../actionClient";

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
    console.log(email, password);
    return "OK";
  });

export const RegisterAction = actionClient
  .inputSchema(RegisterSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    console.log(name, email, password);
    return "OK";
  });
