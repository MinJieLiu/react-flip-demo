import React from "react";
import { MacScrollbar } from "mac-scrollbar";
import "mac-scrollbar/dist/mac-scrollbar.css";
import styled from "styled-components";

const StyledListBox = styled.div`
  position: relative;
  height: 800px;
  font-size: 32px;
  border: 1px solid #ddd;
  border-radius: 2px;

  .list-title {
    position: absolute;
    top: 0;
    left: 20px;
    font-size: 14px;
    padding: 0 10px;
    transform: translateY(-50%);
    background-color: white;
  }

  .ms-container {
    width: 100%;
    height: 100%;
    padding: 32px 20px;
  }
`;

interface ListBoxProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export function ListBox({ title, children }: ListBoxProps) {
  return (
    <StyledListBox>
      <div className="list-title">{title}</div>
      <MacScrollbar>{children}</MacScrollbar>
    </StyledListBox>
  );
}

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  color: #fff;
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
  background: #f99b0b;
  border: 1px solid #f99b0b;
  border-radius: 4px;
  outline: 0;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s ease-out;
  appearance: none;
  user-select: none;
  touch-action: manipulation;

  &:active {
    background-color: #f99b0b99;
  }
`;

export const SquareBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SquareItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
`;

export const SortBox = styled.div`
  padding: 20px;
  background-color: #eee;
`;

export const SortItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border-radius: 4px;
  color: #999999ff;
  font-size: 24px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 20%) 0 1px 2px 0;
  user-select: none;
  cursor: move;
`;
