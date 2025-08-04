import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

const Modal = ({ isOpen, onClose, caseData, allCases, onDelete }) => {
  const [selectedValues, setSelectedValues] = useState({
    dates: new Set(),
    participantTypes: new Set(),
    courts: new Set(),
    caseTypes: new Set(),
    results: new Set(),
  });

  if (!isOpen) return null;

  const uniqueDates = [...new Set(allCases.map((caseItem) => new Date(caseItem.start_date).toLocaleDateString()))];
  const uniqueParticipantTypes = [...new Set(caseData.parties.map((party) => party.role_name))];
  const uniqueCourts = [...new Set(allCases.map((caseItem) => caseItem.court_name))];
  const uniqueCaseTypes = [...new Set(allCases.map((caseItem) => caseItem.type_name))];
  const uniqueResults = [...new Set(allCases.map((caseItem) => caseItem.result || 'Не указан'))];

  const handleCheckboxChange = (category, value) => {
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
      <DialogContent dividers sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
      </DialogContent>
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

export default Modal;