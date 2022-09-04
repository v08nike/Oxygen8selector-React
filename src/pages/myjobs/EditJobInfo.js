import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';

//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

export default function EditJobInfo() {
  const { enqueueSnackbar } = useSnackbar();

  // const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    job_name: Yup.string().required('Please enter a Job Name'),
    basis_of_design: Yup.string().required('Please enter a Basis Of Design'),
    reference: Yup.string().required('Please select a Reference'),
    revision: Yup.string().required('Please enter a Revision'),
    created_date: Yup.string().required('Please enter a Created Date'),
    revised_date: Yup.string().required('Please enter a Revised Date'),
    company_name: Yup.string().required('Please enter a Company Name'),
    contact_name: Yup.string().required('Please enter a Contact Name'),
    application: Yup.string().required('Please enter a Application'),
    uom: Yup.string().required('Please select a UoM'),
    country: Yup.string().required('Please select a County'),
    state: Yup.string().required('Please select a Province / State'),
    city: Yup.string().required('Please enter a city'),
    ashare_design_conditions: Yup.string().required('Please enter a ASHARE Design Conditions'),
  });

  const defaultValues = {
    job_name: '',
    basis_of_design: '',
    reference: '',
    revision: '',
    created_date: '',
    revised_date: '',
    company_name: '',
    contact_name: '',
    application: '',
    uom: '',
    country: '',
    state: '',
    city: '',
    ashare_design_conditions: '',
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

  return (
    <Page title="Job Infomation">
      <Container sx={{ mt: '20px' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <HeaderBreadcrumbs
            heading="Edit Job Info"
            links={[{ name: 'My Dashboard', href: '/job-dashboard' }, { name: 'Edit Job Info' }]}
            action={
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            }
          />
          <Grid container spacing={3}>
            <Grid item xs={4} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Project Information" />
                <CardContent>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="job_name" label="Job Name" />
                    <RHFSelect size="small" name="basis_of_design" label="Besis of Design" placeholder="">
                      <option value="" />
                      <option value="N/a">N/a</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                      <option value="tbd">TBD</option>
                    </RHFSelect>
                    <RHFTextField size="small" name="basis_of_design" label="Besis of Design" />
                    <RHFTextField size="small" name="reference" label="Reference #" />
                    <RHFTextField size="small" name="revision" label="Revision #" />
                    <RHFTextField size="small" name="created_date" label="Created Date" />
                    <RHFTextField size="small" name="revised_date" label="Revised Date" />
                    <RHFSelect size="small" name="company_name" label="Company Name" placeholder="">
                      <option value="" />
                      <option value="oxygen8">Oxygen8</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="contact_name" label="Contact Name" placeholder="">
                      <option value="" />
                    </RHFSelect>
                    <RHFTextField size="small" name="application" label="Applicaton" />
                    <RHFSelect size="small" name="uom" label="UoM" placeholder="">
                      <option value="" />
                    </RHFSelect>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Project Information" />
                <CardContent>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <FormControlLabel control={<Checkbox />} label="Test New Price" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Project Location" />
                <CardContent>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="country" label="Country" placeholder="">
                      <option value="" />
                      <option value="can">CAN</option>
                      <option value="usa">USA</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="state" label="Province / State" placeholder="">
                      <option value="" />
                      <option value="ak">AK</option>
                      <option value="al">AL</option>
                      <option value="ar">AR</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="city" label="City" placeholder="">
                      <option value="" />
                      <option value="ak">ADAK (NAS)</option>
                      <option value="al">AMBLER</option>
                      <option value="ar">ANVIK</option>
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ashare_design_conditions"
                      label="ASHRAE Design Conditions"
                      placeholder=""
                    >
                      <option value="" />
                      <option value="1">0.4% / 99.6%</option>
                      <option value="2">1% / 99%</option>
                    </RHFSelect>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Outdoor Air Design Conditions" />
                <CardContent>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="alltitude" label="Alltitude" />
                    <RHFTextField size="small" name="summer_air_db" label="Summer Outdoor Air DB (F)" />
                    <RHFTextField size="small" name="summer_air_wb" label="Summer Outdoor Air WB (F)" />
                    <RHFTextField size="small" name="summer_air_rh" label="Summer Outdoor Air RH (%)" />
                    <RHFTextField size="small" name="winter_air_db" label="Winter Outdoor Air DB" />
                    <RHFTextField size="small" name="winter_air_wb" label="Winter Outdoor Air WB" />
                    <RHFTextField size="small" name="winter_air_rh" label="Winter Outdoor Air RH" />
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Return Air Design Conditions" />
                <CardContent>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="summer_return_db" label="Summer Return Air DB (F)" />
                    <RHFTextField size="small" name="summer_return_wb" label="Summer Return Air WB (F)" />
                    <RHFTextField size="small" name="summer_return_rh" label="Summer Return Air RH (%)" />
                    <RHFTextField size="small" name="winter_return_db" label="Winter Return Air DB" />
                    <RHFTextField size="small" name="winter_return_wb" label="Winter Return Air WB" />
                    <RHFTextField size="small" name="winter_return_rh" label="Winter Return Air RH" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </Page>
  );
}
