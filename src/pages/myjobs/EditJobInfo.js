import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector } from '../../redux/store';
import { updateJob } from '../../redux/slices/myJobsReducer';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';
import { PATH_MY_JOBS } from '../../routes/paths';

//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

//------------------------------------------------

export default function EditJobInfo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const UpdateJobInfoSchema = Yup.object().shape({
    jobName: Yup.string().required('Please enter a Job Name'),
    basisOfDesign: Yup.string().required('Please enter a Basis Of Design'),
    referenceNo: Yup.string().required('Please select a Reference'),
    revision: Yup.string().required('Please enter a Revision'),
    createdDate: Yup.string().required('Please enter a Created Date'),
    revisedDate: Yup.string().required('Please enter a Revised Date'),
    rep: Yup.string().required('Please enter a Rep'),
    companyName: Yup.string().required('Please enter a Company Name'),
    contactName: Yup.string().required('Please enter a Contact Name'),
    application: Yup.string().required('Please enter a Application'),
    uom: Yup.string().required('Please select a UoM'),
    country: Yup.string().required('Please select a County'),
    state: Yup.string().required('Please select a Province / State'),
    city: Yup.string().required('Please enter a city'),
    ashareDesignConditions: Yup.string().required('Please enter a ASHARE Design Conditions'),
    alltitude: Yup.string(),
    summer_air_db: Yup.string(),
    summer_air_wb: Yup.string(),
    summer_air_rh: Yup.string(),
    winter_air_db: Yup.string(),
    winter_air_wb: Yup.string(),
    winter_air_rh: Yup.string(),
    summer_return_db: Yup.string(),
    summer_return_wb: Yup.string(),
    summer_return_rh: Yup.string(),
    winter_return_db: Yup.string(),
    winter_return_wb: Yup.string(),
    winter_return_rh: Yup.string(),
  });

  const defaultValues = {
    jobName: '',
    basisOfDesign: 'no',
    referenceNo: '',
    revision: 'Welcome',
    createdDate: '',
    revisedDate: '',
    companyName: 'oxygen8',
    contactName: 'Joe',
    application: 'I hope to work',
    uom: 'Joe',
    country: 'usa',
    state: 'al',
    city: 'al',
    ashareDesignConditions: '2',
    alltitude: '',
    summer_air_db: '',
    summer_air_wb: '',
    summer_air_rh: '',
    winter_air_db: '',
    winter_air_wb: '',
    winter_air_rh: '',
    summer_return_db: '',
    summer_return_wb: '',
    summer_return_rh: '',
    winter_return_db: '',
    winter_return_wb: '',
    winter_return_rh: '',
  };

  Object.entries(state).forEach(([key, value]) => {
    defaultValues[key] = value;
  });

  const methods = useForm({
    resolver: yupResolver(UpdateJobInfoSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onJobInfoSubmit = async (data) => {
    try {
      updateJob({ jobId: state.id, data });
      navigate('/jobDashboard', { state: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Job Infomation">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onJobInfoSubmit)}>
            <HeaderBreadcrumbs
              heading="Edit Job Info"
              links={[{ name: 'My Dashboard', href: '/jobDashboard' }, { name: 'Edit Job Info' }]}
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
                      <RHFTextField size="small" name="jobName" label="Project Name" />
                      <RHFSelect size="small" name="basisOfDesign" label="Basis of Design" placeholder="">
                        <option value="" />
                        <option value="N/a">N/a</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="tbd">TBD</option>
                      </RHFSelect>
                      <RHFTextField size="small" name="referenceNo" label="Reference #" />
                      <RHFTextField size="small" name="revision" label="Revision #" />
                      <RHFTextField size="small" name="createdDate" label="Created Date" />
                      <RHFTextField size="small" name="revisedDate" label="Revised Date" />
                      <RHFTextField size="small" name="rep" label="Rep" />
                      <RHFSelect size="small" name="companyName" label="Company Name" placeholder="">
                        <option value="" />
                        <option value="oxygen8">Oxygen8</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="contactName" label="Contact Name" placeholder="">
                        <option value="" />
                        <option value="Joe">Joe</option>
                      </RHFSelect>
                      <RHFTextField size="small" name="application" label="Applicaton" />
                      <RHFSelect size="small" name="uom" label="UoM" placeholder="">
                        <option value="" />
                        <option value="Joe">IDE</option>
                      </RHFSelect>
                    </Box>
                  </CardContent>
                </Card>
                {/* <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Project Information" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <FormControlLabel control={<Checkbox />} label="Test New Price" />
                    </Box>
                  </CardContent>
                </Card> */}
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
                        name="ashareDesignConditions"
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
      </RootStyle>
    </Page>
  );
}
