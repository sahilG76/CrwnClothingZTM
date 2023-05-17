import { createContext, useState, useEffect } from "react";
import CartDropdown from "../components/cart-dropdown/cart-dropdown.component";

const addCartItem = (cartItems, product) => {
  // find if cartItems contains product
  const existingItem = cartItems.find((item) => item.id === product.id);

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartQuantity(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const prices = cartItems.map((item) => item.price * item.quantity);
    setCartTotal(prices.reduce((accumulator, price) => accumulator + price, 0));
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
