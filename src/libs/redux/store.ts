import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import activeChatIdSlice from "./activeChatSlice";

const store = configureStore({
    reducer: {
        [activeChatIdSlice.name]: activeChatIdSlice.reducer,
        [userSlice.name]: userSlice.reducer
    },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store