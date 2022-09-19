import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../utils/axios';
import { serverUrl } from '../../../config';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${serverUrl}/api/user/updatePassword`, {
        userId: localStorage.getItem('userId'),
        currentPassword: data.oldPassword,
        updatedPassword: data.newPassword,
      });

      if (response.data === 'incorrect_current_password') {
        setError('afterSubmit', { message: 'Incorrect Old Password!' });
      } else if (response.data === 'success') {
        setError('afterSubmitSuccess', { message: 'Updated successfully!' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3, mr: 'auto', ml: 'auto', maxWidth: '400px' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {!!errors.afterSubmit && (
            <Alert sx={{ width: '100%' }} severity="error">
              {errors.afterSubmit.message}
            </Alert>
          )}
          {!!errors.afterSubmitSuccess && (
            <Alert sx={{ width: '100%' }} severity="success">
              {errors.afterSubmitSuccess.message}
            </Alert>
          )}

          <RHFTextField name="oldPassword" type="password" label="Old Password" />

          <RHFTextField name="newPassword" type="password" label="New Password" />

          <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
