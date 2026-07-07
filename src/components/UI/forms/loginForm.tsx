"use client";

import { LoginForm } from "@/components/utilities/types";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import Input from "../input";
import { LoginAction } from "@/libs/actions/authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginFormComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const { execute, isExecuting } = useAction(LoginAction, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        setError('root', {
          message: (data.error as { message: string }).message ?? 'Произошла ошибка',
        });
      } else {
        router.push("/");
      }
    },
    onError: ({ error }) => {
      if (error.validationErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(
          ([key, error]) => {
            setError(key as keyof LoginForm, { message: error[0] });
          },
        );
      }
    },
  });

  const onSubmit = async (data: LoginForm) => {
    await execute(data);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="email" className="text-sm font-medium text-gray-300">
        E-mail
      </label>
      <Input
        id="email"
        type="email"
        placeholder="alex.ivanov@gmail.com"
        {...register("email", {
          required: "Email обязательный",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некорректный email",
          },
        })}
      />
      {errors.email && (
        <div className="text-red-400 text-sm">{errors.email.message}</div>
      )}

      <label htmlFor="password" className="text-sm font-medium text-gray-300">
        Пароль
      </label>
      <Input
        id="password"
        type="password"
        placeholder="Введите пароль"
        {...register("password", {
          required: "Пароль обязательный",
          minLength: { value: 8, message: "Минимум 8 символов" },
          maxLength: { value: 16, message: "Максимум 16 символов" },
        })}
      />
      {errors.password && (
        <div className="text-red-400 text-sm">{errors.password.message}</div>
      )}

      {/* Общая серверная ошибка */}
      {errors.root && (
        <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded">
          {errors.root.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isExecuting}
        className="w-full mt-4 py-3 bg-linear-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50"
      >
        {isExecuting ? "Вход..." : "Войти"}
      </button>

      <p className="text-center text-gray-400 mt-6 text-sm">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="text-teal-400 hover:text-teal-300 hover:underline transition-colors"
        >
          Зарегистрируйтесь
        </Link>
      </p>
    </form>
  );
};

export default LoginFormComponent;
