import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function NewPassword() {
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: "Can't connect Server!" });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="newPassword"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirm_password"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Set New Password
      </LoadingButton>
    </FormProvider>
  );
}
