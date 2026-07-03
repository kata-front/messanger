'use client';
import Modal from "@/components/modal/modal";
import Input from "@/components/UI/input";
import { RegisterForm } from "@/components/utilities/types";
import { RegisterAction } from "@/libs/actions/authActions";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterModal = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<RegisterForm>();

  const {execute, isExecuting} = useAction(RegisterAction, {
    onSuccess: () => {
      router.push('/');
    },
    onError: ({ error }) => {
      if (error.validationErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(
          ([key, value]) => setError(key as keyof RegisterForm, { message: value[0] })
        )
      }
    }
  })

  const onSubmit = async (data: RegisterForm) => {
    await execute(data);
  };

  const password = watch('password');

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
            Создайте аккаунт
          </h1>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Имя
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Иван Иванов"
              {...register('name', {
                required: 'Имя обязательно',
                minLength: { value: 2, message: 'Минимум 2 символа' },
                maxLength: { value: 50, message: 'Максимум 50 символов' },
              })}
            />
            <div className="font-sans text-red-500 text-sm">{errors.name?.message}</div>

            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="alex.ivanov@gmail.com"
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email',
                },
              })}
            />
            <div className="font-sans text-red-500 text-sm">{errors.email?.message}</div>

            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: { value: 8, message: 'Минимум 8 символов' },
                maxLength: { value: 16, message: 'Максимум 16 символов' },
              })}
            />
            <div className="font-sans text-red-500 text-sm">{errors.password?.message}</div>

            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Подтвердите пароль
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              {...register('confirmPassword', {
                required: 'Подтверждение пароля обязательно',
                validate: (value) => value === password || 'Пароли не совпадают',
              })}
            />
            <div className="font-sans text-red-500 text-sm">{errors.confirmPassword?.message}</div>

            <button
              disabled={isExecuting}
              type="submit"
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              {isExecuting ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>

            <div className="text-center text-sm text-gray-600 mt-2">
              Уже есть аккаунт?{' '}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => router.push('/login')}
              >
                Войдите
              </span>
            </div>
          </form>
        </div>
      </Modal>
    </article>
  );
};

export default RegisterModal;