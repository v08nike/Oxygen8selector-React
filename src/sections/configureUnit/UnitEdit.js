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
import { useSelector, useDispatch } from '../../redux/store';
import { saveUnitInfo } from '../../redux/slices/unitReducer';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../../components/hook-form';
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
  unitInfo: PropTypes.object,
  unitType: PropTypes.string,
  productType: PropTypes.number,
};
export default function UnitEdit({ initInfo, unitInfo, unitType, productType }) {
  console.log(initInfo, unitInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { mainInitData } = initInfo;
  const { jobInfo } = useSelector((state) => state.jobDashboard);
  const [unitModel, setUnitModel] = useState(mainInitData.modelInfo);
  const [orientation, setOrientation] = useState(mainInitData.orientationInfo);
  const [voltage, setVoltage] = useState(mainInitData.voltageInfo.data);

  // const unitInfo = useSelector(
  //   (state) =>
  //     state.jobs.unitList
  //       .filter((item) => item.jobId.toString() === jobId)[0]
  //       .data.filter((item) => item.unitId.toString() === unitId)[0]
  // );

  const UnitSchema = Yup.object().shape({
    tag: Yup.string().required('Please enter a Tag'),
    qty: Yup.number().required('Please enter a Quantity'),
    location: Yup.number().required('Please enter a Location'),
    orientation: Yup.number().required('Please enter a Orientation'),
    unitTypeId: Yup.number().required('Please enter a UnitType'),
    controlPreference: Yup.number().required('Please enter a Control Preference'),
    summerSupplyAirCFM: Yup.number().required('Please enter a Supply Air (CFM)'),
    summerReturnAirCFM: Yup.number().required('Please enter a Exhaust Air (CFM)'),
    supplyAirESP: Yup.number().required('Please enter a Supply Air ESP'),
    exhaustAirESP: Yup.number().required('Please enter a Exhaust Air ESP'),
    unitModelId: Yup.number().required('Please select a UnitModel'),
    unitVoltage: Yup.number().required('Please select a UnitVoltage'),
    qa_filter: Yup.number().required('Please select a QA Filter'),
    ra_filter: Yup.number().required('Please enter a RA Filter'),
    heatExch: Yup.number(),
    reheat: Yup.number(),
    preheat: Yup.number().required('Please enter a Preheat'),
    cooling: Yup.number().required('Please enter a Cooling'),
    heating: Yup.number().required('Please enter a Heating'),
    summer_air_db: Yup.number(),
    summer_air_wb: Yup.number(),
    summer_air_rh: Yup.number(),
    winter_air_db: Yup.number(),
    winter_air_wb: Yup.number(),
    winter_air_rh: Yup.number(),
    summer_return_db: Yup.number(),
    summer_return_wb: Yup.number(),
    summer_return_rh: Yup.number(),
    winter_return_db: Yup.number(),
    winter_return_wb: Yup.number(),
    winter_return_rh: Yup.number(),
    winter_preheat_setpoint_db: Yup.number(),
    summer_cooling_setpoint_db: Yup.number(),
    summer_cooling_setpoint_wb: Yup.number(),
    winter_heating_setpoint_db: Yup.number(),
    summer_reheat_setpoint_db: Yup.number(),
    bypass: Yup.boolean(),
    unitHeight: Yup.number(),
    unitWidth: Yup.number(),
    unitLength: Yup.number(),
    unitWeight: Yup.number(),
    preheatElecHeaterInstallationId: Yup.number(),
    heatElecHeaterInstallationId: Yup.number(),
    preheatHWC_UseCap: Yup.number(),
    preheatHWC_Cap: Yup.number(),
    preheatHWC_UseFlowRate: Yup.number(),
    preheatHWC_FlowRate: Yup.number(),
    coolingCWC_UseCap: Yup.number(),
    coolingCWC_Cap: Yup.number(),
    coolingCWC_UseFlowRate: Yup.number(),
    coolingCWC_FlowRate: Yup.number(),
    heatingHWC_UseCap: Yup.number(),
    heatingHWC_Cap: Yup.number(),
    heatingHWC_UseFlowRate: Yup.number(),
    heatingHWC_FlowRate: Yup.number(),
    reheatHWC_UseCap: Yup.number(),
    reheatHWC_Cap: Yup.number(),
    reheatHWC_UseFlowRate: Yup.number(),
    reheatHWC_FlowRate: Yup.number(),
    supplyAirOpeningId: Yup.number(),
    supplyAirOpening: Yup.string(),
    exhaustAirOpeningId: Yup.number(),
    exhaustAirOpening: Yup.string(),
    outdoorAirOpeningId: Yup.number(),
    outdoorAirOpening: Yup.string(),
    returnAirOpeningId: Yup.number(),
    returnAirOpening: Yup.string(),
    heatPump: Yup.number(),
    dehumidification: Yup.number(),
    valveAndActuator: Yup.number(),
    valveTypeId: Yup.number(),
    drainPan: Yup.number(),
    handing: Yup.number(),
    preheatCoilHandingId: Yup.number(),
    coolingCoilHandingId: Yup.number(),
    heatingCoilHandingId: Yup.number(),

  });

  const defaultValues = {
    tag: initInfo.tag,
    qty: 1,
    location: initInfo.locationId,
    orientation: initInfo.orientationId,
    unitTypeId: unitType,
    controlPreference: initInfo.controlsPreferenceId,
    summerSupplyAirCFM: 325,
    summerReturnAirCFM: 325,
    supplyAirESP: 0.75,
    exhaustAirESP: 0.75,
    unitModelId: mainInitData.modelId,
    unitVoltage: mainInitData.voltageInfo.selectedVoltageId,
    qa_filter_pd: 0.5,
    ra_filter_pd: 0.5,
    damperActuator: 0,
    valueActuator: 0,
    elecHeaderVoltage: 0,
    elecHeaderInstallation: 0,
    preheatCoilHandling: 0,
    coolingCoilHandling: 0,
    heatingCoilHandling: 0,
    qa_filter: initInfo.qaFilterId,
    ra_filter: initInfo.raFilterId,
    heatExch: 0,
    reheat: 0,
    preheat: initInfo.preheatCompId,
    cooling: initInfo.coolingCompId,
    heating: initInfo.heatingCompId,
    altitude: initInfo.altitude,
    summer_air_db: initInfo.summerOutdoorAirDB,
    summer_air_wb: initInfo.summerOutdoorAirRH,
    summer_air_rh: initInfo.summerOutdoorAirWB,
    winter_air_db: initInfo.summerReturnAirDB,
    winter_air_wb: initInfo.summerReturnAirRH,
    winter_air_rh: initInfo.summerReturnAirWB,
    summer_return_db: initInfo.winterOutdoorAirDB,
    summer_return_wb: initInfo.winterOutdoorAirRH,
    summer_return_rh: initInfo.winterOutdoorAirWB,
    winter_return_db: initInfo.winterReturnAirDB,
    winter_return_wb: initInfo.winterReturnAirRH,
    winter_return_rh: initInfo.winterReturnAirWB,
    winter_preheat_setpoint_db: 0,
    summer_cooling_setpoint_db: 55,
    summer_cooling_setpoint_wb: 55,
    winter_heating_setpoint_db: 88,
    summer_reheat_setpoint_db: 72,
    preheatSetpointDB: 0,
    coolingSetpointDB: 0,
    coolingSetpointWB: 0,
    heatingSetpointDB: 0,
    reheatSetpointDB: 0,
    coolingFluidConcentration: 0,
    coolingFluidEntTemp: 0,
    coolingFluidLvgTemp: 0,
    heatingFluidType: 0,
    heatingFluidConcentration: 0,
    heatingFluidEntTemp: 0,
    heatingFluidLvgTemp: 0,
    refrigSuctionTemp: 0,
    refrigLiquidTemp: 0,
    refrigSuperheatTemp: 0,
    refrigCondensingTemp: 0,
    refrigVaporTemp: 0,
    refrigSubcoolingTemp: 0,
    bypass: false,
    unitHeight: 0,
    unitWidth: 0,
    unitLength: 0,
    unitWeight: 0,
    preheatElecHeaterInstallationId: 0,
    heatElecHeaterInstallationId: 0,
    preheatHWC_UseCap: 0,
    preheatHWC_Cap: 0,
    preheatHWC_UseFlowRate: 0,
    preheatHWC_FlowRate: 0,
    coolingCWC_UseCap: 0,
    coolingCWC_Cap: 0,
    coolingCWC_UseFlowRate: 0,
    coolingCWC_FlowRate: 0,
    heatingHWC_UseCap: 0,
    heatingHWC_Cap: 0,
    heatingHWC_UseFlowRate: 0,
    heatingHWC_FlowRate: 0,
    reheatHWC_UseCap: 0,
    reheatHWC_Cap: 0,
    reheatHWC_UseFlowRate: 0,
    reheatHWC_FlowRate: 0,
    supplyAirOpeningId: 0,
    supplyAirOpening: "",
    exhaustAirOpeningId: 0,
    exhaustAirOpening: "",
    outdoorAirOpeningId: 0,
    outdoorAirOpening: "",
    returnAirOpeningId: 0,
    returnAirOpening: "",
    heatPump: 0,
    dehumidification: 0,
    valveAndActuator: 0,
    valveTypeId: 0,
    drainPan: 0, 
    handing: 0,
    preheatCoilHandingId: 0,
    coolingCoilHandingId: 0,
    heatingCoilHandingId: 0,
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
      unitTypeId: getValues('unitTypeId'),
      productTypeId: productType,
      unitModelId: getValues('unitModelId'),
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
        setValue('unitModelId', data.modelId);
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

  const onChangePreheat = (e) => {
    setValue('preheat', e.target.value);
  };

  const onChangeCooling = (e) => {
    setValue('cooling', e.target.value);
  };

  const onChangeHeating = (e) => {
    setValue('heating', e.target.value);
  };

  // get WB value from server
  const get_WB_By_DBRH = (first, second, setValueId) => {
    if (first === '' || second === '') return;
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_WB_BY_DB_HR',
        first,
        second,
        altitude: getValues('altitude'),
      })
      .then((response) => {
        setValue(setValueId, response.data);
      });
  };

  // get HR value from server
  const get_RH_By_DBWB = (first, second, setValueId) => {
    if (first === '' || second === '') return;
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_RH_BY_DB_WB',
        first,
        second,
        altitude: getValues('altitude'),
      })
      .then((response) => {
        setValue(setValueId, response.data);
      });
  };

  // Summer Outdoor Air DB
  const handleChangeSummerOutdoorAirDBChanged = (e) => {
    setValue('summer_air_db', e.target.value);
    get_RH_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air WB
  const handleChangeSummerOutdoorAirWBChanged = (e) => {
    setValue('summer_air_wb', e.target.value);
    get_RH_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air RH
  const handleChangeSummerOutdoorAirRHChanged = (e) => {
    setValue('summer_air_rh', e.target.value);
    get_WB_By_DBRH(getValues('summer_air_db'), getValues('summer_air_rh'), 'summer_air_wb');
  };

  // Winter Outdoor Air DB
  const handleChangeWinterOutdoorAirDBChanged = (e) => {
    setValue('winter_air_db', e.target.value);
    get_RH_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air WB
  const handleChangeWinterOutdoorAirWBChanged = (e) => {
    setValue('winter_air_wb', e.target.value);
    get_RH_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air RH
  const handleChangeWinterOutdoorAirRHChanged = (e) => {
    setValue('winter_air_rh', e.target.value);
    get_WB_By_DBRH(getValues('winter_air_db'), getValues('winter_air_rh'), 'winter_air_wb');
  };

  // Summer Return Air DB
  const handleChangeSummerReturnAirDBChanged = (e) => {
    setValue('summer_return_db', e.target.value);
    get_RH_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air WB
  const handleChangeSummerReturnAirWBChanged = (e) => {
    setValue('summer_return_wb', e.target.value);
    get_RH_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air RH
  const handleChangeSummerReturnAirRHChanged = (e) => {
    setValue('summer_return_rh', e.target.value);
    get_WB_By_DBRH(getValues('summer_return_db'), getValues('summer_return_rh'), 'summer_return_wb');
  };

  // Winter Return Air DB
  const handleChangeWinterReturnAirDBChanged = (e) => {
    setValue('winter_return_db', e.target.value);
    get_RH_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air WB
  const handleChangeWinterReturnAirWBChanged = (e) => {
    setValue('winter_return_wb', e.target.value);
    get_RH_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air RH
  const handleChangeWinterReturnAirRHChanged = (e) => {
    setValue('winter_return_rh', e.target.value);
    get_WB_By_DBRH(getValues('winter_return_db'), getValues('winter_return_rh'), 'winter_return_wb');
  };

  const handleChangeByPass = (e) => {
    setValue('bypass', e.target.checked);
  };

  const onSubmit = (data) => {
    const temp = {
      ...data,
      jobId,
      unitId: isEdit ? unitId : 0,
      productTypeId: productType,
      byPassId: data.bypass ? 1 : 0,
      selection_type_id: data.unitTypeId,
      voltageSPPId: 0,
    };
    console.log(temp);
    dispatch(saveUnitInfo(temp));
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
                    <RHFTextField size="small" name="qty" label="Quantity" />
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
                    <RHFSelect size="small" name="unitTypeId" label="Unit Type" placeholder="" disabled>
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
                      <RHFCheckbox
                        size="small"
                        name="bypass"
                        label="Bypass for Economizer"
                        onChange={handleChangeByPass}
                        checked={false}
                      />
                      <RHFSelect size="small" name="unitModelId" label="Unit Model">
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
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Outdoor Air Design Conditions" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="altitude" label="Altitude (ft):" autoComplete="off" />
                      <RHFTextField
                        size="small"
                        name="summer_air_db"
                        label="Summer Outdoor Air DB (F)"
                        onBlur={handleChangeSummerOutdoorAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="summer_air_wb"
                        label="Summer Outdoor Air WB (F)"
                        onBlur={handleChangeSummerOutdoorAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="summer_air_rh"
                        label="Summer Outdoor Air RH (%)"
                        onBlur={handleChangeSummerOutdoorAirRHChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="winter_air_db"
                        label="Winter Outdoor Air DB"
                        onBlur={handleChangeWinterOutdoorAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="winter_air_wb"
                        label="Winter Outdoor Air WB"
                        onBlur={handleChangeWinterOutdoorAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="winter_air_rh"
                        label="Winter Outdoor Air RH"
                        onBlur={handleChangeWinterOutdoorAirRHChanged}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Return Air Design Conditions" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="summer_return_db"
                        label="Summer Return Air DB (F)"
                        onBlur={handleChangeSummerReturnAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="summer_return_wb"
                        label="Summer Return Air WB (F)"
                        onBlur={handleChangeSummerReturnAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="summer_return_rh"
                        label="Summer Return Air RH (%)"
                        onBlur={handleChangeSummerReturnAirRHChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="winter_return_db"
                        label="Winter Return Air DB"
                        onBlur={handleChangeWinterReturnAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="winter_return_wb"
                        label="Winter Return Air WB"
                        onBlur={handleChangeWinterReturnAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="winter_return_rh"
                        label="Winter Return Air RH"
                        onBlur={handleChangeWinterReturnAirRHChanged}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="Setpoints" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="winter_preheat_setpoint_db"
                        label="Winter Preheat Setpoint DB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="summer_cooling_setpoint_db"
                        label="Summer Cooling Setpoint DB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="summer_cooling_setpoint_wb"
                        label="Summer Cooling Setpoint WB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="winter_heating_setpoint_db"
                        label="Winter Heating Setpoint DB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="summer_reheat_setpoint_db"
                        label="Summer Reheat Setpoint DB (F):"
                        autoComplete="off"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeaderStyle title="COMPONENTS" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="qa_filter" label="QA Filter">
                      {initInfo.qaFilter.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ra_filter" label="RA Filter">
                      {initInfo.raFilter.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="preheat" label="Preheat" onChange={onChangePreheat}>
                      {initInfo.preheatComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="cooling" label="Cooling" onChange={onChangeCooling}>
                      {initInfo.coolingComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="heating" label="Heating" onChange={onChangeHeating}>
                      {initInfo.heatingComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="qa_filter_pd" label="QA Filter PD (in w.g.)" />
                    <RHFTextField size="small" name="ra_filter_pd" label="RA Filter PD (in w.g.)" />
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="damperActuator" label="Dampers & Actuator" placeholder="">
                      {initInfo.damperActuator.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="elecHeaderVoltage" label="Elec. Heater Voltage" placeholder="">
                      {initInfo.elecHeaderVoltage.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="elecHeaderInstallation" label="Heating Elec. Heater" placeholder="">
                      {initInfo.elecHeaderInstallation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardHeaderStyle title="Submittals" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="preheatCoilHandling" label="Preheat Coil Handing">
                      {initInfo.preheatCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="coolingCoilHandling" label="Cooling Coil Handing">
                      {initInfo.coolingCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="heatingCoilHandling" label="Heating Coil Handing">
                      {initInfo.heatingCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
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
