import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
    name: string
    email: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    selectors:{
        selectUser: (state) => state
    },
    reducers: {
        setUser: (_, action: PayloadAction<User>) => {
            return action.payload
        }
    }
})

export default userSlice