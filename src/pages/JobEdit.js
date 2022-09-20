import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// paths
import { PATH_JOB, PATH_JOBS } from '../routes/paths';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { updateJob, getJobsIntInfo } from '../redux/slices/jobsReducer';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../components/hook-form';
import Iconify from '../components/Iconify';
// utils
import axios from '../utils/axios';
// config
import { serverUrl } from '../config';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { state } = useLocation();
  const { jobInitInfo, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobsIntInfo());
  }, [dispatch]);

  let baseOfDesign = [];
  let UoM = [];
  let country = [];
  let applications = [];
  let designCondition = [];
  let companyInfo = [];
  let weatherData = [];
  let provState = [];
  let designDataCooling = [];

  if (!isLoading) {
    baseOfDesign = jobInitInfo.baseOfDesign;
    UoM = jobInitInfo.UoM;
    country = jobInitInfo.country;
    applications = jobInitInfo.applications;
    designCondition = jobInitInfo.designCondition;
    companyInfo = jobInitInfo.companyInfo;
    weatherData = jobInitInfo.weatherData;
    provState = jobInitInfo.provState;
    designDataCooling = jobInitInfo.designDataCooling;
  }

  const provStateInfoTemp = provState.filter((item) => item.country === country[0].value);
  const cityInfoTemp = weatherData.filter(
    (item) => item.country === country[0].value && item.prov_state === provStateInfoTemp[0].prov_state
  );

  const [jobInfo, setJobInfo] = useState({});
  const [provStateInfo, setProvStateInfo] = useState(provStateInfoTemp);
  const [cityInfo, setCityInfo] = useState(cityInfoTemp);

  if (jobId > 0) {
    const jobList = useSelector((state) => state.jobs.jobList.filter((item) => item.jobId.toString() === jobId));
    setJobInfo(jobList[0]);
  }

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
    state: Yup.string().required('Please select a County'),
    city: Yup.string().required('Please select a County'),
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
    testNewPrice: Yup.bool(),
  });

  const defaultValues = {
    jobName: '',
    basisOfDesign: 1,
    referenceNo: 0,
    revision: 0,
    createdDate: '',
    revisedDate: '',
    companyName: '',
    application: '',
    uom: 1,
    country: ' ',
    state: '',
    city: '',
    ashareDesignConditions: 1,
    altitude: 0,
    summer_air_db: 0,
    summer_air_wb: 0,
    summer_air_rh: 0,
    winter_air_db: 0,
    winter_air_wb: 0,
    winter_air_rh: 0,
    summer_return_db: 75,
    summer_return_wb: 63,
    summer_return_rh: 51.17,
    winter_return_db: 70,
    winter_return_wb: 52.9,
    winter_return_rh: 30,
    testNewPrice: false,
  };

  if (!jobId) {
    defaultValues.jobName = state.jobName;
    defaultValues.referenceNo = state.referenceNo;
    defaultValues.createdDate = state.createdDate;
    defaultValues.revisedDate = state.revisedDate;
    defaultValues.companyName = state.companyNameId;
    defaultValues.application = state.applicationId;
  } else {
    Object.entries(jobInfo).forEach(([key, value]) => {
      defaultValues[key] = value;
    });
  }

  const methods = useForm({
    resolver: yupResolver(UpdateJobInfoSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const onJobInfoSubmit = async (data) => {
    try {
      console.log(data);
      // updateJob({ jobId: jobInfo.jobId, data });
      // navigate(PATH_JOB.dashboard(jobId));
    } catch (error) {
      console.error(error);
    }
  };

  // get all ourdoor infomation from server
  const getAllOutdoorInfo = () => {
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_ALL_DATA',
        country: getValues('country'),
        cityId: getValues('city'),
        designCondition: getValues('ashareDesignConditions'),
      })
      .then((response) => {
        const data = response.data;
        setValue('altitude', data.altitude);
        setValue('summer_air_db', data.summerOutdoorAirDB);
        setValue('summer_air_wb', data.summerOutdoorAirWB);
        setValue('summer_air_rh', data.summerOutdoorAirRH);
        setValue('winter_air_db', data.winterOutdoorAirDB);
        setValue('winter_air_wb', data.winterOutdoorAirWB);
        setValue('winter_air_rh', data.winterOutdoorAirRH);
      });
  };

 // get HR value from server
  const get_HR_By_DBWB = (first, second, setValueId) => {
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_HR_BY_DB_WB',
        first: first,
        second: second,
        designCondition: getValues('ashareDesignConditions'),
      })
      .then((response) => {
        setValue(setValueId, response.data);
      });
  };

  // get WB value from server
  const get_WB_By_DBRH = (first, second, setValueId) => {
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_WB_BY_DB_HR',
        first: first,
        second: second,
        designCondition: getValues('ashareDesignConditions'),
      })
      .then((response) => {
        setValue(setValueId, response.data);
      });
  };

   // onChange handle for country
  const handleChangeCountry = (e) => {
    try {
      setValue('country', e.target.value);
      
      const provStateInfoTemp = provState.filter((item) => item.country === e.target.value);
      setProvStateInfo(provStateInfoTemp);
      setValue('state', provStateInfoTemp[0].prov_state);

      const cityInfoTemp = weatherData.filter((item) => item.prov_state === provStateInfoTemp[0].prov_state && item.country === e.target.value);
      setCityInfo(cityInfoTemp);
      setValue('city', cityInfoTemp[0].id);
      
      getAllOutdoorInfo();
    } catch (e) {
      console.log(e);
    }
  };

 // onChange handle for State
  const handleChangeProvState = (e) => {
    try {
      setValue('state', e.target.value);

      const cityInfoTemp = weatherData.filter((item) => item.prov_state === e.target.value && item.country === getValues('country'));
      setCityInfo(cityInfoTemp);
      setValue('city', cityInfoTemp[0].id);
      
      getAllOutdoorInfo();  
    } catch (e) {
      console.log(e);
    }
  };

  // onChange handle for city
  const handleChangeCity = (e) => {
    setValue('city', e.target.value);
    getAllOutdoorInfo();
  };

  // Onchange handle for design condition
  const handleChangeDesignCondition = (e) => {
    setValue('ashareDesignConditions', e.target.value);
    getAllOutdoorInfo();
  };

  // Onchange handle for Text New Price Check box
  const handleChangeTestNewPrice = (e) => {
    console.log(e);
    setValue('testNewPrice', e.target.checked);
  }

  // Summer Outdoor Air DB
  const handleChangeSummerOutdoorAirDBChanged = (e) => {
    setValue('summer_air_db', e.target.value);
    get_HR_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air WB
  const handleChangeSummerOutdoorAirWBChanged = (e) => {
    setValue('summer_air_wb', e.target.value);
    get_HR_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air RH
  const handleChangeSummerOutdoorAirRHChanged = (e) => {
    setValue('summer_air_rh', e.target.value);
    get_WB_By_DBRH(getValues('summer_air_db'), getValues('summer_air_rh'), 'summer_air_wb');
  };

  // Winter Outdoor Air DB
  const handleChangeWinterOutdoorAirDBChanged = (e) => {
    setValue('winter_air_db', e.target.value);
    get_HR_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air WB
  const handleChangeWinterOutdoorAirWBChanged = (e) => {
    setValue('winter_air_wb', e.target.value);
    get_HR_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air RH
  const handleChangeWinterOutdoorAirRHChanged = (e) => {
    setValue('winter_air_rh', e.target.value);
    get_WB_By_DBRH(getValues('winter_air_db'), getValues('winter_air_rh'), 'winter_air_wb');
  };

  // Summer Return Air DB
  const handleChangeSummerReturnAirDBChanged = (e) => {
    setValue('summer_return_db', e.target.value);
    get_HR_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air WB
  const handleChangeSummerReturnAirWBChanged = (e) => {
    setValue('summer_return_wb', e.target.value);
    get_HR_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air RH
  const handleChangeSummerReturnAirRHChanged = (e) => {
    setValue('summer_return_rh', e.target.value);
    get_WB_By_DBRH(getValues('summer_return_db'), getValues('summer_return_rh'), 'summer_return_wb');
  };

  // Winter Return Air DB
  const handleChangeWinterReturnAirDBChanged = (e) => {
    setValue('winter_return_db', e.target.value);
    get_HR_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air WB
  const handleChangeWinterReturnAirWBChanged = (e) => {
    setValue('winter_return_wb', e.target.value);
    get_HR_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air RH
  const handleChangeWinterReturnAirRHChanged = (e) => {
    setValue('winter_return_rh', e.target.value);
    get_WB_By_DBRH(getValues('winter_return_db'), getValues('winter_return_rh'), 'winter_return_wb');
  };
  return (
    <Page title="Job: Edit">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onJobInfoSubmit)}>
            <HeaderBreadcrumbs
              heading="Edit Job Info"
              links={[
                { name: 'My Jobs', href: PATH_JOBS.root },
                { name: 'My Dashboard', href: PATH_JOB.dashboard(jobId) },
                { name: 'Edit Job Info' },
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
            {isLoading ? (
              <></>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="Project Information" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="jobName" label="Project Name" />
                        <RHFSelect size="small" name="basisOfDesign" label="Basis of Design" placeholder="">
                          {baseOfDesign.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFTextField size="small" name="referenceNo" label="Reference #" />
                        <RHFTextField size="small" name="revision" label="Revision #" />
                        <RHFTextField size="small" name="createdDate" label="Created Date" />
                        <RHFTextField size="small" name="revisedDate" label="Revised Date" />
                        <RHFSelect size="small" name="companyName" label="Company Name" placeholder="">
                          {companyInfo.map(
                            (info, index) =>
                              info.id.toString() === localStorage.getItem('customerId') && (
                                <option key={index} value={info.id}>
                                  {info.name}
                                </option>
                              )
                          )}
                        </RHFSelect>
                        <RHFSelect size="small" name="application" label="Applicaton" placeholder="">
                          {applications.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFSelect size="small" name="uom" label="UoM" placeholder="">
                          {UoM.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                      </Box>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="Project Test Section" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFCheckbox size="small" name="testNewPrice" label="Test New price" onChange={handleChangeTestNewPrice} checked={false}/>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="Project Location" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFSelect
                          size="small"
                          name="country"
                          label="Country"
                          placeholder=""
                          onChange={handleChangeCountry}
                        >
                          <option value=" ">Select Country</option>
                          {country.map((info, index) => (
                            <option key={index} value={info.value}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFSelect
                          size="small"
                          name="state"
                          label="Province / State"
                          placeholder=""
                          onChange={handleChangeProvState}
                        >
                          {provStateInfo.map((info, index) => (
                            <option key={index} value={info.prov_state}>
                              {info.prov_state}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFSelect size="small" name="city" label="City" placeholder="" onChange={handleChangeCity}>
                          {cityInfo.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.station}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFSelect
                          size="small"
                          name="ashareDesignConditions"
                          label="ASHRAE Design Conditions"
                          placeholder=""
                          onChange={handleChangeDesignCondition}
                        >
                          {designCondition.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
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
                        <RHFTextField size="small" name="altitude" label="Altitude" />
                        <RHFTextField
                          size="small"
                          name="summer_air_db"
                          label="Summer Outdoor Air DB (F)"
                          onChange={handleChangeSummerOutdoorAirDBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="summer_air_wb"
                          label="Summer Outdoor Air WB (F)"
                          onChange={handleChangeSummerOutdoorAirWBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="summer_air_rh"
                          label="Summer Outdoor Air RH (%)"
                          onChange={handleChangeSummerOutdoorAirRHChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="winter_air_db"
                          label="Winter Outdoor Air DB"
                          onChange={handleChangeWinterOutdoorAirDBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="winter_air_wb"
                          label="Winter Outdoor Air WB"
                          onChange={handleChangeWinterOutdoorAirWBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="winter_air_rh"
                          label="Winter Outdoor Air RH"
                          onChange={handleChangeWinterOutdoorAirRHChanged}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="Return Air Design Conditions" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField
                          size="small"
                          name="summer_return_db"
                          label="Summer Return Air DB (F)"
                          onChange={handleChangeSummerReturnAirDBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="summer_return_wb"
                          label="Summer Return Air WB (F)"
                          onChange={handleChangeSummerReturnAirWBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="summer_return_rh"
                          label="Summer Return Air RH (%)"
                          onChange={handleChangeSummerReturnAirRHChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="winter_return_db"
                          label="Winter Return Air DB"
                          onChange={handleChangeWinterReturnAirDBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="winter_return_wb"
                          label="Winter Return Air WB"
                          onChange={handleChangeWinterReturnAirWBChanged}
                        />
                        <RHFTextField
                          size="small"
                          name="winter_return_rh"
                          label="Winter Return Air RH"
                          onChange={handleChangeWinterReturnAirRHChanged}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </FormProvider>
        </Container>
      </RootStyle>
    </Page>
  );
}
