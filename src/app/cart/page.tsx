"use client";

import styled from "styled-components";
import Header from "../../../components/Header";
import Center from "../../../components/Center";
import Button from "../../../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../components/CartContext";
import axios from "axios";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/Cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>You cart is empty</div>}
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products?.length > 0 && (
                  <tr>
                    {products.map((product: any) => (
                      <div>
                        {cartProducts.filter((id) => id === product._id)
                          .length > 1 ? (
                          <>
                            {product.title} (x
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                            )
                          </>
                        ) : (
                          <>{product.title}</>
                        )}
                      </div>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Address 2" />
              <Button black block>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
