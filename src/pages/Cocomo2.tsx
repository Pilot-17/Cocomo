import React, { useState } from "react";
import styled from "styled-components";
import { Collapse, InputNumber, Select } from "antd";
import { IntermediateCocomo, CoefficientTable, Result } from "cocomo";
import { CocomoCalc2 } from "cocomo/components/CocomoCalc2";

const { Panel } = Collapse;
const { Option } = Select;

export const Cocomo2 = () => {
  document.title = "Калькулятор COCOMO";

  const [KLoC, setKLoC] = useState(0);

  return (
    <Wrapper>
      <InputContainer>
        <label>
          Нам нужно написать
          <InputNumber
            value={KLoC}
            onChange={(num) => setKLoC(Number(num))}
            style={{ margin: "12px", width: "140px" }}
            size="large"
          />
          тысяч строк кода
        </label>
      </InputContainer>
      <hr />

      <CocomoCalc2 KLoC={KLoC} />
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 920px;

  @media (max-width: 1150px) {
    max-width: 80vw;
  }

  @media (max-width: 420px) {
    max-width: calc(100vw - 48px);
  }
`;

const HideBar = styled(Collapse)`
  &:focus-within {
    box-shadow: 0 0 0 2px rgba(39, 94, 254, 0.3);
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 599px) {
    flex-direction: column;
    & label {
      align-items: center;
      display: grid;
      text-align: center;
      justify-content: center;
    }
  }
`;
