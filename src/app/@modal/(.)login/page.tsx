"use client";
import Modal from "@/components/modal/modal";
import Input from "@/components/UI/input"; // импортируем наш компонент
import { LoginForm } from "@/components/utilities/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginModal = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors}, reset} = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    reset();
  };

  return (
    <article className="absolute top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-md flex items-center justify-center">
      <div
        className="cursor-pointer absolute top-10 right-10 rotate-45 transition-transform duration-300 hover:rotate-135 hover:scale-110 text-5xl text-white"
        onClick={() => router.back()}
      >
        +
      </div>
      <Modal classes="w-[80vw] max-w-md p-6 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Войдите для общения
          </h1>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="alex.ivanov@gmail.com"
              {...register("email", {
                required: "Email обязательный",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный email",
                },
              })}
            />
            <div className='font-sans text-red-500'>{errors.email?.message}</div>

            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              {...register("password", {
                required: "Пароль обязательный",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
                maxLength: {
                  value: 16,
                  message: "Пароль должен содержать не более 16 символов",
                },
              })}
            />
            <div className='font-sans text-red-500'>{errors.password?.message}</div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Войти
            </button>
          </form>
        </div>
      </Modal>
    </article>
  );
};

export default LoginModal;
