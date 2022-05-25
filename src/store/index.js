import { configureStore } from "@reduxjs/toolkit";
import weatherSliceReducer from './weather';
import unsplashSliceReducer from './unsplash';

const store = configureStore({
    reducer: {
        weather: weatherSliceReducer,
        unsplash: unsplashSliceReducer
    }
});

export default store;