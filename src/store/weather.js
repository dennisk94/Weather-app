import { createSlice } from "@reduxjs/toolkit";

const weatherInitial = { currentWeather: [], geolocation: [] , localTime: '', exist: false };

const weatherSlice = createSlice({
    name: 'weather',
    initialState: weatherInitial,
    reducers: {
        setWeather( state, action ) {
            const { res, localTime, exist } = action.payload;
            state.currentWeather = [ res ];
            state.localTime = localTime;
            state.exist = exist;
        },

        setGeolocation: ( state, action ) => {
            const { lat, lon } = action.payload;
            state.geolocation = [lat, lon];
        },
    }, 
});

export const weatherSliceActions = weatherSlice.actions;
export default weatherSlice.reducer;