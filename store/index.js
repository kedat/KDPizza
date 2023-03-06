import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "./cardSlice";
import authSlice from "./authSlice"
const store = configureStore({
  reducer: {
    cart: cardSlice.reducer,
    auth: authSlice.reducer,
  },
});


export default store
