import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pizzas: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		resetCart: (state) => {
			state.pizzas = [];
		},

		addPizza: (state, action) => {
			state.pizzas = [...state.pizzas, action.payload];
		},

		removePizza: (state, action) => {
			state.pizzas = state.pizzas.filter((_, i) => i != action.payload);
		},
	},
});

export const { resetCart, addPizza, removePizza } = cartSlice.actions;

export default cartSlice;

