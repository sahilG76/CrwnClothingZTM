import { useContext, useState, useEffect } from "react";

import { CartContext } from "../../contexts/cart.context";

import CartItem from "../../components/cart-item/cart-item.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const prices = cartItems.map((item) => item.price * item.quantity);
    setTotalCost(prices.reduce((accumulator, price) => accumulator + price, 0));
  }, [cartItems]);

  return (
    <div className="checkout-container">
      <span className="checkout-header">
        product description quantity price remove
      </span>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <CheckoutItem key={item.id} cartItem={item} />
        ))}
      </div>
      <h2>Total: {totalCost}</h2>
    </div>
  );
};

export default Checkout;
