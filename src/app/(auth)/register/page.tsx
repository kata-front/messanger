// app/(auth)/register/page.tsx
'use client';
import Input from "@/components/UI/input";
import { RegisterForm } from "@/components/utilities/types";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
    reset();
  };

  const password = watch('password');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Создайте аккаунт</h1>
          <p className="text-gray-400 mt-2">Присоединяйтесь к сообществу</p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Имя
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Иван Иванов"
            {...register("name", {
              required: "Имя обязательно",
              minLength: { value: 2, message: "Минимум 2 символа" },
              maxLength: { value: 50, message: "Максимум 50 символов" },
            })}
          />
          <div className="font-sans text-red-400 text-sm -mt-2">{errors.name?.message}</div>

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
          <div className="font-sans text-red-400 text-sm -mt-2">{errors.email?.message}</div>

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
          <div className="font-sans text-red-400 text-sm -mt-2">{errors.password?.message}</div>

          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
            Подтверждение пароля
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            {...register("confirmPassword", {
              required: "Подтверждение обязательно",
              validate: value => value === password || "Пароли не совпадают",
            })}
          />
          <div className="font-sans text-red-400 text-sm -mt-2">{errors.confirmPassword?.message}</div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-teal-400 hover:text-teal-300 hover:underline transition-colors">
            Войдите
          </Link>
        </p>
      </div>
    </div>
  );
}