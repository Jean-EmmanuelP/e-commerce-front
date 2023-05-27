"use client";

import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  primary?: boolean;
  [x: string]: any;
}

const StyledButton = styled.button<ButtonProps>`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;
      color: #fff;
    `}
  
    ${(props) =>
    props.size === "large" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

export default function Button({
  children,
  size,
  primary,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton size={size} primary={primary} {...rest}>
      {children}
    </StyledButton>
  );
}
