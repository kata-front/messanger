// app/(auth)/login/page.tsx
'use client';
import Input from "@/components/UI/input";
import { LoginForm } from "@/components/utilities/types";
import { LoginAction } from "@/libs/actions/authActions";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const { execute, isExecuting } = useAction(LoginAction, {
    onSuccess: () => {
      router.push("/");
    },
    onError: ({ error }) => {
      if (error.validationErrors?.fieldErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            setError(field as keyof LoginForm, {
              message: messages[0],
            });
          }
        });
      }
      if (error.serverError) {
        setError('root.serverError', {
          message: error.serverError,
        });
      }
    },
  });

  const onSubmit = (data: LoginForm) => {
    execute(data);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Добро пожаловать</h1>
          <p className="text-gray-400 mt-2">Войдите, чтобы продолжить общение</p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <div className="text-red-400 text-sm">{errors.email.message}</div>}

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
          {errors.password && <div className="text-red-400 text-sm">{errors.password.message}</div>}

          {/* Общая серверная ошибка */}
          {errors.root?.serverError && (
            <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded">
              {errors.root.serverError.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isExecuting}
            className="w-full mt-4 py-3 bg-linear-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            {isExecuting ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-teal-400 hover:text-teal-300 hover:underline transition-colors">
            Зарегистрируйтесь
          </Link>
        </p>
      </div>
    </div>
  );
}