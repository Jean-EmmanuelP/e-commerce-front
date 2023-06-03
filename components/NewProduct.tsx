import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

interface NewProductProps {
  products: {
    _id: string
    title: string;
    description: string;
    price: number;
    images: string[];
  }[] | null;
}

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 30px;
`;

export default function NewProduct({ products }: NewProductProps) {
  return (
    <Center>
      <ProductsGrid>
        {products?.map((product) => (
          <ProductBox {...product}/>
        ))}
      </ProductsGrid>
    </Center>
  );
}
