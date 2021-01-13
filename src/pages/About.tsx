import React from "react";
import { Button, Collapse } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoefficientTable } from "cocomo";
const { Panel } = Collapse;
export const About: React.FC = () => {
  document.title = "Калькулятор COCOMO";
  return (

    <Wrapper>


      <HideBar>
        <Panel header="Описание моделей" key="1">
          <div>
            <label>Модель базового уровня</label>
            <p> Двухпараметрическая модель. В качестве параметров выступают объем программы (число строк кода) и тип
                проекта. В качестве выходных данных для всех моделей являются:
            </p><p>PM (People×Month)–трудоемкость (чел.×мес.);
            </p>
            <p>TM (Time at Month)–время разработки в календарных месяцах;
            </p>
            <p>SIZE–объем программного продукта в тысячах строк исходного текста.</p>
            <p>Модель этого уровня подходит для ранней быстрой приблизительной оценки затрат, но точность её весьма
                низка, т.к. не учитываются такие факторы, как квалификация персонала, характеристики оборудования,
                опыт
                применения современных методов разработки программного обеспечения и современных инструментальных
                сред
                разработки и др.
            </p>
            <label> Промежуточный уровень</label>
            <p> На этом уровне базовая модель уточнена за счет ввода дополнительных 15 «атрибутов стоимости» (или
                факторов затрат) Cost Drivers(CDk), которые сгруппированы по четырем категориям:
                Характеристики продукта (Product Attributes):
            </p>
            <p>-Характеристики продукта(Product Attributes):
            </p>
            <p>1. Требуемая надежность ПО(Required Software Reliability);
            </p>
            <p>2. Размер БД приложения(Size of Application Database);
            </p>
            <p>3. Сложность продукта(Complexity of the Product);
            </p>
            <p>-Характеристики аппаратного обеспечения (Hardware Аttributes):
            </p>
            <p>4. Ограничения быстродействия при выполнении программы(Run-Time Performance Constraints);
            </p>
            <p>5. Ограничения памяти(Memory Constraints);
            </p>
            <p>6. Неустойчивость окружения виртуальной машины (Volatility of the Virtual Machine Environment);
            </p>
            <p>7. Требуемое время восстановления(Required Turnabout Time);
            </p>
            <p>-Характеристики персонала (Personnel Аttributes):
            </p>
            <p>8. Аналитические способности(Analyst Capability);
            </p>
            <p>9. Способности к разработке ПО(Software Engineer Capability);
            </p>
            <p>10. Опыт разработки(Applications Experience);
            </p>
            <p>11. Опыт использования виртуальных машин(Virtual Machine Experience);
            </p>
            <p>12. Опыт разработки на языках программирования(Programming Language Experience);
            </p>
            <p>-Характеристики проекта (ProjectАttributes):
            </p>
            <p>13. Использование инструментария разработки ПО(Use of Software Tools);
            </p>
            <p>14. Применение методов разработки ПО(Application of Software Engineering Methods);
            </p>
            <p>15. Требования соблюдения графика разработки(Required Development Schedule).
            </p>
            <label>Предварительная оценка</label>
            <p> Стадия предварительной оценки трудоемкости программного проекта (Early Design). Для этой оценки
                необходимо оценить для проекта уровень семи множителей трудоемкости EMj:
            </p>
            <p>–параметры персонала:
            </p>
            <p>1. PERS (Personnel Capability)–квалификация персонала (уровень Extra Low–аналитики и программисты
                имеют
                низшую квалификацию, текучесть больше 45%; уровень Extra High–аналитики и программисты имеют высшую
                квалификацию, текучесть меньше 4%);
            </p>
            <p>2. PREX (Personal Experience)–опыт персонала (Extra Low–новое приложение, инструменты и платформа;
                Extra
                High–приложение, инструменты и платформа хорошо известны);
            </p>
            <p>–параметры продукта:
            </p>
            <p>3. RCPX (Product Reliability and Complexity)–сложность и надежность продукта (Extra Low–продукт
                простой,
                специальных требований по надежности нет, БД маленькая, документация не требуется; ExtraHigh–продукт
                очень сложный, требования по надежности жесткие, БД сверхбольшая, документация требуется в полном
                объеме);
            </p>
            <p>4. RUSE (Developed for Reusability)–разработка для повторного использования (Low–не требуется; Extra
                High–предполагается переиспользование в других продуктах);
            </p>
            <p>–параметры платформы:
            </p>
            <p>5. PDIF (Platform Difficulty)–сложность платформы разработки (Extra Low–специальные ограничения по
                памяти и быстродействию отсутствуют, платформа стабильна; Extra High–жесткие ограничения по памяти и
                быстродействию, платформа нестабильна);
            </p>
            <p>–параметры проекта:
            </p>
            <p>6. FCIL (Facilities) – оборудование (Extra Low–инструменты простейшие, коммуникации затруднены; Extra
                High–интегрированные средства поддержки жизненного цикла, интерактивные мультимедиа коммуникации);
            </p>
            <p>7. SCED (Required Development Schedule)–требуемое выполнение графика работ(Very Low–75% от
                номинальной
                длительности; Very High–160% от номинальной длительности).</p>
            <p>-факторы масштаба:
            </p>
            <p>8. PREC (Precedentedness)-Прецедентность, наличие опыта аналогичных разработок.
            </p>
            <p>9. FLEX (Development Flexibility)-Гибкость процесса разработки.
            </p>
            <p>10. RESL (Architecture/Risk Resolution)-Архитектура и разрешение рисков.
            </p>
            <p>11. TEAM (Team Cohesion)-Сработанность команды.
            </p>
            <p>12. PMAT (Process Maturity)-Зрелость процессов.</p>

            <label> Стадия детальной оценки</label>
            <p>Стадия предварительной оценки трудоемкости программного проекта(Early Design). Для этой оценки
                необходимо оценить для проекта уровень семи множителей трудоемкости EMj:
            </p>
            <p>–параметры персонала:
            </p>
            <p>1. ACAP (Analyst Capability)-Возможности аналитики
            </p>
            <p>2. AEXP (Applications Experience)-Опыт разработки приложений
            </p>
            <p>3. PCAP (Programmer Capability)-Возможности программиста
            </p>
            <p>4. PCON (Personnel Continuity)-Продолжительность работы персонала
            </p>
            <p>5. PEXP (Platform Experience)-Опыт работы с платформой
            </p>
            <p>6.LTEX (Language and Tool Experience)-Опыт использования языка программирования и инструментальных средств
            </p>
            <p>–параметры продукта:
            </p>
            <p>7. RELY (Required Software Resolution)-Требуемая надежность программы
            </p>
            <p>8. DATA (Database Size)-Размер базы данных
            </p>
            <p>9. CPLX (Software Product Complexity)- Сложность программы
            </p>
            <p>10. RUSE (Required Reusability)-Требуемая возможность многократного использования
            </p>
            <p>11. DOCU (Documentation Match to Life-Cycle Needs)-Соответствие документации потребностям жизненного цикла
            </p>
            <p>–параметры платформы:
            </p>
            <p>12. TIME (Execution Time Constraints)-Ограничение времени выполнения
            </p>
            <p>13. STOR (Main Storage Constraint)-Ограничение памяти
            </p>
            <p>14. PVOL (Platform Volatility)-Изменяемость платформы
            </p>
            <p>–параметры проекта:
            </p>
            <p>15. TOOL (Use of Software Tools)-Использование инструментальных программных средств
            </p>
            <p>16. SITE (Multsite Development)-Многоабонентская (удаленная) разработка
            </p>
            <p>17. SCED (Required Development Schedule)-Требуемое выполнение графика работ
            </p>
        </div>
        </Panel>
      </HideBar>

      <HideBar>
        <Panel header="Лицензионное соглашение с конечным пользователем" key="0">
        <div>
        MIT License <br/><br/>

Copyright (c) 2020 Кульбаев А. Б. <br/><br/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: <br/><br/>

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software. <br/><br/>

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        </div>
        </Panel>
      </HideBar>

      <HideBar>
        <Panel header="Информация о разработчике" key="0">
        <div>
        Разработчик Кульбаев А. Б. &copy; <br/> Работа выполнена студентом Томского Государственного Университета Систем Управления и Радиоэлектроники, факультета систем управления, кафедры автоматизированных систем управления, по дисциплине "Программная инженерия"
        </div>
        </Panel>
      </HideBar>
    </Wrapper>

  );
};

const HideBar = styled(Collapse)`
  &:focus-within {
    box-shadow: 0 0 0 2px rgba(39, 94, 254, 0.3);
  }
`;

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 1000px;

  & ul,
  & ol {
    margin-block-start: 1.3em;
    margin-block-end: 1.5em;
    margin-inline-start: 1em;
    margin-inline-end: 2em;
    padding-inline-start: 1em;
  }

  @media (max-width: 1050px) {
    max-width: 80vw;
  }

  @media (max-width: 520px) {
    max-width: calc(100vw - 48px);
  }
  @media (max-width: 400px) {
    max-width: calc(100vw - 36px);
    ul,
    ol {
      margin-inline-start: 0em;
      margin-inline-end: 0em;
      padding-inline-start: 0.75em;
    }
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 60px;
`;
