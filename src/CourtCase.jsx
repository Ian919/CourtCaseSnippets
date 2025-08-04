import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Link,
  Box
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Modal from './CourtModal';

const CourtCase = ({ caseData, allCases, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const matchedParty = caseData.parties.find((party) => party.is_matched);
  const participantType = matchedParty ? matchedParty.role_name : 'Неизвестно';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
                    <Button
              variant="contained"
              color="success"
              onClick={() => setIsModalOpen(true)}
              sx={{ mr: 1 }}
            >
              Категории
            </Button>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={10} onClick={() => setIsExpanded(!isExpanded)} sx={{ cursor: 'pointer' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography>
                  <strong>Дата:</strong> {new Date(caseData.start_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>
                  <strong>Тип участника:</strong> {participantType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography>
                  <strong>Суд:</strong> {caseData.court_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>
                  <strong>Вид дела:</strong> {caseData.type_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography>
                  <strong>Результат:</strong> {caseData.result || 'Не указан'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} textAlign={{ xs: 'left', md: 'right' }}>
            <Button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ExpandMore /> : <ExpandLess />}
            </Button>
          </Grid>
        </Grid>
        <Collapse in={isExpanded}>
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
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
            <Typography sx={{ mt: 1 }}>
              <strong>Стороны:</strong>
            </Typography>
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
            <Typography sx={{ mt: 1 }}>
              <strong>Прогресс:</strong>
            </Typography>
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
            <Typography sx={{ mt: 1 }}>
              <strong>Ссылки:</strong>
            </Typography>
            <List>
              {caseData.links.card.map((link, index) => (
                <ListItem key={index} disablePadding>
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    Карточка дела
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      </CardContent>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseData={caseData}
        allCases={allCases}
        onDelete={onDelete}
      />
    </Card>
  );
};

export default CourtCase;