import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
// import useAuth from '../../../hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  // const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    username: Yup.string().required('Please enter a Username'),
    firstName: Yup.string().required('Please enter a First Name'),
    lastName: Yup.string().required('Please enter a Second Name'),
    eMail: Yup.string().required('Please enter a eMail'),
    repName: Yup.string().required('Please enter an Rep.Name'),
  });

  const defaultValues = {
    username: 'John',
    firstName: 'John',
    lastName: 'Doe',
    eMail: 'john@example.com ',
    repName: 'Admin',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     if (file) {
  //       setValue(
  //         'photoURL',
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <Card sx={{ p: 3, ml: 'auto', mr: 'auto', maxWidth: '400px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="username" label="Username" disabled/>
              <RHFTextField name="firstName" label="First Name" disabled/>
              <RHFTextField name="lastName" label="Last Name" disabled/>
              <RHFTextField name="eMail" label="E-Mail" disabled/>
              <RHFTextField name="repName" label="Rep.Name" disabled/>
            </Box>

            {/* <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack> */}
          </FormProvider>
        </Grid>
      </Grid>
    </Card>
  );
}
