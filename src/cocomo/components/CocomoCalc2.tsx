import React, { useState, useMemo } from "react";
import { ratingFactor, costDrivers, calculateIntermediateCocomo, calculateCocomo2, costDriversCocomo2, ResultColumn } from "cocomo";
import styled from "styled-components";
import { RadioGroup, RadioGroupCocomo2 } from "components";
import useMediaQuery from "react-use-media-query-hook";
import { ratingFactorCocomo2 } from "cocomo/interface";

const InitialValue: ratingFactorCocomo2 = {
  pers: 4,
  prex: 4,
  rcpx: 4,
  ruse: 4,
  pdif: 4,
  fcil: 4,
  sced: 4,

  prec: 4,
  flex: 4,
  resl: 4,
  team: 4,
  pmat: 4,
};

const driversKeys = [
    // – параметры персонала:
  { key: "pers", text: "1. Квалификация персонала" },
  { key: "prex", text: "2. Опыт персонала" },
   //   – параметры продукта:
  { key: "rcpx", text: "3. Сложность и надежность продукта" },
  { key: "ruse", text: "4. Разработка для повторного использования" },
//   – параметры платформы
  { key: "pdif", text: "5. Сложность платформы разработки" },
//   – параметры проекта:
  { key: "fcil", text: "6. Оборудование" },
  { key: "sced", text: "7. Требуемое выполнение графика работ" },

  // факторы масштаба
  { key: "prec", text: "8. Прецедентность, наличие опыта аналогичных разработок" },
  { key: "flex", text: "9. Гибкость процесса разработки" },
  { key: "resl", text: "10. Архитектура и разрешение рисков" },
  { key: "team", text: "11. Сработанность команды" },
  { key: "pmat", text: "12. Зрелость процессов" },
];

interface Cocomo2Props { KLoC: number }

export const CocomoCalc2: React.FC<Cocomo2Props> = ({ KLoC }) => {
  
  const [drivers, setDrivers] = useState(InitialValue);
  const isMobile = useMediaQuery("(max-width: 400px)");

  const handleUpdate = (driver: string, newValue: number) =>
    setDrivers({ ...drivers, [driver]: newValue });

  const res = useMemo(() => calculateCocomo2(KLoC, drivers), [
    drivers,
    KLoC,
  ]);

  return (
    <>
       {/* <Res>
        <h3>{Round(res.PM)}</h3>
        <div className="label">Трудоемкость в человеко-месяцах</div>
        <h3>{Round(res.PM)}</h3>
        <div className="label">Трудоемкость в человеко-месяцах</div>
      </Res> */}


    <Grid1>
      <ResultColumn title={Round(res.PM)} label="Трудоемкость(PM), чел.× мес" />
      <ResultColumn title={Round(res.TM)} label="Время разработки(TM), мес" />
    </Grid1>

      <hr />

      <Columns>
        {isMobile ? (
          <>
            <div>Крит. низ.</div>
            <div>Оч. низ.</div>
            <div>Низ.</div>
            <div>Сред.</div>
            <div>Выс.</div>
            <div>Оч. выс.</div>
            <div>Крит. выс.</div>
          </>
        ) : (
          <>
            <div>Критически низкий</div>
            <div>Очень низкий</div>
            <div>Низкий</div>
            <div>Средний</div>
            <div>Высокий</div>
            <div>Очень высокий</div>
            <div>Критически высокий</div>
          </>
        )}
      </Columns>

      <Grid>
        {driversKeys.map(({ key, text }) => (
          <RadioGroupCocomo2
            title={text}
            selectRadio={handleUpdate}
            value={drivers[key]}
            radioValues={costDriversCocomo2[key]}
            group={key}
            key={key}
          />
        ))}
      </Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-gap: 8px;
  @media (min-width: 920px) {
    grid-template-columns: 120px 1fr;
  }
`;

const Res = styled.header`
  text-align: center;
  margin: 2em;
  & h3 {
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 28px;
    line-height: 1.35;
  }
  & .label {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const Columns = styled.div`
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  overflow: hidden;
  position: sticky;
  top: 0;
  padding: 1em 0;
  z-index: 1;

  @media (min-width: 920px) {
    padding-left: 120px;
  }

  & div {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 32px;
  }
`;

export const Grid1 = styled.div`
  display: grid;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    & > :not(:last-child) {
      border-right: 1px solid var(--input-placeholder, #ced6e0);
    }
  }

  @media (max-width: 599px) {
    margin: -20px 0;
    & > :not(:last-child) {
      border-bottom: 1px solid var(--input-placeholder, #ced6e0);
    }
  }
`;
const Round = (value: number) => (value == 0 ? 0 : Number(value).toFixed(2));
