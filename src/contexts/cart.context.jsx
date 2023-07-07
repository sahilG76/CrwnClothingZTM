import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, product) => {
  // find if cartItems contains product
  const existingItem =
    cartItems && cartItems.find((item) => item.id === product.id);

  // if found, increment quant
  if (existingItem) {
    // return NEW array
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  // return new array
  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, product) => {
  // find item to remove
  const existingItem = cartItems.find((item) => item.id === product.id);

  // if found, if qty is 1, remove item
  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== product.id);
  }

  // return items w/ matching item in reduced quantity
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartQuantity: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_QUANTITY: "SET_CART_QUANTITY",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const cartReducer = (state, action) => {
  // Reducer should NOT handle any business logic
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS: // Perfect use of reducer. one update (cartItems) needs to modify multiple values (cartItems, cartQuantity, cartTotal)
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartQuantity, cartTotal } = state;

  // helper functions which dispatch state updates to cartReducer with appropriate action type and payload
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const setCartItems = (newCartItems) => {
    const newCartQuantity = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newCartTotal = newCartItems
      .map((item) => item.price * item.quantity)
      .reduce((accumulator, price) => accumulator + price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartQuantity: newCartQuantity,
        cartTotal: newCartTotal,
      })
    );
  };

  // helper functions to add, remove, or clear items and reset cart items to that result
  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    setCartItems(newCartItems);
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const value = {
    isCartOpen,
    cartItems,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
