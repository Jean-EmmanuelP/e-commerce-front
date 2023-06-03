"use client";

import Featured from "../../components/Featured";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import NewProduct from "../../components/NewProduct";

export default function Home() {
  const [product, setProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetch("/api/productId")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setProduct(data.product);
            console.log(data.product);
          }
        });
    }

    if (isMounted) {
      fetch("/api/newProduct")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setNewProduct(data.newProducts);
            console.log(data.newProducts);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProduct products={newProduct} />
    </div>
  );
}