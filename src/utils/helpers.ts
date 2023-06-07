const SIZE_NAMES: { [key: number]: string } = {
  0: 'B',
  1: 'kB',
  2: 'MB',
  3: 'GB',
  4: 'TB',
  5: 'PB',
};

/**
 * Приводит размер к строке
 * @param bytes - размер в байтах
 */
export const bytesToSizeString = (bytes: number): string => {
  let result: [] | Array<string> = [];
  const formattedSize = getFormattedSize(bytes);
  formattedSize.forEach((size, index) => {
    if (size > 0) {
      result = [...result, `${size} ${SIZE_NAMES[index]}`];
    }
  });
  return result.reverse().join(' ');
};

/**
 * Рекурсивная функция, которая форматирует размер, разбивая его на единицы измерения информации (возвращает кол-во kB, MB и т.д. в виде массива чисел)
 * Возвращаемый массив отсортирован в порядке возрастания еденицы измерения (B, kB, MB и т.д.)
 * @param size - размер в байтах
 * @param accumulator
 */
export const getFormattedSize = (
  size: number,
  accumulator: [] | Array<number> = []
): Array<number> => {
  if (size < 1024) {
    return [...accumulator, size];
  } else {
    return getFormattedSize(Math.floor(size / 1024), [
      ...accumulator,
      size % 1024,
    ]);
  }
};
