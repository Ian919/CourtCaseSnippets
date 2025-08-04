import React, { useState } from 'react';
import CourtCase from './CourtCase';
import { Container, Typography, Box } from '@mui/material';
import { courtCases } from './data/data';
const App = () => {
  const [filteredCases, setFilteredCases] = useState(courtCases);

  const handleDelete = (selectedValues) => {
    const newCases = filteredCases.filter((caseData) => {
      const caseDate = new Date(caseData.start_date).toLocaleDateString();
      const caseParticipantTypes = caseData.parties.filter((party) => party.is_matched).map((party) => party.role_name);
      console.log(caseParticipantTypes)
      const caseCourt = caseData.court_name;
      console.log(caseCourt)
      const caseType = caseData.type_name;
      const caseResult = caseData.result || 'Не указан';

      return (
        !selectedValues.dates.has(caseDate) &&
        !caseParticipantTypes.some((type) => selectedValues.participantTypes.has(type)) &&
        !selectedValues.courts.has(caseCourt) &&
        !selectedValues.caseTypes.has(caseType) &&
        !selectedValues.results.has(caseResult)
      );
    });
    setFilteredCases(newCases);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Список судебных дел
      </Typography>
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
    </Container>
  );
};

export default App;