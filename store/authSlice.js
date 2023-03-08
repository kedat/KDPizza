import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userName: "",
  isLogIn: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload
    },
    login(state) {
      state.isLogIn = true
    },
    logout(state) {
      state.isLogIn = false
    },
  },
})

export const { login, logout, setUser } = authSlice.actions
export default authSlice
