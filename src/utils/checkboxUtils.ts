import { SelectedValues } from "../types";

/**
 * Обрабатывает изменение состояния чекбокса
 */
export const handleCheckboxChange = (
  selectedValues: SelectedValues,
  setSelectedValues: React.Dispatch<React.SetStateAction<SelectedValues>>,
  category: keyof SelectedValues,
  value: string
): void => {
  setSelectedValues((prev) => {
    const newSet = new Set(prev[category]);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    return { ...prev, [category]: newSet };
  });
};

/**
 * Создает начальное состояние для SelectedValues
 */
export const createInitialSelectedValues = (): SelectedValues => ({
  dates: new Set(),
  participantTypes: new Set(),
  courts: new Set(),
  caseTypes: new Set(),
  results: new Set(),
});
