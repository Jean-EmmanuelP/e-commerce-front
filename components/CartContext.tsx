import {
  ReactNode,
  createContext,
  useState,
  SetStateAction,
  useEffect,
} from "react";

type CartContextProviderProps = {
  children: ReactNode;
};

type CartContextType = {
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  cartProducts: string[];
  setCartProducts: React.Dispatch<SetStateAction<string[]>>;
};

export const CartContext = createContext<CartContextType>({
  addProduct: () => {},
  removeProduct: () => {},
  cartProducts: [],
  setCartProducts: () => {},
});

export function CartContextProvider({ children }: CartContextProviderProps) {
  const localData = localStorage.getItem("cart");
  const defaultProduct = localData ? JSON.parse(localData) : [];
  const [cartProducts, setCartProducts] = useState<string[]>(() => {
    return defaultProduct || [];
  });
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      if (localData) {
        setCartProducts(JSON.parse(localData));
      }
    }
  }, []);
  function addProduct(productId: any) {
    setCartProducts((prev) => [...prev, productId]);
  }
  function removeProduct(productId: any) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      } else {
        return [...prev];
      }
    });
  }
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
