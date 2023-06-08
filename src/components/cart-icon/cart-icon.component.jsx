import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.jsx";
import {
  CartIconContainer,
  ItemCount,
  ShopBagIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShopBagIcon />
      <ItemCount>{cartQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
