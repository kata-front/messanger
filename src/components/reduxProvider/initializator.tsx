"use client";

import { getAuthAction } from "@/libs/actions/getAuth";
import { useAppDispatch } from "@/libs/redux/store";
import userSlice from "@/libs/redux/userSlice";
import { FC, ReactNode, useEffect } from "react";

const Initializator: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { user } = await getAuthAction();
      if (user) {
        dispatch(userSlice.actions.setUser(user));
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
};

export default Initializator;