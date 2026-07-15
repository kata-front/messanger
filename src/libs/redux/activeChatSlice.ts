import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const activeChatIdSlice = createSlice({
    name: 'activeChatId',
    initialState: null as string | null,
    selectors: {
        getActiveChatId: (state) => state
    },
    reducers: {
        setActiveChatId: (_, action: PayloadAction<string>) => action.payload
    }
})

export default activeChatIdSlice