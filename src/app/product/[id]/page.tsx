"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Center from "../../../../components/Center";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import styled from "styled-components";
import WhiteBox from "../../../../components/WhiteBox";
import ProductImage from "../../../../components/ProductImage";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  __v: number;
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

export default function ProductPage() {
  const pathname = usePathname();
  const id = pathname!.split("/").pop();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log(`Sending id: ${id}`); // Log the sent id
      fetch("/api/searchByProductId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the id in the body
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProduct(data.product);
            console.log(data.product);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [id]);

  return (
    <>
      <Header />
      <Center>
        {product && (
          <ColWrapper>
            <WhiteBox>
            <ProductImage src={product.images} />
            </WhiteBox>
            <div>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
            </div>
          </ColWrapper>
        )}
      </Center>
    </>
  );
}
