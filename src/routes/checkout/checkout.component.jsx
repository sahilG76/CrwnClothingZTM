import { useContext, useState, useEffect } from "react";

import { CartContext } from "../../contexts/cart.context";

import CartItem from "../../components/cart-item/cart-item.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CheckoutContainer, Header, HeaderBlock } from "./checkout.styles.jsx";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <Header>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </Header>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </CheckoutContainer>
  );
};

export default Checkout;
