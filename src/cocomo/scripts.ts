import {
  modeCoefficients,
  Organic,
  Semidetach,
  Embedded,
  costDrivers
} from "cocomo";
import { createModuleResolutionCache } from "typescript";
import { costDriversCocomo2, costDriversCocomo2Advance, ratingFactor, ratingFactorCocomo2, ratingFactorCocomo2Advance } from "./interface";

// Базовые уравнения COCOMO:

// Трудоемкость = ab(KLoC)bb [человеко-месяцев]
// Срок разработки или длительность = cb(Трудоемкость)db [месяцев]
// Число разработчиков = Трудоемкость/ Срок разработки [человек]

/** Трудоемкость = ab(KLoC)bb [человеко-месяцев] */
export const personMonths = ({ ab, bb }: modeCoefficients, KLoC: number) =>
  ab * KLoC ** bb;

/** Срок разработки или длительность = cb(Трудоемкость)db [месяцев] */
export const months = (coefficients: modeCoefficients, KLoC: number) =>
  coefficients.cb * personMonths(coefficients, KLoC) ** coefficients.db;

/** Число разработчиков = Трудоемкость/ Срок разработки [человек] */
export const persons = (team: modeCoefficients, KLoC: number) =>
  !KLoC ? 0 : personMonths(team, KLoC) / months(team, KLoC);

/** Принимает тип команды, количество тысяч строк кода и возвращает объект
 *  с рассчитаными трудоёмкостью, сроком разработки в месяцах
 *  и рекоммендуемое число разработчиков */
export const calculateBasicCocomo = (
  team: "organic" | "semidetach" | "embedded",
  KLoC: number
) => {
  const coefficients = getMode(team);
  return {
    personMonths: personMonths(coefficients, KLoC),
    months: months(coefficients, KLoC),
    persons: persons(coefficients, KLoC)
  };
};

/** Возвращает коэффициенты одного из трёх базовых типов команд */
const getMode = (team: "organic" | "semidetach" | "embedded") => {
  if (team === "organic") return Organic;
  if (team === "semidetach") return Semidetach;
  if (team === "embedded") return Embedded;
  throw new Error(
    `Переданный режим '${team}' не соответсвует одному из трёх базовых типов!`
  );
};

/** E = ai * (KLoC ^ bi) * РФТ
 *  E – трудоемкость разработки ПО в человеко-месяцах,
 *  KLoC – оценочный размер программы в тысячах строках исходного кода,
 *  РФТ – регулирующий фактор, рассчитанный ранее.
 */
export const calculateIntermediateCocomo = (
  team: "organic" | "semidetach" | "embedded",
  KLoC: number,
  drivers: ratingFactor
) => {
  const { ai, bi } = getMode(team);
  const values = Object.entries(drivers).map(
    ([key, value]) => costDrivers[key][value - 1]
  );

  const RFT: number = values.reduce(Multiply, 1);

  const PM = ai * KLoC ** bi * RFT;

  const coefficients = getMode(team);
  const TM = coefficients.cb * PM ** coefficients.db

  // 𝑷𝑴 = 𝒂𝒊 × (𝑺𝑰𝒁𝑬)𝒃𝒊,
  // 𝑻𝑴 = 𝒄𝒊 × (𝑷𝑴)𝒅𝒊,
  
  return {
    PM: PM,
    TM: TM
  }
};

const Multiply = (total: number, value: number) => total * value;


// Cocomo2

export const calculateCocomo2 = (
  KLoC: number,
  drivers: ratingFactorCocomo2
) => {
  const values = Object.entries(drivers).map(
    ([key, value]) => costDriversCocomo2[key][value-1]
  );
  const RFT: number = values.slice(0, 7).reduce(Multiply, 1);
  const RFT1: number = values.slice(0, 6).reduce(Multiply, 1);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const SF: number = values.slice(7).reduce(reducer);
  console.log(SF)
  const SIZE = KLoC
  const A = 2.94
  const B = 0.91
  const E = B + (0.01 * SF)
  const EAF = RFT
  const EAF1 = RFT1
  const PM = EAF*A*(Math.pow(SIZE,E))
  const PMforTM = EAF1*A*(Math.pow(SIZE,E))
  const SCED = drivers.sced
  const TM = SCED * 3.67 * (Math.pow(PMforTM,(0.28 + 0.2*(E-B))))
  return {
    PM: PM,
    TM: TM
  }
};

export const calculateCocomo2Advance = (
  KLoC: number,
  drivers: ratingFactorCocomo2Advance
) => {

  const values1 = Object.entries(drivers).map(
    ([key, value]) => costDriversCocomo2Advance[key][value-1]
  );
  const RFT: number = values1.slice(0, 16).reduce(Multiply, 1);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const SF: number = values1.slice(17).reduce(reducer);
  const SIZE = KLoC
  const B = 0.91
  const A = 2.45
  const E = B + (0.01 * SF)
  const EAF = RFT
  const PM = EAF*A*(Math.pow(SIZE,E))
  const SCED = drivers.a17
  const TM = SCED * 3.67 * (Math.pow(PM,0.28 + 0.2*(E-B)))
  return {
    PM: PM,
    TM: TM
  }
};