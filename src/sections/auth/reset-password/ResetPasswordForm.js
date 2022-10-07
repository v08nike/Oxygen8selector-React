import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// jwt
import sign from 'jwt-encode';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// utils
import axios from '../../../utils/axios';
// config
import { serverUrl } from '../../../config';
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
        const today = new Date();
        const jwt = sign({ email: data.email, expireTime: today.getMilliseconds() + 3000000 }, 'secret');
        const emailBody = `https://oxygen8selector.netlify.app/auth/reset-password?token=${jwt}`;
          axios.post(`https://rocket-at.net/email/sendMailOverHTTPA`, {
          email: data.email,
          subject: 'Oxygent8Selctor Reset Password',
          emailBody,
        });

        navigate(PATH_AUTH.verify);
      } else {
        setError('afterSubmit', { ...errors, message: 'Your eamil is not correct!' });
      }
    } catch (error) {
      setError('afterSubmit', { ...error, message: "Can't connect server!" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Send Request
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
