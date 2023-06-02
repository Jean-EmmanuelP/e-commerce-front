'use client'

import Featured from "../../components/Featured";
import Header from "../../components/Header";
import { useEffect, useState } from 'react';

export default function Home() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/api/productId')
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        console.log(data.product);
      });
  }, []);

  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}
