import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// jwt
import sign from 'jwt-encode';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Alert, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Layout
import LogoOnlyLayout from '../../../layouts/LogoOnlyLayout';

// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// utils
import axios from '../../../utils/axios';
// config
import { serverUrl } from '../../../config';
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

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${serverUrl}/api/user/saveresetpassword`, data);

      if (response.data) {
        const now = new Date();
        const jwt = sign({ email: data.email, expireTime: now.getTime() + 900000 }, 'secret');
        const emailBody = `https://oxygen8selector.netlify.app/auth/reset-password/${jwt}`;
        axios.post(`${serverUrl}/api/auth/sendrequest`, {
          email: data.email,
          subject: 'Oxygent8Selctor Reset Password',
          emailBody,
        });

        navigate(PATH_AUTH.verify);
      } else {
        setError('afterSubmit', { ...errors, message: 'Your email does not exist!' });
      }
    } catch (error) {
      setError('afterSubmit', { ...error, message: "Can't connect server!" });
    }
  };

  return (
    <ContentStyle sx={{ textAlign: 'center' }}>
      <LogoOnlyLayout />
      <Typography variant="h3" paragraph>
        Forgot your password?
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account and We will email you a link to reset your password.
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField name="email" label="Email address" />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Send Request
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
          Back
      </Button>

    </ContentStyle>
  );
}
