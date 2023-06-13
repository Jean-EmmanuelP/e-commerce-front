import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

interface NewProductProps {
  products:
    | {
        _id: string;
        title: string;
        description: string;
        price: number;
        images: string[];
      }[]
    | null;
}

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProduct({ products }: NewProductProps) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products?.map((product) => (
          <ProductBox {...product} />
        ))}
      </ProductsGrid>
    </Center>
  );
}
