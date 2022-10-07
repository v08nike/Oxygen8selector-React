// React
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';
// PropTypes
import PropTypes from 'prop-types';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// layouts
import LogoOnlyLayout from '../../../layouts/LogoOnlyLayout';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Message({text}) {
  return (
    <div>
      <LogoOnlyLayout />
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            {text}
          </Typography>
          <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.resetPassword} sx={{ mt: 1 }}>
            Back
          </Button>
        </ContentStyle>
      </Container>
    </div>
  );
}
