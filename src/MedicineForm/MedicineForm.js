// MedicineForm.js
import React, { useState, useContext } from "react";
import axios from "axios";
import CartContext from "../Store/cart-context";
import "./MedicineForm.css";

const MedicineForm = () => {
  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);

  const cartCtx = useContext(CartContext);

  const medicineNameHandler = (event) => {
    setMedicineName(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const addItemInContext = async (event) => {
    event.preventDefault();

    const item = {
      medicineName: medicineName,
      description: description,
      price: price,
      quantity: quantity,
    };

    try {
      await axios.post("https://crudcrud.com/api/3c8ae84e41734a5899c0303d0dcbc153/products", item);
      cartCtx.addItem(item);
      console.log("Product added successfully");
      localStorage.setItem("cartItems", JSON.stringify(cartCtx.cartItems));
    } catch (error) {
      console.error("Error adding product:", error);
    }

    setMedicineName("");
    setDescription("");
    setPrice("");
    setQuantity(0);
  };

  return (
    <div className="form-div">
      <form className="form-submit">
        <label className="form-label" htmlFor="medicineName">
          Medicine Name
        </label>
        <input
          className="form-input"
          onChange={medicineNameHandler}
          value={medicineName}
          id="medicineName"
          type="text"
        ></input>

        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          className="form-input"
          onChange={descriptionHandler}
          value={description}
          id="description"
          type="text"
        ></input>

        <label className="form-label" htmlFor="price">
          Price
        </label>
        <input
          className="form-input"
          onChange={priceHandler}
          value={price}
          id="price"
          type="text"
        ></input>

        <label className="form-label" htmlFor="quantity">
          Quantity Available
        </label>
        <input
          className="form-input"
          onChange={quantityHandler}
          value={quantity}
          id="quantity"
          type="number"
        ></input>

        <button className="form-button" onClick={addItemInContext}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
