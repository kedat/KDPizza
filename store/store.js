import create from "zustand";

export const useStore = create((set) => ({
  // cart
  cart: {
    pizzas: [],
  },

  // add Pizzas to cart
  addPizza: (data) =>
    set((state) => ({
      cart: {
        pizzas: [...state.cart.pizzas, data],
      },
    })),
}));
