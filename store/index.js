import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cardSlice";
import authSlice from "./authSlice"
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});


export default store
