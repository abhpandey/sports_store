import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove only one instance of the item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === productId);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1); // Remove only the first matching item
        return newCart;
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
