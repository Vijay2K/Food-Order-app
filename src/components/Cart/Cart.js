import { useContext, useState, Fragment } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const showOrderHandler = () => {
    setShowCheckout(true);
  };

  const closeOrderHandler = () => {
    setShowCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-delivery-21098-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setHasSubmitted(true);
    cartCtx.resetCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={closeOrderHandler} />
      )}
      {!showCheckout && modalActions}
    </Fragment>
  );

  if (isSubmitting) {
    cartModalContent = <p>Submitting...</p>;
  }

  if (hasSubmitted) {
    cartModalContent = (
      <Fragment>
        <p>Successfully submitted your order. Enjoy your meals!!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Done
          </button>
        </div>
      </Fragment>
    );
  }

  return <Modal onClose={props.onClose}>{cartModalContent}</Modal>;
};

export default Cart;
