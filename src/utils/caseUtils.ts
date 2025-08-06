import { CaseData, SelectedValues } from "../types";

/**
 * Фильтрует дела на основе выбранных значений
 */
export const filterCases = (
  cases: CaseData[],
  selectedValues: SelectedValues
): CaseData[] => {
  return cases.filter((caseData) => {
    const caseDate = new Date(caseData.start_date).toLocaleDateString();
    const caseParticipantTypes = caseData.parties
      .filter((party) => party.is_matched)
      .map((party) => party.role_name);
    const caseCourt = caseData.court_name;
    const caseType = caseData.type_name;
    const caseResult = caseData.result || "Не указан";

    return (
      !selectedValues.dates.has(caseDate) &&
      !caseParticipantTypes.some((type) =>
        selectedValues.participantTypes.has(type)
      ) &&
      !selectedValues.courts.has(caseCourt) &&
      !selectedValues.caseTypes.has(caseType) &&
      !selectedValues.results.has(caseResult)
    );
  });
};

/**
 * Извлекает уникальные даты из списка дел
 */
export const getUniqueDates = (cases: CaseData[]): string[] => {
  return [
    ...new Set(
      cases.map((caseItem) =>
        new Date(caseItem.start_date).toLocaleDateString()
      )
    ),
  ];
};

/**
 * Извлекает уникальные типы участников из списка дел
 */
export const getUniqueParticipantTypes = (cases: CaseData[]): string[] => {
  const allTypes = cases.flatMap((caseItem) =>
    caseItem.parties.map((party) => party.role_name)
  );
  return [...new Set(allTypes)];
};

/**
 * Извлекает уникальные суды из списка дел
 */
export const getUniqueCourts = (cases: CaseData[]): string[] => {
  return [...new Set(cases.map((caseItem) => caseItem.court_name))];
};

/**
 * Извлекает уникальные типы дел из списка дел
 */
export const getUniqueCaseTypes = (cases: CaseData[]): string[] => {
  return [...new Set(cases.map((caseItem) => caseItem.type_name))];
};

/**
 * Извлекает уникальные результаты из списка дел
 */
export const getUniqueResults = (cases: CaseData[]): string[] => {
  return [...new Set(cases.map((caseItem) => caseItem.result || "Не указан"))];
};

/**
 * Получает тип участника для конкретного дела
 */
export const getParticipantType = (caseData: CaseData): string => {
  const matchedParty = caseData.parties.find((party) => party.is_matched);
  return matchedParty ? matchedParty.role_name : "Неизвестно";
};

/**
 * Форматирует дату для отображения
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
