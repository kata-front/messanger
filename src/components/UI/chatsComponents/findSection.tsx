"use client";

import { findUserAction } from "@/libs/actions/createChat";
import { useEffect, useRef, useState } from "react";
import Input from "../input";

const FindSection = () => {
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
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setIsLoading(true)
    
    timerRef.current = setTimeout(async () => {
        const users = await findUserAction(query);
        setUsers(users);

        setIsLoading(false)
    }, 1000)
  }, [query]);

  return <div>
    <Input onChange={(e) => setQuery(e.target.value)} value={query}/>
    {isLoading ? <div>loading</div> : users.map(user => <div key={user.id}>{user.name}</div>)}
  </div>;
};

export default FindSection;