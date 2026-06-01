import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem(
      "shoppyglobe-cart",
      JSON.stringify({ items: store.getState().cart.items })
    );
  } catch {
    // Ignore storage errors so cart actions still work.
  }
});

export default store;
