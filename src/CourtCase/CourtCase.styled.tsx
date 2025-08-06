import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const StyledCard = styled(Card)({
  marginBottom: '16px',
});

export const StyledClickableBox = styled(Box)({
  cursor: 'pointer',
});

export const StyledExpandedContent = styled(Box)({
  marginTop: '16px',
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
});

export const StyledTypography = styled(Typography)({
  marginTop: '8px',
}); 