import { createSlice } from "@reduxjs/toolkit";

function getCartPayload(payload) {
  if (payload.product) {
    return payload;
  }

  return {
    product: payload,
    quantity: 1,
  };
}

function getStockLimit(product) {
  return Number.isFinite(product.stock) ? product.stock : 99;
}

function getInitialState() {
  try {
    const savedCart = localStorage.getItem("shoppyglobe-cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch {
    return { items: [] };
  }

  return { items: [] };
}

const initialState = {
  items: getInitialState().items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = getCartPayload(action.payload);
      const existingItem = state.items.find((item) => item.id === product.id);
      const stockLimit = getStockLimit(product);
      const requestedQuantity = Math.max(1, Number(quantity) || 1);

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + requestedQuantity,
          existingItem.stock
        );
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: Math.min(requestedQuantity, stockLimit),
          stock: stockLimit,
        });
      }
    },
    increaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

      if (item) {
        item.quantity = Math.max(1, Math.min(Number(quantity) || 1, item.stock));
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setQuantity,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
