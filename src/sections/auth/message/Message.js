// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
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
};

export default function Message({text}) {
  return (
    <div>
      <LogoOnlyLayout />
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            {text}
          </Typography>
        </ContentStyle>
      </Container>
    </div>
  );
}
