import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';

//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: theme.palette.primary.main,
}));

// -----------------------------------------------

SetUnitInfo.propTypes = {
  isEdit: PropTypes.string,
  values: PropTypes.object,
};

export default function SetUnitInfo({ isEdit, values }) {
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

  const defaultValues = isEdit
    ? values
    : {
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
    // setValue,
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
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <HeaderBreadcrumbs
              heading="Edit Job Info"
              links={[
                { name: 'My Dashboard', href: '/jobDashboard' },
                { name: isEdit ? 'Edit Unit Info' : 'Add Unit Info' },
              ]}
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
                  <CardHeaderStyle title="GENTERAL UNIT INFORMATION" />
                  <CardContent sx={{ height: '600px' }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="tag" label="Tag" />
                      <RHFTextField size="small" name="quantity" label="Quantity" />
                      <RHFSelect size="small" name="location" label="Location" placeholder="">
                        <option value="" />
                        <option value="ca">CAN</option>
                        <option value="us">USA</option>
                        <option value="indi">Indoor</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="orientation" label="Orientation" placeholder="">
                        <option value="" />
                        <option value="hor">Horizontal</option>
                        <option value="vir">Virtical</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="handling" label="Handling" placeholder="">
                        <option value="" />
                        <option value="left">left</option>
                        <option value="right">right</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="unitType" label="Unit Type" placeholder="">
                        <option value="" />
                        <option value="ERV">Energy Recovery Ventilator (ERV) </option>
                        <option value="vir">Energy Recovery Ventilator (DEG) </option>
                      </RHFSelect>
                      <RHFSelect size="small" name="controlPreference" label="Control Preference" placeholder="">
                        <option value="" />
                        <option value="cv">Constant Volume </option>
                      </RHFSelect>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="AIR FLOW DATA" />
                  <CardContent sx={{ height: '600px' }}>
                    <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="CFM" label="Supply Air (CFM)" />
                        <RHFTextField size="small" name="ASD" label="Supply Air (ASD)" />
                        <RHFTextField size="small" name="ERC" label="Supply Air (ERC)" />
                        <RHFTextField size="small" name="DVG" label="Supply Air (DVG)" />
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="unitModel" label="Unit Model" />
                        <RHFTextField size="small" name="unitVoltage" label="Unit Voltage" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="COMPONENTS" />
                  <CardContent sx={{ height: '600px' }}>
                    <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="qa_filter" label="QA Filter" />
                        <RHFTextField size="small" name="ra_filter" label="RA Filter" />
                        <RHFSelect size="small" name="preheat" label="Preheat" placeholder="">
                          <option value="" />
                          <option value="auto">Auto</option>
                        </RHFSelect>
                        <RHFSelect size="small" name="cooling" label="Cooling" placeholder="">
                          <option value="" />
                          <option value="n/a">N/A</option>
                        </RHFSelect>
                        <RHFSelect size="small" name="heating" label="Heating" placeholder="">
                          <option value="" />
                          <option value="n/a">N/A</option>
                        </RHFSelect>
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="qa_filter" label="QA Filter" />
                        <RHFTextField size="small" name="ra_filter" label="RA Filter" />
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="qa_filter" label="QA Filter" />
                        <RHFTextField size="small" name="ra_filter" label="RA Filter" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
      </RootStyle>
    </Page>
  );
}
