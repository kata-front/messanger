import FindSection from "@/components/UI/chatsComponents/findSection";
import getAllChats from "@/libs/actions/getAllChats";

const page = async () => {
  const chats = await getAllChats();

  return (
    <main className="p-6.25 w-screen h-screen bg-background flex flex-col md:flex-row">
      <section className="w-full md:w-[30%]">
        <FindSection />
        {chats.success &&
          chats.data?.map((item) => {
            return <div key={item.id}>{item.messages[0].text}</div>;
          })}
      </section>
      <section className="w-full md:w-[70%]">
        <div>Chat</div>
        {/*! TODO : Chat */}
      </section>
    </main>
  );
};

export default page;
