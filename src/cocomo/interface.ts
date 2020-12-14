/** Константы, которые нужны для расчёта базовой модели COCOMO */
export interface modeCoefficients {
  ab: number;
  bb: number;
  cb: number;
  db: number;
  ai: number;
  bi: number;
}

/** Органический (Organic mode) – маленькие команды с хорошим опытом работы и не жесткими требованиями к разработке */
export const Organic: modeCoefficients = {
  ab: 2.4,
  bb: 1.05,
  cb: 2.5,
  db: 0.38,
  ai: 3.2,
  bi: 1.05
};

/**  Полуразделенный вид (Intermediate/Semi-detached mode) – средние по размеру команды
 * со смешанным опытом разработки и со смешанными требованиями (как жесткими, так и нет). */
export const Semidetach: modeCoefficients = {
  ab: 3,
  bb: 1.12,
  cb: 2.5,
  db: 0.35,
  ai: 3,
  bi: 1.12
};

/** Встроенный вид (Intered/Embedded mode) – разрабатываются с учетом множества жестких ограничений
 * (по аппаратному, программному, операционному обеспечению и т.д.) */
export const Embedded: modeCoefficients = {
  ab: 3.6,
  bb: 1.2,
  cb: 2.5,
  db: 0.32,
  ai: 2.8,
  bi: 1.2
};

// prettier-ignore-start
type oneSixrating =  0 | 1 | 2 | 3 | 4 | 5 | 6;
type oneFiveRating = 0 | 1 | 2 | 3 | 4 | 5;
type oneFourRating = 0 | 1 | 2 | 3 | 4;
type twoFiveRating =         2 | 3 | 4 | 5;
type threeSixRating =            3 | 4 | 5 | 6;

/** Средний уровень рассчитывает трудоемкость разработки как функцию от размера программы
 * и множества «факторов стоимости», включающих субъективные оценки характеристик продукта,
 * проекта, персонала и аппаратного обеспечения. Каждому из 15 факторов ставится рейтинг
 * по шестибальной шкале, начиная от «очень низкий» и до «экстра высокого».
 * Значения рейтинга заменяются множителями трудоемкости из таблицы costDrivers.
 * Произведение всех множителей трудоемкости составляет Регулирующий фактор трудоемкости (РФТ) */
export interface ratingFactor {
  /* Характеристики продукта */
  reliability:              oneFiveRating;  // Требуемая надежность ПО
  sizeOfDatabase:           twoFiveRating;  // Размер БД приложения
  Complexity:               oneSixrating;   // Сложность продукта

  /* Характеристики аппаратного обеспечения */
  performanceConstraints:   threeSixRating;  // Ограничения быстродействия при выполнении программы
  memoryConstraints:        threeSixRating;  // Ограничения памяти
  environmentVolatility:    twoFiveRating;   // Неустойчивость окружения виртуальной машины
  turnaboutTime:            twoFiveRating;   // Требуемое время восстановления

  /* Характеристики персонала */
  analystCapability:        oneFiveRating;  // Аналитические способности
  applicationsExperience:   oneFiveRating;  // Способности к разработке ПО
  programmerCapability:     oneFiveRating;  // Опыт разработки
  virtualMachineExperience: oneFourRating;  // Опыт использования виртуальных машин
  languageExperience:       oneFourRating;  // Опыт разработки на языках программирования

  /* Характеристики проекта */
  applicationMethods: oneFiveRating;  // Использование инструментария разработки ПО
  softwareTools:      oneFiveRating;  // Применение методов разработки ПО
  requiredSchedule:   oneFiveRating;  // Требования соблюдения графика разработки
}

export const costDrivers = {
  reliability:              [0.75, 0.88, 1, 1.15, 1.40, null],  // Требуемая надежность ПО
  sizeOfDatabase:           [null, 0.94, 1, 1.08, 1.16, null],  // Размер БД приложения
  Complexity:               [0.70, 0.85, 1, 1.15, 1.30, 1.65],  // Сложность продукта

  /* Характеристики аппаратного обеспечения */
  performanceConstraints:   [null, null, 1, 1.11, 1.30, 1.66],  // Ограничения быстродействия при выполнении программы
  memoryConstraints:        [null, null, 1, 1.06, 1.21, 1.56],  // Ограничения памяти
  environmentVolatility:    [null, 0.87, 1, 1.15, 1.30, null],  // Неустойчивость окружения виртуальной машины
  turnaboutTime:            [null, 0.87, 1, 1.07, 1.15, null],  // Требуемое время восстановления

  /* Характеристики персонала */
  analystCapability:        [1.46, 1.19, 1, 0.86, 0.71, null],  // Аналитические способности
  applicationsExperience:   [1.29, 1.13, 1, 0.91, 0.82, null],  // Способности к разработке ПО
  programmerCapability:     [1.42, 1.17, 1, 0.86, 0.7,  null],  // Опыт разработки
  virtualMachineExperience: [1.21, 1.10, 1, 0.9,  null, null],  // Опыт использования виртуальных машин
  languageExperience:       [1.14, 1.07, 1, 0.95, null, null],  // Опыт разработки на языках программирования

  /* Характеристики проекта */
  applicationMethods:       [1.24, 1.10, 1, 0.91, 0.82, null],  // Использование инструментария разработки ПО
  softwareTools:            [1.24, 1.10, 1, 0.91, 0.83, null],  // Применение методов разработки ПО
  requiredSchedule:         [1.23, 1.08, 1, 1.04, 1.10, null],  // Требования соблюдения графика разработки
};

