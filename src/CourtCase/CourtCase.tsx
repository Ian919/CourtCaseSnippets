import React, { useState } from 'react';
import {
  CardContent,
  Button,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Link,
  Box
} from '@mui/material';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

import { CaseData, SelectedValues } from '../types';
import { getParticipantType, formatDate } from '../utils/caseUtils';
import { 
  StyledCard, 
  StyledClickableBox, 
  StyledExpandedContent, 
  StyledTypography 
} from './CourtCase.styled';

interface CourtCaseProps {
  caseData: CaseData;
  allCases: CaseData[];
  onDelete: (selectedValues: SelectedValues) => void;
}

const CourtCase: React.FC<CourtCaseProps> = ({ caseData, allCases, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const participantType = getParticipantType(caseData);

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <StyledClickableBox flex={1} onClick={() => setIsExpanded(!isExpanded)}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Box minWidth="150px">
                <Typography>
                  <strong>Дата:</strong> {formatDate(caseData.start_date)}
                </Typography>
              </Box>
              <Box minWidth="150px">
                <Typography>
                  <strong>Тип участника:</strong> {participantType}
                </Typography>
              </Box>
              <Box minWidth="200px">
                <Typography>
                  <strong>Суд:</strong> {caseData.court_name}
                </Typography>
              </Box>
              <Box minWidth="150px">
                <Typography>
                  <strong>Вид дела:</strong> {caseData.type_name}
                </Typography>
              </Box>
              <Box minWidth="150px">
                <Typography>
                  <strong>Результат:</strong> {caseData.result || 'Не указан'}
                </Typography>
              </Box>
            </Box>
          </StyledClickableBox>
          <Box>
            <Button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ExpandMore /> : <ExpandLess />}
            </Button>
          </Box>
        </Box>
        <Collapse in={isExpanded}>
          <StyledExpandedContent>
            <Typography>
              <strong>Номер дела:</strong> {caseData.number}
            </Typography>
            <Typography>
              <strong>Регион:</strong> {caseData.region}
            </Typography>
            <Typography>
              <strong>Судья:</strong> {caseData.judge}
            </Typography>
            <Typography>
              <strong>Описание:</strong> {caseData.papers_pretty.join(', ')}
            </Typography>
            <StyledTypography>
              <strong>Стороны:</strong>
            </StyledTypography>
            <List>
              {caseData.parties.map((party, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText
                    primary={`${party.role_name}: ${party.name}`}
                    secondary={party.papers_pretty.join(', ')}
                  />
                </ListItem>
              ))}
            </List>
            <StyledTypography>
              <strong>Прогресс:</strong>
            </StyledTypography>
            <List>
              {caseData.progress.map((step, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText
                    primary={step.name}
                    secondary={step.date ? `(${step.date})` : ''}
                  />
                </ListItem>
              ))}
            </List>
            <StyledTypography>
              <strong>Ссылки:</strong>
            </StyledTypography>
            <List>
              {caseData.links.card.map((link, index) => (
                <ListItem key={index} disablePadding>
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    Карточка дела
                  </Link>
                </ListItem>
              ))}
            </List>
          </StyledExpandedContent>
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default CourtCase;