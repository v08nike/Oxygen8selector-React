// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';

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

export default function VerifyCode() {
  return (
    <Page title="Verify Code">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Please check your email!
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
