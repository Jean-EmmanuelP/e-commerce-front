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
  clearProducts: () => void;
  cartProducts: string[];
  setCartProducts: React.Dispatch<SetStateAction<string[]>>;
};

export const CartContext = createContext<CartContextType>({
  addProduct: () => {},
  removeProduct: () => {},
  clearProducts: () => {},
  cartProducts: [],
  setCartProducts: () => {},
});

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !window.location.href.includes("success")) {
      const localData = window.localStorage.getItem("cart");
      setCartProducts(localData ? JSON.parse(localData) : []);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      window.localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, hasMounted]);

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

  function clearProducts() {
    console.log(`came here also`);
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
