"use client";

import store from "@/libs/redux/store";
import { FC, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import Initializator from "./initializator";

const ReduxProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <Provider store={store}>
    <Initializator>{children}</Initializator>
  </Provider>;
};

export default ReduxProvider;
