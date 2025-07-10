import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartFavorite, setCartFavorite] = useState([]);

  return (
    <AppContext.Provider
      value={{ cartCount, setCartCount, cartFavorite, setCartFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

