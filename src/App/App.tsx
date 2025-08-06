import React, { useState } from 'react';
import CourtCase from '../CourtCase/CourtCase';
import CourtModal from '../CourtModal/CourtModal';
import { Typography, Box, Button } from '@mui/material';
import { courtCases } from '../data/data';
import { CaseData, SelectedValues } from '../types';
import { filterCases } from '../utils/caseUtils';
import { StyledContainer } from './App.styled';

const App: React.FC = () => {
  const [filteredCases, setFilteredCases] = useState<CaseData[]>(courtCases);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = (selectedValues: SelectedValues): void => {
    const newCases = filterCases(filteredCases, selectedValues);
    setFilteredCases(newCases);
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Список судебных дел
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsModalOpen(true)}
        >
          Категории
        </Button>
      </Box>
      <Box>
        {filteredCases.length === 0 ? (
          <Typography color="text.secondary">Нет дел для отображения</Typography>
        ) : (
          filteredCases.map((caseData) => (
            <CourtCase
              key={caseData.id}
              caseData={caseData}
              allCases={courtCases}
              onDelete={handleDelete}
            />
          ))
        )}
      </Box>
      <CourtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseData={filteredCases[0] || courtCases[0]}
        allCases={courtCases}
        onDelete={handleDelete}
      />
    </StyledContainer>
  );
};

export default App; 