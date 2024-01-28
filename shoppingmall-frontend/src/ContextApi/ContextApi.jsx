// import { useState, useContext, createContext, useEffect } from "react";
// import AppContext from "./CreateContextApi";

// const ContextApi = (props) => {
  
//   const [userId,setuserId] = useState("ABC")

//   return (
//     <AppContext.Provider value={[userId,setuserId]}>{props.children}</AppContext.Provider>
//   );
// };
// export default ContextApi;

import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const UserProvider = ({ children }) => {
  // const [cartCount, setcartCount] = usecartCount();
  const [user, setUser] = useState([]);

  // useEffect(() => {
  //   let existingCartCount = localStorage.getItem("cartCount");
  //   if (existingCartCount) setcartCount(existingCartCount);
  // }, []);

  return (
    <CartContext.Provider value={[user, setUser]}>
      {children}
    </CartContext.Provider>
  );
};
//custom hook
const useInfo = () => useContext(CartContext);

export { useInfo, UserProvider };