type t1 =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ratingFactorCocomo2 {
  pers:  t1; 
  prex:  t1;   
  rcpx:  t1; 
  ruse:  t1; 
  pdif:  t1; 
  fcil:  t1; 
  sced:  t1;
  
  prec:  t1;
  flex:  t1;
  resl:  t1;
  team:  t1;
  pmat:  t1;
}

export interface ratingFactorCocomo2Advance {
  a1: t1;
  a2: t1;  
  a3: t1;  
  a4: t1;  
  a5: t1;  
  a6: t1;  
  a7: t1; 
  a8: t1; 
  a9: t1; 
  a10: t1; 
  a11: t1; 
  a12: t1; 
  a13:  t1;
  a14:  t1;
  a15: t1; 
  a16: t1; 
  a17:  t1;
  a18: t1; 
  a19: t1;  
  a20: t1;
  a21: t1;  
  a22:  t1;
}
export const costDriversCocomo2 = {

  pers:    [2.12, 1.62, 1.25, 1.0, 0.83, 0.63, 0.50], 
  prex:    [1.59, 1.33, 1.22, 1.0, 0.87, 0.74, 0.62],  
  rcpx:    [0.49, 0.60, 0.83, 1.0, 1.33, 1.91, 2.72], 
  ruse:    [null, null, 0.95, 1.0, 1.07, 1.15, 1.24],  
  pdif:    [null, null, 0.87, 1.0, 1.29, 0.81, 2.61],  
  fcil:    [1.43, 1.30, 1.10, 1.0, 0.87, 0.73, 0.62], 
  sced:    [null, 1.43, 1.14, 1.0, 1.0, null, null],  

  // разделить на рызные константы
  // SF
  prec:    [null, 6.20, 4.96, 3.72, 2.48, 1.24, 0.0],  
  flex:    [null, 5.07, 4.05, 3.04, 2.03, 1.01, 0.0],  
  resl:    [null, 7.07, 5.65, 4.24, 2.83, 1.41, 0.0],  
  team:    [null, 5.48, 4.38, 3.29, 2.19, 1.10, 0.0],  
  pmat:    [null, 7.80, 6.24, 4.68, 3.12, 1.56, 0.0],  
};


export const costDriversCocomo2Advance = {

  a1:    [1.42, 1.29, 1.0, 0.85, 0.71, null],  
  a2:    [1.22, 1.10, 1.0, 0.88, 0.81, null],  
  a3:    [1.34, 1.15, 1.0, 0.88, 0.76, null],  
  a4:    [1.29, 1.12, 1.0, 0.90, 0.81, null],  
  a5:    [1.19, 1.09, 1.0, 0.91, 0.85, null],  
  a6:    [1.20, 1.09, 1.0, 0.91, 0.84, null],
  
  a7:    [0.84, 0.92, 1.0, 1.10, 1.26, null],  
  a8:    [null, 0.23, 1.0, 1.14, 1.28, null],  
  a9:    [0.73, 0.87, 1.0, 1.17, 1.34, 1.74],  
  a10:   [null, 1.95, 1.0, 1.07, 1.15, 1.24],  
  a11:   [0.81, 8.91, 1.0, 1.11, 1.23, null],
  
  a12:   [null, null, 1.0, 1.11, 1.29, 1.63],  
  a13:   [null, null, 1.0, 1.05, 1.17, 1.46],  
  a14:   [null, 0.87, 1.0, 1.15, 1.30, null], 

  a15:   [1.17, 1.09, 1.0, 0.90, 0.78, null],  
  a16:   [1.22, 1.09, 1.0, 0.93, 0.86, null],  
  a17:   [1.43, 1.14, 1.0, 1.0, 1.0, null], 

  // SF
  a18:    [6.20, 4.96, 3.72, 2.48, 1.24, 0.0],  
  a19:    [5.07, 4.05, 3.04, 2.03, 1.01, 0.0],  
  a20:    [7.07, 5.65, 4.24, 2.83, 1.41, 0.0],  
  a21:    [5.48, 4.38, 3.29, 2.19, 1.10, 0.0],  
  a22:    [7.80, 6.24, 4.68, 3.12, 1.56, 0.0],  
};