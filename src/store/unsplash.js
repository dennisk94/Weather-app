import { createSlice } from "@reduxjs/toolkit";

const unsplashInitial = { url: '', exist: false };

const unsplashSlice = createSlice({
    name: 'unsplash',
    initialState: unsplashInitial,
    reducers: {
        setBgcImg: ( state, action ) => {
            const { url } = action.payload;
            state.url = url;
            state.exist = true;
        }
    }
});

export const unsplashSliceActions = unsplashSlice.actions;
export default unsplashSlice.reducer;
