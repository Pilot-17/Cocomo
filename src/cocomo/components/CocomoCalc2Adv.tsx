import React, { useState, useMemo } from "react";
import {
  ratingFactor,
  costDrivers,
  calculateIntermediateCocomo,
  calculateCocomo2,
  costDriversCocomo2,
  calculateCocomo2Advance,
  ResultColumn,
  Name
} from "cocomo";
import styled from "styled-components";
import { RadioGroup, RadioGroupCocomo2 } from "components";
import useMediaQuery from "react-use-media-query-hook";
import { costDriversCocomo2Advance, ratingFactorCocomo2, ratingFactorCocomo2Advance } from "cocomo/interface";

const InitialValue: ratingFactorCocomo2Advance = {
  a1:   3,
  a2:   3,
  a3:   3,
  a4:   3,
  a5:   3,
  a6:   3,
  a7:   3,
  a8:   3,
  a9:   3,
  a10:  3,
  a11:  3,
  a12:  3,
  a13:  3,
  a14:  3,
  a15:  3,
  a16:  3,
  a17:  3,
  a18:  3,
  a19:  3,
  a20:  3,
  a21:  3,
  a22:  3,
};

const driversKeys = [
    // – параметры персонала:
  { key: "a1", text: "1. Возможности аналитика" },
  { key: "a2", text: "2. Опыт разработки приложений" },
  { key: "a3", text: "3. Возможности программиста" },
  { key: "a4", text: "4. Продолжительность работы персонала" },
  { key: "a5", text: "5. Опыт работы с платформой" },
  { key: "a6", text: "6. Опыт использования языка программирования и инструментальных средств" },

  // Параметры продукта
  { key: "a7", text: "7. Требуемая надежность программы" },
  { key: "a8", text: "8. Размер базы данных" },
  { key: "a9", text: "9. Сложность программы" },
  { key: "a10", text: "10. Требуемая возможность многократного использования" },
  { key: "a11", text: "11. Соответствие документации потребностям жизненного цикла" },

    // Параметры платформы
    { key: "a12", text: "12. Ограничения времени выполнения" },
    { key: "a13", text: "13. Ограничения памяти" },
    { key: "a14", text: "14. Изменяемость платформы" },

    // Параметры проекта
    { key: "a15", text: "15. Использование инструментальных программных средств" },
    { key: "a16", text: "16. Многоабонентская (удаленная) разработка" },
    { key: "a17", text: "17. Требуемое выполнение графика работ" },

    // Параметры масштаба
    { key: "a18", text: "18. Прецедентность, наличие опыта аналогичных разработок" },
    { key: "a19", text: "19. Гибкость процесса разработки" },
    { key: "a20", text: "20. Архитектура и разрешение рисков" },
    { key: "a21", text: "21. Сработанность команды" },
    { key: "a22", text: "22. Зрелость процессов" },
];

interface Cocomo2PropsAdvance { KLoC: number }

export const CocomoCalc2Advance: React.FC<Cocomo2PropsAdvance> = ({ KLoC }) => {

  const [drivers, setDrivers] = useState(InitialValue);
  const isMobile = useMediaQuery("(max-width: 400px)");

  const handleUpdate = (driver: string, newValue: number) =>
    setDrivers({ ...drivers, [driver]: newValue });

  const res = useMemo(() => calculateCocomo2Advance(KLoC, drivers), [
    drivers,
    KLoC,
  ]);

  return (
    <>
    <Grid1>
      <ResultColumn title={Round(res.PM)} label="Трудоемкость(PM), чел.× мес" />
      <ResultColumn title={Round(res.TM)} label="Время разработки(TM), мес" />
    </Grid1>

      <hr />

      <Columns>
        {isMobile ? (
          <>
            <div>Оч. низ.</div>
            <div>Низ.</div>
            <div>Сред.</div>
            <div>Выс.</div>
            <div>Оч. выс.</div>
            <div>Крит. выс.</div>
          </>
        ) : (
          <>
            <div>Очень низкий</div>
            <div>Низкий</div>
            <div>Средний</div>
            <div>Высокий</div>
            <div>Очень высокий</div>
            <div>Критически высокий</div>
          </>
        )}
      </Columns>

      <>
        {driversKeys.map(({ key, text }) => (
            <>

              {(() => {
                if (key === "a1") {
                  return (
                      <Name>Характеристики персонала</Name>
                  )
                } else if (key === "a7") {
                  return (
                      <Name>Параметры продукта</Name>
                  )
                } else if (key === "a12") {
                  return (
                      <Name>Параметры платформы</Name>
                  )
                } else if (key === "a15") {
                  return (
                      <Name>Параметры проекта</Name>
                  )
                } else if (key === "a18") {
                  return (
                      <Name>Факторы масштаба</Name>
                  )

                }
              })()}



            <Grid>
          <RadioGroup
            title={text}
            selectRadio={handleUpdate}
            value={drivers[key]}
            radioValues={costDriversCocomo2Advance[key]}
            group={key}
            key={key}
          />
            </Grid>
            </>
        ))}
      </>
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
  grid-template-columns: repeat(6, 1fr);
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
