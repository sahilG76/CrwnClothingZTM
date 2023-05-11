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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartQuantity(newCartCount);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const adjustItemQuantity = (product, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(product);
      return;
    }
    const adjustedItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(adjustedItems);
  };

  const removeItem = (product) => {
    setCartItems(
      cartItems.filter((item) => {
        return item.id !== product.id;
      })
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartQuantity,
    setCartQuantity,
    adjustItemQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
