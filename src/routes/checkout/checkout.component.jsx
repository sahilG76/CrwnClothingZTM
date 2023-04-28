import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CartItem from "../../components/cart-item/cart-item.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems[0]);

  return (
    <div className="checkout-container">
      <div className="checkout-items">
        {cartItems.map((item) => (
          <CheckoutItem key={item.id} cartItem={item} />
        ))}
      </div>
    </div>
  );
};

export default Checkout;
