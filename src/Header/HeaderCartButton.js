import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../Store/cart-context";

import "./HeaderCartButton.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.cartItems.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  return (
    <button className="cart-button" onClick={props.showCartHandler}>
      <span className="cart-icon">
        <CartIcon />
      </span>
      <h3>Cart</h3>
      <div className="badge">{numberOfCartItems}</div> 
    </button>
  );
};

export default HeaderCartButton;