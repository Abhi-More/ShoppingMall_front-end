import { useState, useContext, createContext } from "react";

const CartContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  
  return (
    <CartContext.Provider value={[user, setUser]}>
      {children}
    </CartContext.Provider>
  );
};
//custom hook
const useInfo = () => useContext(CartContext);

export { useInfo, UserProvider };
