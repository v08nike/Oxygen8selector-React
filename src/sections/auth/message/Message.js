// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';
// PropTypes
import PropTypes from 'prop-types';
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

Message.propTypes = {
  text: PropTypes.string,
  initStates: PropTypes.func
}

export default function Message({text, initStates}) {
  return (
    <div>
      <LogoOnlyLayout />
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            {text}
          </Typography>
          <Button fullWidth size="large" onClick={initStates} sx={{ mt: 1 }}>
            Back
          </Button>
        </ContentStyle>
      </Container>
    </div>
  );
}
