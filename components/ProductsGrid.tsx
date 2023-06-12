"use client";

import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
  return (
    <StyledProductsGrid>
      {products?.map((product) => (
        <ProductBox {...product} />
      ))}
    </StyledProductsGrid>
  );
}
