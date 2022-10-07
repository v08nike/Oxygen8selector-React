import { Link as RouterLink, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
// jwt
import jwtDecode from 'jwt-decode';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
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

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.pathname);
  const [searchParams] = useSearchParams();
  
  if (searchParams.token !== undefined){
    const tokenData = jwtDecode(searchParams.token)
    console.log(tokenData);
  }

  return (
    <Page title="Reset Password">
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <LogoOnlyLayout />
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Please enter the email address associated with your account and We will email you a link to reset your
            password.
          </Typography>

          <ResetPasswordForm />

          <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
            Back
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
