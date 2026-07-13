import RegisterFormComponent from "@/components/UI/forms/registerFrom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Создайте аккаунт</h1>
          <p className="text-gray-400 mt-2">Присоединяйтесь к сообществу</p>
        </div>

        <RegisterFormComponent />
      </div>
    </div>
  );
}
