import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer
    },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store