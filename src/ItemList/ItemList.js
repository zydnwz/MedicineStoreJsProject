import React, { useContext } from "react";
import axios from "axios";
import CartContext from "../Store/cart-context";

import "./ItemList.css";

const ItemList = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCart = async (item) => {
    if (item.quantity > 0) {
      let medicineItem = {
        medicineName: item.medicineName,
        description: item.description,
        price: item.price,
        quantity: "1",
      };

      cartCtx.addCartItem(medicineItem);

      try {
        await axios.post("https://crudcrud.com/api/3c8ae84e41734a5899c0303d0dcbc153/cart", medicineItem);
        console.log("Item added to cart successfully");

        localStorage.setItem("cartItems", JSON.stringify(cartCtx.cartItems));
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };
  return (
    <div className="item-list">
      <ul>
        <li className="list-heading">
          <h3>Name</h3>
          <h3>Description</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
        </li>

        {cartCtx.items.map((item) => {
          let isOutOfStock = item.quantity === "Out of Stock";

          return (
            <li key={item.medicineName} className="list-items">
              <div className="medicine-name">{item.medicineName}</div>
              <div className="description">{item.description}</div>
              <div className="price">{item.price}</div>
              <div className="quantity">{item.quantity}</div>
              <button
                onClick={() => addToCart(item)}
                className={`add-button ${isOutOfStock ? "out-of-stock" : ""}`}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
