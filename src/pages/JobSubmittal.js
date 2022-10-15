import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  Button,
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
// utils
import axios from '../utils/axios';
// config
import { serverUrl } from '../config';
// sections
import Loading from '../sections/Loading';
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

export default function JobSubmittal() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const UpdateJobInfoSchema = Yup.object().shape({
    txbJobName: Yup.string(),
    txbRepName: Yup.string(),
    txbSalesEngineer: Yup.string(),
    txbLeadTime: Yup.string().required('Please enter a Lead Time'),
    txbRevisionNo: Yup.string().required('Please enter a Revision No'),
    txbPONumber: Yup.string().required('Please enter a PO Number'),
    txbShipName: Yup.string().required('Please enter a Ship Name'),
    txbShippingStreetAddress: Yup.string().required('Please enter a Street Address'),
    txbShippingCity: Yup.string().required('Please enter a City'),
    txbShippingProvince: Yup.string().required('Please enter a State'),
    txbShippingPostalCode: Yup.string().required('Please enter a Zip'),
    ddlCountry: Yup.string().required('Please Select a Country'),
    ddlDockType: Yup.string().required('Please Select a Dock type'),
    ddlCoilHandling: Yup.string().required('Please Select a Coil Handling'),
    notes: Yup.string(),
    shipping: Yup.string(),
    ckbBACNetPointList: Yup.boolean(),
    ckbBackdraftDamper: Yup.boolean(),
    ckbBypassDefrost: Yup.boolean(),
    ckbConstantVolume: Yup.boolean(),
    ckbFireAlarm: Yup.boolean(),
    ckbHumidification: Yup.boolean(),
    ckbHydronicPreheat: Yup.boolean(),
    ckbOJHMISpec: Yup.boolean(),
    ckbTemControl: Yup.boolean(),
    ckbTerminalWiring: Yup.boolean(),
    ckbVoltageTable: Yup.boolean(),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateJobInfoSchema),
    // defaultValues,
  });

  const [Notes, setNotes] = useState([]);
  const [ShippingNotes, setShippingNotes] = useState([]);
  const [SubmittalDetailsDataSource, setSubmittalDetailsDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const addNoteClicked = () => {
    if ( getValues('notes') === "") return;
    setNotes([...Notes, {notes_no: Notes.length, tba: '', notes_nbr: Notes.length, notes: getValues('notes')}]);
    setValue('notes', "");
  };

  const addShippingInstructionClicked = () => {
    if ( getValues('shipping') === "") return;
    setShippingNotes([...ShippingNotes, {shipping_notes_no: ShippingNotes.length, tba: '', shipping_notes_nbr: ShippingNotes.length, shipping_notes: getValues('shipping')}]);
    setValue('shipping', "");
  };

  const onJobInfoSubmit = async (data) => {
    try {
      axios
      .post(`${serverUrl}/api/Submittals/save`, {
        ...data,
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
      }).then((response)=>{
        const {data} = response;
        if (data) {
          navigate(PATH_JOB.dashboard(jobId));
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .post(`${serverUrl}/api/Submittals/getAllData`, {
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        setNotes(data.gvNotes.gvNotesDataSource);
        setSubmittalDetailsDataSource(data.gvSubmittals.gvSubmittalDetailsDataSource);
        setShippingNotes(data.gvShippingNotes.gvShippingNotesDataSource);
        setValue('txbJobName', data.txbProjectNameText);
        setValue('txbRepName', data.txbRepNameText);
        setValue('txbSalesEngineer', data.txbSalesEngineerText);
        setValue('txbLeadTime', data.txbLeadTimeText);
        setValue('txbRevisionNo', data.txbRevisionNoText);
        setValue('txbPONumber', data.txbPO_NumberText);
        setValue('txbShipName', data.txbShippingNameText);
        setValue('txbShippingStreetAddress', data.txbShippingStreetAddressText);
        setValue('txbShippingCity', data.txbShippingCityText);
        setValue('txbShippingProvince', data.txbShippingProvinceText);
        setValue('txbShippingPostalCode', data.txbShippingPostalCodeText);
        setValue('ddlCountry', data.intCountryID);
        setValue('ddlDockType', data.intDockTypeID);
        setValue('ckbBACNetPointList', data.ckbBACNetPointList === 1);
        setValue('ckbBackdraftDamper', data.ckbBackdraftDamper === 1);
        setValue('ckbBypassDefrost', data.ckbBypassDefrost === 1);
        setValue('ckbConstantVolume', data.ckbConstantVolume === 1);
        setValue('ckbFireAlarm', data.ckbFireAlarm === 1);
        setValue('ckbHumidification', data.ckbHumidification === 1);
        setValue('ckbHydronicPreheat', data.ckbHydronicPreheat === 1);
        setValue('ckbOJHMISpec', data.ckbOJHMISpec === 1);
        setValue('ckbTemControl', data.ckbTemControl === 1);
        setValue('ckbTerminalWiring', data.ckbTerminalWiring === 1);
        setValue('ckbVoltageTable', data.ckbVoltageTable === 1);
        setIsLoading(false);
      });
  }, [jobId, setValue]);

  const clickCheckbox = (key) => {
    setValue(key, !getValues(key));
  };

  return isLoading ? (
    <Loading />
  ) : (
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
                      <RHFTextField size="small" name="txbJobName" label="Project Name" disabled />
                      <RHFTextField size="small" name="txbRepName" label="Rep Name" disabled />
                      <RHFTextField size="small" name="txbSalesEngineer" label="Sales Engineer" disabled />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbLeadTime" label="Lead Time" />
                      <RHFTextField size="small" name="txbRevisionNo" label="revisionNo" />
                      <RHFTextField size="small" name="txbPONumber" label="PO Number" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Ship To Address" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbShipName" label="Name" />
                      <RHFTextField size="small" name="txbShippingStreetAddress" label="Street Address" />
                      <RHFTextField size="small" name="txbShippingCity" label="City" />
                      <RHFTextField size="small" name="txbShippingProvince" label="State / Province" />
                      <RHFTextField size="small" name="txbShippingPostalCode" label="Zip / Postal Code" />
                      <RHFSelect size="small" name="ddlCountry" label="Country" placeholder="">
                        <option value="" />
                        <option value="1">Canada</option>
                        <option value="2">USA</option>
                      </RHFSelect>{' '}
                      <RHFSelect size="small" name="ddlDockType" label="Dock Type" placeholder="">
                        <option value="" />
                        <option value="1">Type1</option>
                        <option value="2">Type2</option>
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
                      <RHFCheckbox
                        size="small"
                        name="ckbVoltageTable"
                        label="Voltage Table"
                        defaultChecked={getValues('ckbVoltageTable')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbVoltageTable');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbBACNetPointList"
                        label="BACNet Points List"
                        defaultChecked={getValues('ckbBACNetPointList')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbBACNetPointList');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbOJHMISpec"
                        label="OJ HMI Spec"
                        defaultChecked={getValues('ckbOJHMISpec')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbOJHMISpec');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbTerminalWiring"
                        label="Terminal string wiring diagram"
                        defaultChecked={getValues('ckbTerminalWiring')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbTerminalWiring');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbFireAlarm"
                        label="Fire alarm"
                        defaultChecked={getValues('ckbFireAlarm')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbFireAlarm');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbBackdraftDamper"
                        label="Backdraft dampers"
                        defaultChecked={getValues('ckbBackdraftDamper')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbBackdraftDamper');
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="SOO" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox
                        size="small"
                        name="ckbBypassDefrost"
                        label="Bpass for Defrost"
                        defaultChecked={getValues('ckbBypassDefrost')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbBypassDefrost');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbConstantVolume"
                        label="Constant Volume"
                        defaultChecked={getValues('ckbConstantVolume')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbConstantVolume');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbHydronicPreheat"
                        label="Hydronic pre-heat"
                        defaultChecked={getValues('ckbHydronicPreheat')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbHydronicPreheat');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbHumidification"
                        label="Humidification"
                        defaultChecked={getValues('ckbHumidification')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbHumidification');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbTemControl"
                        label="Temperature control"
                        defaultChecked={getValues('ckbTemControl')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbTemControl');
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Handling" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFSelect size="small" name="ddlCoilHandling" label="Coil handling" placeholder="">
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
                    <TableContainer component={Paper} dense="true">
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
                            {SubmittalDetailsDataSource.map((row, index) => (
                              <Row row={row} key={index} />
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
                    <Box>
                      <RHFTextField
                        sx={{ width: '70%' }}
                        size="small"
                        name="notes"
                        label="Enter Notes"
                        onChange={(e) => setValue('notes', e.target.value)}
                      />
                      <Button sx={{ width: '30%', borderRadius: '5px', mt: '1px' }} variant="contained" onClick={addNoteClicked}>
                        Add Note
                      </Button>
                    </Box>
                    <Box sx={{pt : "10px"}}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" align="left">
                              No
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                              Note
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Notes.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="left">
                                {index}
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                {row.notes}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Added Shipping Instructions" />
                  <CardContent>
                    <Box>
                      <RHFTextField
                        sx={{ width: '70%' }}
                        size="small"
                        name="shipping"
                        label="Enter Shipping"
                        onChange={(e) => setValue('shipping', e.target.value)}
                      />
                      <Button sx={{ width: '30%', borderRadius: '5px', mt: '1px' }} variant="contained" onClick={addShippingInstructionClicked}>
                        Add Shipping Instruction
                      </Button>
                    </Box>
                    <Box sx={{pt : "10px"}}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" align="left">
                              No
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                              Shipping Instruction
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ShippingNotes.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="left">
                                {index}
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                {row.shipping_notes}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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

Row.propTypes = {
  row: PropTypes.object,
};
function Row({ row }) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="left">
        {row.qty}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.tag}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.item}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.model}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.voltage}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.controls_preference}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.installation}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.duct_connection}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.handing}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.part_desc}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.part_number}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.pricing}
      </TableCell>
    </TableRow>
  );
}
