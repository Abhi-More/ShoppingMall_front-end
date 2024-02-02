import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // const [cartCount, setcartCount] = usecartCount();
  const [cartCount, setcartCount] = useState(0);

  useEffect(() => {
    let existingCartCount = localStorage.getItem("cartCount");
    if (existingCartCount) setcartCount(existingCartCount);
  }, []);

  return (
    <CartContext.Provider value={[cartCount, setcartCount]}>
      {children}
    </CartContext.Provider>
  );
};
//custom hook
const useCartCount = () => useContext(CartContext);

export { useCartCount, CartProvider };
