"use client";

import { createOrGetChat, findUserAction } from "@/libs/actions/createChat";
import { FC, useEffect, useRef, useState } from "react";
import Input from "../input";
import { useAppDispatch } from "@/libs/redux/store";
import getAllChats from "@/libs/actions/getAllChats";
import activeChatIdSlice from "@/libs/redux/activeChatSlice";

const FindSection: FC = () => {
  const dispatch = useAppDispatch();

  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getAllChats();
      if (result.success && result.data) {
        setChats(result.data);
      }
    })();
  }, []);

  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      email: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setIsLoading(true);

    timerRef.current = setTimeout(async () => {
      const users = await findUserAction(query);
      setUsers(users);

      setIsLoading(false);
    }, 1000);
  }, [query]);

  const onClick = async (id: string) => {
    await createOrGetChat(id);
  };

  return (
    <section className="w-full md:w-[30%] text-black h-full rounded-2xl p-6.25 flex flex-col gap-3 bg-white">
      <h1 className="text-center text-2xl font-sans mb-2.5">
        Поиск пользователей
      </h1>
      <div>
        <Input
          placeholder="Поиск"
          className="h-10!"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        {isLoading && <div>loading</div>}
        <div className="flex flex-col gap-1 px-px">
          {users.map((item) => (
            <div
              className="cursor-pointer bg-linear-to-r from-gradient-1 to-gradient-2 m-0.5 p-1.5 text-center text-white rounded-xl font-sans transition-all duration-300 hover:scale-105 hover:translate-y-0.5"
              key={item.id}
              onClick={() => onClick(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-sans">Ваши чаты</h1>
      {!chats.length && <div>Нет чатов</div>}
      {chats.map((item) => {
        return (
          <div
            className="cursor-pointer border border-amber-300 rounded-2xl p-2 font-sans"
            key={item.id}
            onClick={() => {
              dispatch(activeChatIdSlice.actions.setActiveChatId(item.id));
            }}
          >
            <span>
              <b>{item.partisipants[0].name}</b>
              <br />
            </span>
            {item.messages[0]?.text || "Нет сообщений"}
          </div>
        );
      })}
    </section>
  );
};

export default FindSection;
