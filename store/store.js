// import create from "zustand";

// export const useStore = create((set) => ({
//   // cart
//   cart: {
//     pizzas: [],
//   },

//   // add Pizzas to cart
//   // test commit
//   addPizza: (data) =>
//     set((state) => ({
//       cart: {
//         pizzas: [...state.cart.pizzas, data],
//       },
//     })),

//   removePizza: (index) =>
//     set((state) => ({
//       cart: {
//         pizzas: state.cart.pizzas.filter((_, i) => i != index),
//       },
//     })),
//   resetCart: () => {
//     set(() => {
//       cart: {
//         pizzas: [];
//       }
//     });
//   },
// }));

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCartOpen: false,
	cart: [],
	items: [],
	value: 0,
	pizzas: [],
};

export const cartSlice = createSlice({
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

export default cartSlice.reducer;
