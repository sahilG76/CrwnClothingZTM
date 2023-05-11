import { useContext, useState, useEffect } from "react";

import { CartContext } from "../../contexts/cart.context";

import DecrementButton from "../decrement-button/decrement-button.component";
import IncrementButton from "../increment-button/increment-button.component";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  const { adjustItemQuantity, removeItem } = useContext(CartContext);

  const [adjustedQty, setAdjustedQty] = useState(quantity);
  const decrementQty = () => setAdjustedQty(adjustedQty - 1);
  const incrementQty = () => setAdjustedQty(adjustedQty + 1);

  useEffect(() => {
    adjustItemQuantity(cartItem, adjustedQty);
  }, [adjustedQty]);

  return (
    <div className="checkout-item-container">
      <img class="image-container" src={imageUrl} alt={name} />
      <span class="name">{name}</span>
      <DecrementButton onClickHandler={decrementQty} />
      <span class="quantity"> {quantity}</span>
      <IncrementButton onClickHandler={incrementQty} />
      <span class="price">{price * quantity}</span>
      <button
        onClick={() => {
          removeItem(cartItem);
        }}
      >
        X
      </button>
      {/* <button onClick={removeItem(cartItem)}> X </button> */}
    </div>
  );
};

export default CheckoutItem;
