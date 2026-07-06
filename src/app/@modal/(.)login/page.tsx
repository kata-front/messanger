import Modal from "@/components/modal/modal";
import CloseBtn from "@/components/UI/forms/closeBtn";
import LoginFormComponent from "@/components/UI/forms/loginForm";

const LoginModal = () => {
  return (
    <article className="absolute top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-md flex items-center justify-center">
      <CloseBtn />
      <Modal classes="w-[80vw] max-w-md p-6 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Войдите для общения
          </h1>
          
          <LoginFormComponent />
        </div>
      </Modal>
    </article>
  );
};

export default LoginModal;
