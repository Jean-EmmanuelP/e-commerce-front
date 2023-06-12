'use client'

import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
import Center from "../../../components/Center";
import ProductsGrid from "../../../components/ProductsGrid";
import Title from "../../../components/Title";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("/api/allProducts")
      .then((response) => response.json())
      .then((data) => setProducts(data.allProducts));
  }, []);

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        {products && <ProductsGrid products={products} />}
      </Center>
    </>
  );
}
