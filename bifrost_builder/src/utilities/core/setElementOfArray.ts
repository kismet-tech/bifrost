interface SetElementOfArrayProps<T> {
  array: T[];
  index: number;
  updatedValue: T;
}

export const setElementOfArray = <T>({
  array,
  index,
  updatedValue,
}: SetElementOfArrayProps<T>) => {
  return [...array.slice(0, index), updatedValue, ...array.slice(index + 1)];
};
