import { ReactNode, createContext, useState, SetStateAction } from "react";

type CartContextProviderProps = {
  children: ReactNode;
};

type CartContextType = {
  addProduct: (productId: string) => void;
  cartProducts: string[];
  setCartProducts: React.Dispatch<SetStateAction<string[]>>;
};

export const CartContext = createContext<CartContextType>({
  addProduct: () => {},
  cartProducts: [],
  setCartProducts: () => {},
});

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);
  function addProduct(productId: any) {
    setCartProducts((prev) => [...prev, productId]);
  }
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
