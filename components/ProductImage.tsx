"use client";

import { useState } from "react";
import styled from "styled-components";

interface ProductImageProps {
  src: string[];
}

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const MainImage = styled.img`
  grid-column: span 4;
  width: 600px;
  height: 300px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImageButton = styled.img`
  max-width: 80%;
  max-height: 80%;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImage({ src }: ProductImageProps) {
  const [activeImage, setActiveImage] = useState(src[0]);
  const [images, setImages] = useState(src);

  const switchImages = (clickedImage: string, index: number) => {
    const newImages = [...images];
    newImages[0] = clickedImage;
    newImages[index] = activeImage;
    setImages(newImages);
    setActiveImage(newImages[0]);
  };

  return (
      <ImageContainer>
        {images.map((image, index) => {
          if (index === 0) {
            return (
              <MainImage key={index} src={activeImage} alt="Product Main" />
            );
          } else {
            return (
              <ImageButtonWrapper key={index}>
                <ImageButton
                  src={image}
                  alt="Product"
                  onClick={() => switchImages(image, index)}
                />
              </ImageButtonWrapper>
            );
          }
        })}
      </ImageContainer>
  );
}
