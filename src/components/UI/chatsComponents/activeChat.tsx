"use client";
import getChatAction from "@/libs/actions/getChat";
import activeChatIdSlice from "@/libs/redux/activeChatSlice";
import { useAppSelector } from "@/libs/redux/store";
import { FC, useEffect, useState } from "react";
import Input from "../input";
import { sendMessage } from "@/libs/actions/messageActions";

const ActiveChatComponent: FC = () => {
  const activeChatId = useAppSelector(
    activeChatIdSlice.selectors.getActiveChatId,
  );

  const [activeChat, setActiveChat] = useState<{
    partisipants: {
      name: string;
    }[];
    messages: {
      createdAt: Date;
      updatedAt: Date;
      text: string;
      userId: string;
    }[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      if (activeChatId) {
        const result = await getChatAction(activeChatId);
        setActiveChat(result);
      }
    })();
  }, [activeChatId]);

  const [value, setValue] = useState<string>("");

  return (
    <section className="w-full h-full md:w-[70%] md:px-6.25">
      <div className="w-full h-full rounded-2xl py-6.25 md:p-6.25 md:bg-white">
        <h1 className="text-2xl font-sans text-center md:text-black">Chat</h1>

        <div className="w-full h-full">
          {!activeChatId && (
            <div className="w-full h-full flex justify-center items-center">
              Выберите чат
            </div>
          )}

          {activeChatId && activeChat && (
            <div className="w-full h-full relative">
              {!activeChat?.messages.length ? (
                <>
                  <div>{activeChat?.partisipants[0].name}</div>
                  <div className="w-full h-full flex justify-center items-center">
                    Нет сообщений
                  </div>
                </>
              ) : (
                <>
                  {activeChat?.messages?.map((message: any) => (
                    <div key={message.id} className="w-full h-full">{message?.text}</div>
                  ))}
                </>
              )}
              <div className="flex flex-row absolute bottom-0">
                <Input
                  className="h-9!"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  value={value}
                />
                <div
                  onClick={async () => {
                    await sendMessage({
                      chatId: activeChatId,
                      text: value,
                    });
                  }}
                  className="cursor-pointer h-9 flex items-center justify-center px-2"
                >
                  Отправить
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActiveChatComponent;
