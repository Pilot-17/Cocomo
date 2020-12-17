import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { CalculatorOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export const Nav = () => {
  const { pathname } = useLocation();

  return (
    <Menu
      style={{ 
        padding: "0 5vw"
    }}
      selectedKeys={[pathname]}
      mode="horizontal"
    >
      <Item key = "/about">
        <Link to="/about">
          <QuestionCircleOutlined />
          About
        </Link>
      </Item>

      <Item key = "/calc1">
        <Link to="/calc1">
          <CalculatorOutlined />
          Basic COCOMO
        </Link>
      </Item>

      <Item key = "/calc2">
        <Link to="/calc2">
          <CalculatorOutlined />
          Intermediate COCOMO
        </Link>
      </Item>

      <Item key = "/calc3">
        <Link to="/calc3">
          <CalculatorOutlined />
          Early Design COCOMOII
        </Link>
      </Item>


      <Item key = "/calc4">
        <Link to="/calc4">
          <CalculatorOutlined />
          Post Architecture COCOMOII
        </Link>
      </Item>

    </Menu>
  );
};

const Item = styled(Menu.Item)`
  line-height: 47px;
  &:focus-within {
    box-shadow: 0 0 0 2px rgba(39, 94, 254, 0.3);
  }
`;
