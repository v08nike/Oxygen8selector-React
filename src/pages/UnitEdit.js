import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector } from '../redux/store';
import { addNewUnit, updateUnit } from '../redux/slices/jobsReducer';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect } from '../components/hook-form';
import { PATH_JOB, PATH_JOBS, PATH_UNIT } from '../routes/paths';

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

export default function UnitEdit() {
  const navigate = useNavigate();
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;

  const unitInfo = useSelector(
    (state) =>
      state.jobs.unitList
        .filter((item) => item.jobId.toString() === jobId)[0]
        .data.filter((item) => item.unitId.toString() === unitId)[0]
  );

  const UnitSchema = Yup.object().shape({
    tag: Yup.string().required('Please enter a Tag'),
    quantity: Yup.string().required('Please enter a Quantity'),
    location: Yup.string().required('Please enter a Location'),
    orientation: Yup.string().required('Please enter a Orientation'),
    handling: Yup.string().required('Please select a Handling'),
    unitType: Yup.string().required('Please enter a UnitType'),
    controlPreference: Yup.string().required('Please enter a Control Preference'),
    CFM: Yup.string().required('Please enter a CFM'),
    ASD: Yup.string().required('Please enter a ASD'),
    ERC: Yup.string().required('Please enter a ERC'),
    DVG: Yup.string().required('Please enter a DVG'),
    unitModel: Yup.string().required('Please select a UnitModel'),
    unitVoltage: Yup.string().required('Please select a UnitVoltage'),
    qa_filter1: Yup.string().required('Please select a QA Filter'),
    ra_filter1: Yup.string().required('Please enter a RA Filter'),
    preheat: Yup.string().required('Please enter a Preheat'),
    cooling: Yup.string().required('Please enter a Cooling'),
    heating: Yup.string().required('Please enter a Heating'),
    qa_filter2: Yup.string().required('Please enter a QA Filter'),
    ra_filter2: Yup.string().required('Please enter a RA Filter'),
    qa_filter3: Yup.string().required('Please enter a QA Filter'),
    ra_filter3: Yup.string().required('Please enter a RA Filter'),
  });

  const defaultValues = {
    tag: '',
    quantity: '',
    location: '',
    orientation: '',
    handling: '',
    unitType: '',
    controlPreference: '',
    CFM: '',
    ASD: '',
    ERC: '',
    DVG: '',
    unitModel: '',
    unitVoltage: '',
    qa_filter1: '',
    ra_filter1: '',
    preheat: '',
    cooling: '',
    heating: '',
    qa_filter2: '',
    ra_filter2: '',
    qa_filter3: '',
    ra_filter3: '',
  };

  if (isEdit)
    Object.entries(unitInfo).forEach(([key, value]) => {
      defaultValues[key] = value;
    });

  const methods = useForm({
    resolver: yupResolver(UnitSchema),
    defaultValues,
  });

  const {
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    if (!isEdit) {
      data.unitId = 100;
      addNewUnit({ jobId, data });
    } else updateUnit({ jobId, unitId, data });
    navigate(PATH_UNIT.view(jobId));
  };

  return (
    <Page title={isEdit ? 'Unit: Edit' : 'Unit: New'}>
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <HeaderBreadcrumbs
              heading={isEdit ? 'Edit Unit' : 'Add New Unit'}
              links={[
                { name: 'My Jobs', href: PATH_JOBS.root },
                { name: 'Job Dashboard', href: PATH_JOB.dashboard(jobId) },
                { name: 'Unit View', href: PATH_UNIT.view(jobId) },
                { name: isEdit ? 'Edit Unit' : 'Add New Unit' },
              ]}
              action={
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {isEdit ? 'Save Changes' : 'Add Unit'}
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
                        <RHFTextField size="small" name="qa_filter1" label="QA Filter" />
                        <RHFTextField size="small" name="ra_filter1" label="RA Filter" />
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
                        <RHFTextField size="small" name="qa_filter2" label="QA Filter" />
                        <RHFTextField size="small" name="ra_filter2" label="RA Filter" />
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="qa_filter3" label="QA Filter" />
                        <RHFTextField size="small" name="ra_filter3" label="RA Filter" />
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
