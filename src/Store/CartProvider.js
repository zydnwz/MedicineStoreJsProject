import React, { useState, useEffect } from "react";
import CartContext from "./cart-context";
import "./CartProvider.css";
import { addProduct, addToCart, fetchProducts, fetchCart } from "../Api";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localItems = localStorage.getItem("items");
        if (localItems) {
          setItems(JSON.parse(localItems));
        } else {
          const products = await fetchProducts();
          setItems(products);
          localStorage.setItem("items", JSON.stringify(products));
        }

        const localCart = localStorage.getItem("cartItems");
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        } else {
          const cart = await fetchCart();
          setCartItems(cart);
          localStorage.setItem("cartItems", JSON.stringify(cart));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addItemToListHandler = async (item) => {
    try {
      await addProduct(item);
      const updatedItem = [...items];
      const existingItem = updatedItem.find(
        (medicineItem) => medicineItem.medicineName === item.medicineName
      );

      if (existingItem) {
        if (existingItem.quantity === "Out of Stock") {
          existingItem.quantity = Number(item.quantity);
        } else {
          existingItem.quantity =
            Number(existingItem.quantity) + Number(item.quantity);
        }
      } else {
        updatedItem.push(item);
      }
      setItems(updatedItem);
      localStorage.setItem("items", JSON.stringify(updatedItem));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const removeItemFromListHandler = (name) => {
    let updatedItem = [...items];
    const existingItem = updatedItem.find(
      (medicineItem) => medicineItem.medicineName === name
    );

    if (Number(existingItem.quantity) > 1) {
      existingItem.quantity = Number(existingItem.quantity) - 1;
    } else {
      existingItem.quantity = "Out of Stock";
    }
    setItems(updatedItem);
    localStorage.setItem("items", JSON.stringify(updatedItem));
  };

  const addItemToCartHandler = async (item) => {
    try {
      await addToCart(item);
      const existingCartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.medicineName === item.medicineName
      );

      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex].quantity =
          Number(updatedCartItems[existingCartItemIndex].quantity) + 1;
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        const newItem = await addToCart(item);
        const updatedCartItems = [...cartItems, newItem];
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
      removeItemFromListHandler(item.medicineName);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeItemFromCartHandler = (item) => {
    let updatedCartItem = [...cartItems];
    const existingCartItem = updatedCartItem.find(
      (medicineItem) => medicineItem.medicineName === item.medicineName
    );

    if (Number(existingCartItem.quantity) > 1) {
      existingCartItem.quantity = Number(existingCartItem.quantity) - 1;
    } else {
      updatedCartItem = updatedCartItem.filter(
        (medicineItem) => medicineItem.medicineName !== item.medicineName
      );
    }
    setCartItems(updatedCartItem);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItem));
  };

  const cartContext = {
    items: items,
    totalAmount: 0,
    addItem: addItemToListHandler,
    removeItem: removeItemFromListHandler,
    cartItems: cartItems,
    addCartItem: addItemToCartHandler,
    removeCartItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <div className="cart-provider">{props.children}</div>
    </CartContext.Provider>
  );
};

export default CartProvider;
