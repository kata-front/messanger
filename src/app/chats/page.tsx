import ActiveChatComponent from "@/components/UI/chatsComponents/activeChat";
import FindSection from "@/components/UI/chatsComponents/findSection";

const page = async () => {
  return (
    <main className="p-6.25 w-screen h-screen bg-background flex flex-col md:flex-row">
      <FindSection/>
      <ActiveChatComponent />
    </main>
  );
};

export default page;
