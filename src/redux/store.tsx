import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';
import logger from "redux-logger";



export const setUpStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    devTools:true,
  })
}

export type AppStore = ReturnType<typeof setUpStore>
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch']