import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Grid,
  CardHeader,
  CardContent,
  Card,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// paths
import { PATH_JOB, PATH_JOBS } from '../routes/paths';
// redux
import { useSelector } from '../redux/store';
import { updateJob } from '../redux/slices/jobsReducer';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../components/hook-form';

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

const ProjectInfoTableHeader = [
  'QTY',
  'TAG',
  'ITEM',
  'MODEL',
  'VOLTAGE',
  'CONTROLS PREFERENCE',
  'INSTALLATION',
  'DUCT CONNECTION',
  'HANDING',
  'PART DESC',
  'PART NUMBER',
  'PRICING',
];

const ProjectInfo = [
  [
    '1',
    'ERV1',
    'ERV',
    'C24IN',
    '208V/3ph/60Hz',
    'Constant Volume',
    'Vertical',
    'FP1',
    'LH',
    'NOVA_C24_ERV_S_I_L_V_S1_ND_01_02_03_04_2083_13_08',
    '900091-001',
    '$15,266.31',
  ],
  [
    '1',
    'ERV1',
    'ERV',
    'C24IN',
    '208V/3ph/60Hz',
    'Constant Volume',
    'Vertical',
    'FP1',
    'LH',
    'NOVA_C24_ERV_S_I_L_V_S1_ND_01_02_03_04_2083_13_08',
    '900091-001',
    '$15,266.31',
  ],
  [
    '1',
    'ERV1',
    'ERV',
    'C24IN',
    '208V/3ph/60Hz',
    'Constant Volume',
    'Vertical',
    'FP1',
    'LH',
    'NOVA_C24_ERV_S_I_L_V_S1_ND_01_02_03_04_2083_13_08',
    '900091-001',
    '$15,266.31',
  ],
  [
    '1',
    'ERV1',
    'ERV',
    'C24IN',
    '208V/3ph/60Hz',
    'Constant Volume',
    'Vertical',
    'FP1',
    'LH',
    'NOVA_C24_ERV_S_I_L_V_S1_ND_01_02_03_04_2083_13_08',
    '900091-001',
    '$15,266.31',
  ],
  [
    '1',
    'ERV1',
    'ERV',
    'C24IN',
    '208V/3ph/60Hz',
    'Constant Volume',
    'Vertical',
    'FP1',
    'LH',
    'NOVA_C24_ERV_S_I_L_V_S1_ND_01_02_03_04_2083_13_08',
    '900091-001',
    '$15,266.31',
  ],
  [
    '1',
    'ERV1',
    'ERV',
    'C24IN',
    '208V/3ph/60Hz',
    'Constant Volume',
    'Vertical',
    'FP1',
    'LH',
    'NOVA_C24_ERV_S_I_L_V_S1_ND_01_02_03_04_2083_13_08',
    '900091-001',
    '$15,266.31',
  ],
];

