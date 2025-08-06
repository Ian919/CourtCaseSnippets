import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

import { CaseData, SelectedValues } from './types';
import {
  getUniqueDates,
  getUniqueParticipantTypes,
  getUniqueCourts,
  getUniqueCaseTypes,
  getUniqueResults,
} from './utils/caseUtils';
import { handleCheckboxChange, createInitialSelectedValues } from './utils/checkboxUtils';
import { CourtModalDialogContent } from './CourtModal/CourtModal.styled';

interface CourtModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: CaseData;
  allCases: CaseData[];
  onDelete: (selectedValues: SelectedValues) => void;
}

const CourtModal: React.FC<CourtModalProps> = ({ isOpen, onClose, caseData, allCases, onDelete }) => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>(createInitialSelectedValues());

  if (!isOpen) return null;

  const uniqueDates = getUniqueDates(allCases);
  const uniqueParticipantTypes = getUniqueParticipantTypes(allCases);
  const uniqueCourts = getUniqueCourts(allCases);
  const uniqueCaseTypes = getUniqueCaseTypes(allCases);
  const uniqueResults = getUniqueResults(allCases);

  const handleCheckboxChange = (category: keyof SelectedValues, value: string) => {
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

  const handleDelete = () => {
    onDelete(selectedValues);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Уникальные значения категорий</DialogTitle>
      <CourtModalDialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Даты:
          </Typography>
          {uniqueDates.map((date, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedValues.dates.has(date)}
                  onChange={() => handleCheckboxChange('dates', date)}
                />
              }
              label={date}
            />
          ))}
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Типы участников:
          </Typography>
          {uniqueParticipantTypes.map((type, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedValues.participantTypes.has(type)}
                  onChange={() => handleCheckboxChange('participantTypes', type)}
                />
              }
              label={type}
            />
          ))}
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Суды:
          </Typography>
          {uniqueCourts.map((court, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedValues.courts.has(court)}
                  onChange={() => handleCheckboxChange('courts', court)}
                />
              }
              label={court}
            />
          ))}
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Виды дел:
          </Typography>
          {uniqueCaseTypes.map((type, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedValues.caseTypes.has(type)}
                  onChange={() => handleCheckboxChange('caseTypes', type)}
                />
              }
              label={type}
            />
          ))}
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Результаты:
          </Typography>
          {uniqueResults.map((result, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedValues.results.has(result)}
                  onChange={() => handleCheckboxChange('results', result)}
                />
              }
              label={result}
            />
          ))}
        </Box>
      </CourtModalDialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error" variant="contained">
          Удалить
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourtModal;