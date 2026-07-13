import CloseBtn from "@/components/UI/forms/closeBtn";
import LoginFormComponent from "@/components/UI/forms/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <LoginFormComponent />
      </div>
    </div>
  );
}
