import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack, Divider, Button } from '@mui/material';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector } from '../../redux/store';
import { addNewUnit, updateUnit } from '../../redux/slices/jobsReducer';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';
import { PATH_JOB, PATH_JOBS, PATH_UNIT } from '../../routes/paths';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';
//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: theme.palette.primary.main,
}));

// -----------------------------------------------

UnitEdit.propTypes = {
  initInfo: PropTypes.object,
  unitType: PropTypes.number,
  productType: PropTypes.number,
};
export default function UnitEdit({ initInfo, unitType, productType }) {
  const navigate = useNavigate();
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { mainInitData } = initInfo;
  const [unitModel, setUnitModel] = useState(mainInitData.modelInfo);
  const [orientation, setOrientation] = useState(mainInitData.orientationInfo);
  const [voltage, setVoltage] = useState(mainInitData.voltageInfo.data);

  console.log(initInfo);

  // const unitInfo = useSelector(
  //   (state) =>
  //     state.jobs.unitList
  //       .filter((item) => item.jobId.toString() === jobId)[0]
  //       .data.filter((item) => item.unitId.toString() === unitId)[0]
  // );

  const UnitSchema = Yup.object().shape({
    tag: Yup.string().required('Please enter a Tag'),
    quantity: Yup.string().required('Please enter a Quantity'),
    location: Yup.string().required('Please enter a Location'),
    orientation: Yup.string().required('Please enter a Orientation'),
    unitType: Yup.string().required('Please enter a UnitType'),
    controlPreference: Yup.string().required('Please enter a Control Preference'),
    summerSupplyAirCFM: Yup.string().required('Please enter a Supply Air (CFM)'),
    summerReturnAirCFM: Yup.string().required('Please enter a Exhaust Air (CFM)'),
    supplyAirESP: Yup.string().required('Please enter a Supply Air ESP'),
    exhaustAirESP: Yup.string().required('Please enter a Exhaust Air ESP'),
    unitModel: Yup.string().required('Please select a UnitModel'),
    unitVoltage: Yup.string().required('Please select a UnitVoltage'),
    qa_filter: Yup.string().required('Please select a QA Filter'),
    ra_filter: Yup.string().required('Please enter a RA Filter'),
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
    quantity: 1,
    location: initInfo.locationId,
    orientation: initInfo.orientationId,
    unitType,
    controlPreference: initInfo.controlsPreferenceId,
    summerSupplyAirCFM: 325,
    summerReturnAirCFM: 325,
    supplyAirESP: 0.75,
    exhaustAirESP: 0.75,
    unitModel: mainInitData.modelId,
    unitVoltage: mainInitData.voltageInfo.selectedVoltageId,
    qa_filter: '',
    ra_filter: '',
    preheat: '',
    cooling: '',
    heating: '',
    qa_filter2: '',
    ra_filter2: '',
    qa_filter3: '',
    ra_filter3: '',
  };

  // if (isEdit)
  //   Object.entries(unitInfo).forEach(([key, value]) => {
  //     defaultValues[key] = value;
  //   });

  const methods = useForm({
    resolver: yupResolver(UnitSchema),
    defaultValues,
  });

  const {
    // setValue,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const airFlowDataChanged = (action) => {
    const sendingData = {
      action,
      UAL: localStorage.getItem('UAL'),
      location: getValues('location'),
      orientation: getValues('orientation'),
      unitTypeId: getValues('unitType'),
      productTypeId: productType,
      unitModelId: getValues('unitModel'),
      summerSupplyAirCFM: getValues('summerSupplyAirCFM'),
      summerReturnAirCFM: getValues('summerReturnAirCFM'),
      supplyAirESP: getValues('supplyAirESP'),
      exhaustAirESP: getValues('exhaustAirESP'),
      voltageId: getValues('unitVoltage'),
      byPass: 0,
    };
    console.log(sendingData);
    axios.post(`${serverUrl}/api/units/airflowdatachanged`, sendingData).then((response) => {
      const { data } = response;
      console.log(data);
      if (data === 0) {
        return;
      }
      if (action === 'SummerSupplyAirCFM_Changed') {
        setUnitModel(data.modelInfo);
        setOrientation(data.orientationInfo);
        setVoltage(data.voltageInfo.data);
        setValue('unitVoltage', data.voltageInfo.selectedVoltageId);
        setValue('unitModel', data.modelId);
        setValue('orientation', data.orientationId);
        setValue('summerSupplyAirCFM', data.summerSupplyAirCFM);
        setValue('summerReturnAirCFM', data.summerReturnAirCFM);
      }
      if (action === 'SummerReturnAirCFM_Changed') {
        setValue('summerReturnAirCFM', data.summerReturnAirCFM);
      }
      if (action === 'SupplyAirESP') {
        setValue('supplyAirESP', data.supplyAirESP);
      }
      if (action === 'ExhaustAirESP') {
        setValue('exhaustAirESP', data.exhaustAirESP);
      }
    });
  };

  const onChangeSummerSupplyAirCFM = (e) => {
    airFlowDataChanged('SummerSupplyAirCFM_Changed');
  };

  const onChangeSummerReturnAirCFM = (e) => {
    airFlowDataChanged('SummerReturnAirCFM_Changed');
  };

  const onChangeSupplyAirCFM = (e) => {
    airFlowDataChanged('SupplyAirESP');
  };

  const onChangeReturnAirCFM = (e) => {
    airFlowDataChanged('ExhaustAirESP');
  };

  const onSubmit = (data) => {
    if (!isEdit) {
      data.unitId = 100;
      addNewUnit({ jobId, data });
    } else updateUnit({ jobId, unitId, data });
    navigate(PATH_UNIT.view(jobId));
  };

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          <Button type="submit" variant="text" startIcon={<Iconify icon={isEdit ? 'bx:save' : 'carbon:add'} />}>
            {isEdit ? 'Save Changes' : 'Add Unit to Project'}
          </Button>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'grid', rowGap: 0, columnGap: 1 }}>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="GENTERAL UNIT INFORMATION" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="tag" label="Tag" />
                    <RHFTextField size="small" name="quantity" label="Quantity" />
                    <RHFSelect size="small" name="location" label="Location" placeholder="">
                      <option value="" />
                      {initInfo.location.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="orientation" label="Orientation" placeholder="">
                      <option value="" />
                      {orientation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="unitType" label="Unit Type" placeholder="" disabled>
                      {initInfo.unitType.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="controlPreference" label="Control Preference" placeholder="">
                      <option value="" />
                      {initInfo.controlsPreference.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="AIR FLOW DATA" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="summerSupplyAirCFM"
                        label="Supply Air (CFM)"
                        onBlur={onChangeSummerSupplyAirCFM}
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="summerReturnAirCFM"
                        label="Supply Air (ASD)"
                        onBlur={onChangeSummerReturnAirCFM}
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="supplyAirESP"
                        label="Supply Air (ERC)"
                        onBlur={onChangeSupplyAirCFM}
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="exhaustAirESP"
                        label="Supply Air (DVG)"
                        onBlur={onChangeReturnAirCFM}
                        autoComplete="off"
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFSelect size="small" name="unitModel" label="Unit Model">
                        <option value="" />
                        {unitModel.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect size="small" name="unitVoltage" label="Unit Voltage">
                        <option value="" />
                        {voltage.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                      </RHFSelect>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeaderStyle title="COMPONENTS" />
              <CardContent sx={{ height: '600px' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="qa_filter" label="QA Filter">
                      <option value="" />
                      {initInfo.qaFilter.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ra_filter" label="RA Filter">
                      <option value="" />
                      {initInfo.raFilter.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="preheat" label="Preheat">
                      <option value="" />
                      {initInfo.preheatComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
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
  );
}