export default function JobSubmittal() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const jobList = useSelector((state) => state.jobs.jobList.filter((item) => item.jobId.toString() === jobId));
  const jobInfo = jobList[0];

  const UpdateJobInfoSchema = Yup.object().shape({
    jobName: Yup.string().required('Please enter a Job Name'),
    repName: Yup.string().required('Please enter a Rep Name'),
    salesEngineer: Yup.string().required('Please enter a Sales Engineer'),
    leadTime: Yup.string().required('Please enter a Lead Time'),
    revisionNo: Yup.string().required('Please enter a Revision No'),
    PONumber: Yup.string().required('Please enter a PO Number'),
    shipName: Yup.string().required('Please enter a Ship Name'),
    streetAddress: Yup.string().required('Please enter a Street Address'),
    city: Yup.string().required('Please enter a City'),
    state: Yup.string().required('Please enter a State'),
    zip: Yup.string().required('Please enter a Zip'),
    Country: Yup.string().required('Please Select a Country'),
    dockType: Yup.string().required('Please Select a Dock type'),
    coilHandling: Yup.string().required('Please Select a Coil Handling'),
    notes: Yup.string().required('Please enter a Notes'),
    shipping: Yup.string().required('Please enter a Shipping'),
  });

  // const defaultValues = {
  //   jobName: '',
  // };

  const methods = useForm({
    resolver: yupResolver(UpdateJobInfoSchema),
    // defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onJobInfoSubmit = async (data) => {
    try {
      navigate(PATH_JOB.dashboard(jobId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Job: Edit">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onJobInfoSubmit)}>
            <HeaderBreadcrumbs
              heading="Job Submittal"
              links={[
                { name: 'My Jobs', href: PATH_JOBS.root },
                { name: 'My Dashboard', href: PATH_JOB.dashboard(jobId) },
                { name: 'Job Submittal' },
              ]}
              action={
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="string"
                    startIcon={<Iconify icon={'fluent:save-24-regular'} />}
                    loading={isSubmitting}
                  >
                    Save Changes
                  </LoadingButton>
                </Stack>
              }
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Summary" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="jobName" label="Project Name" disabled />
                      <RHFTextField size="small" name="repName" label="Rep Name" disabled />
                      <RHFTextField size="small" name="salesEngineer" label="Sales Engineer" disabled />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="leadTime" label="Lead Time" />
                      <RHFTextField size="small" name="revisionNo" label="revisionNo" />
                      <RHFTextField size="small" name="PONumber" label="PO Number" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Ship To Address" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="shipName" label="Name" />
                      <RHFTextField size="small" name="streetAddress" label="Street Address" />
                      <RHFTextField size="small" name="city" label="City" />
                      <RHFTextField size="small" name="state" label="State / Province" />
                      <RHFTextField size="small" name="zip" label="Zip / Postal Code" />
                      <RHFSelect size="small" name="Country" label="Country" placeholder="">
                        <option value="" />
                        <option value="can">Canada</option>
                        <option value="usa">USA</option>
                      </RHFSelect>{' '}
                      <RHFSelect size="small" name="dockType" label="Dock Type" placeholder="">
                        <option value="" />
                        <option value="type1">Type1</option>
                        <option value="type2">Type2</option>
                      </RHFSelect>{' '}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="All (defualt)" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox size="small" name="voltageTable" label="Voltage Table" />
                      <RHFCheckbox size="small" name="BACNetPointsList" label="BACNet Points List" />
                      <RHFCheckbox size="small" name="OJHMISpec" label="OJ HMI Spec" />
                      <RHFCheckbox
                        size="small"
                        name="terminalStringWiringDiagram"
                        label="Terminal string wiring diagram"
                      />
                      <RHFCheckbox size="small" name="fireAlarm" label="Fire alarm" />
                      <RHFCheckbox size="small" name="backdraftDampers" label="Backdraft dampers" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="SOO" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox size="small" name="bpassForDefrost" label="Bpass for Defrost" />
                      <RHFCheckbox size="small" name="constantVolume" label="Constant Volume" />
                      <RHFCheckbox size="small" name="hydronicPreHeat" label="Hydronic pre-heat" />
                      <RHFCheckbox size="small" name="humidification" label="Humidification" />
                      <RHFCheckbox size="small" name="temperatureControl" label="Temperature control" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Handling" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFSelect size="small" name="coilHandling" label="Coil handling" placeholder="">
                        <option value="" />
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </RHFSelect>{' '}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Project Information" />
                  <CardContent>
                    <TableContainer component={Paper} dense>
                      <Scrollbar>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              {ProjectInfoTableHeader.map((item, index) => (
                                <TableCell key={index} component="th" scope="row" align="left">
                                  {item}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {ProjectInfo.map((row, index) => (
                              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {row.map((item, index) => (
                                  <TableCell key={index} component="th" scope="row" align="left">
                                    {item}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Scrollbar>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Added Notes" />
                  <CardContent>
                    <RHFTextField size="small" name="notes" label="Enter Notes" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Added Shipping Instructions" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="shipping" label="Enter Shipping" />
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
