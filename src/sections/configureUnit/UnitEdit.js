import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack, Divider, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUnitEditFormSchema } from '../../hooks/useUnitEditForm';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { saveUnitInfo } from '../../redux/slices/unitReducer';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../../components/hook-form';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';
//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: theme.palette.primary.main,
}));

// -----------------------------------------------

UnitEdit.propTypes = {
  unitType: PropTypes.string,
  productType: PropTypes.number,
};
export default function UnitEdit({ unitType, productType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo, visibleInfo } = useSelector((state) => state.unit);

  const { ddlOrientation, ddlOrientationValue, ddlUnitModel, ddlUnitModelValue, others } = controlInfo.mainControlData;

  const {
    divCustomVisible,
    divHeatExchCompVisible,
    // divNotesVisible,
    divOutdoorAirDesignConditionsVisible,
    divReturnAirDesignConditionsVisible,
    divSetpoint_1Visible,
    divSubmittalItemsVisible,
    // divUnitOpeningsMsgVisible,
    // div_hx_fp_hiddenVisible,
  } = visibleInfo;

  const {
    ddlUnitType,
    ddlUnitTypeValue,
    ddlControlsPreference,
    ddlControlsPreferenceValue,
    ddlDamperAndActuator,
    ddlDamperAndActuatorValue,
    ddlCoolingCoilHanding,
    ddlCoolingCoilHandingValue,
    ddlHeatingCoilHanding,
    ddlHeatingCoilHandingValue,
    ddlPreheatCoilHanding,
    ddlPreheatCoilHandingValue,
    ddlValveType,
    ddlValveTypeValue,
    ckbVoltageSPP,
    divUnitBypassVisible,
    divVoltageSPPVisible,
  } = controlInfo;

  const {
    ddlLocation,
    ddlLocationValue,
    ckbDownshot,
    ddlOA_FilterModel,
    ddlOA_FilterModelValue,
    ddlRA_FilterModel,
    ddlRA_FilterModelValue,
    ddlPreheatComp,
    ddlPreheatCompValue,
    ddlHeatExchComp,
    ddlHeatExchCompValue,
    ddlCoolingComp,
    ddlCoolingCompValue,
    ddlHeatingComp,
    ddlHeatingCompValue,
    componentOptions,
    ddlCoolingFluidType,
    ddlCoolingFluidTypeValue,
    ddlCoolingFluidConcentration,
    ddlCoolingFluidConcentrationValue,
    ddlHeatingFluidType,
    ddlHeatingFluidTypeValue,
    ddlHeatingFluidConcentration,
    ddlHeatingFluidConcentrationValue,
    divCoolingCompVisible,
    divExhaustAirESPVisible,
    divHeatingCompVisible,
    divPreheatCompVisible,
    divRA_FilterModelVisible,
    divRA_FilterPDVisible,
    divSummerReturnAirCFMVisible,
  } = controlInfo.unitTypes;

  const { ddlUnitVoltage, ddlUnitVoltageValue, elecHeaterVoltage, ckbBypass } = others;

  const {
    reheat,
    cooling,
    drainPan,
    customInputs,
    reheatSetpoints,
    refrigerantInfo,
    dehumidification,
    valveAndActuator,
    divDXC_MsgVisible,
    heatElectricHeader,
    preheatElectricHeader,
    electricHeaterVoltage,
    divPreheatSetpointVisible,
    divCoolingSetpointVisible,
    divHeatingSetpointVisible,
    divHeatingFluidDesignConditionsVisible,
  } = componentOptions;

  // console.log(controlInfo, unitInfo, visibleInfo);

  const defaultValues = {
    txtTag: isEdit ? unitInfo.txbTagText : '',
    txbQty: isEdit ? unitInfo.txbQtyText : '1',
    ddlLocation: isEdit ? unitInfo.locationID : ddlLocationValue,
    ckbDownshot: isEdit ? unitInfo.ckbDownshot : ckbDownshot,
    ddlOrientation: isEdit ? unitInfo.orientationID : ddlOrientationValue,
    ddlUnitType: isEdit ? unitInfo.unitTypeID : ddlUnitTypeValue,
    ddlControlsPreference: ddlControlsPreferenceValue,
    txbSummerSupplyAirCFM: isEdit ? unitInfo.txbSummerSupplyAirCFMText : 325,
    txbSummerReturnAirCFM: isEdit ? unitInfo.txbSummerReturnAirCFMText : 325,
    txbSupplyAirESP: isEdit ? unitInfo.txbSupplyAirESPText : 0.75,
    txbExhaustAirESP: isEdit ? unitInfo.txbExhaustAirESPText : 0.75,
    ckbBypass: isEdit ? unitInfo.ckbBypass : ckbBypass,
    ddlUnitModel: isEdit ? unitInfo.unitModelID : ddlUnitModelValue,
    ddlUnitVoltage: isEdit ? unitInfo.unitVoltageID : ddlUnitVoltageValue,
    ckbVoltageSPP: isEdit ? unitInfo.ckbVoltageSPP : ckbVoltageSPP,
    txbAltitude: unitInfo.txbAltitudeText,
    txbSummerOutdoorAirDB: unitInfo.txbSummerOutdoorAirDBText,
    txbSummerOutdoorAirWB: unitInfo.txbSummerOutdoorAirRHText,
    txbSummerOutdoorAirRH: unitInfo.txbSummerOutdoorAirWBText,
    txbWinterOutdoorAirDB: unitInfo.txbSummerReturnAirDBText,
    txbWinterOutdoorAirWB: unitInfo.txbSummerReturnAirRHText,
    txbWinterOutdoorAirRH: unitInfo.txbSummerReturnAirWBText,
    txbSummerReturnAirDB: unitInfo.txbWinterOutdoorAirDBText,
    txbSummerReturnAirWB: unitInfo.txbWinterOutdoorAirRHText,
    txbSummerReturnAirRH: unitInfo.txbWinterOutdoorAirWBText,
    txbWinterReturnAirDB: unitInfo.txbWinterReturnAirDBText,
    txbWinterReturnAirWB: unitInfo.txbWinterReturnAirRHText,
    txbWinterReturnAirRH: unitInfo.txbWinterReturnAirWBText,
    txbWinterPreheatSetpointDB: isEdit ? unitInfo.txbWinterPreheatSetpointDBText : 0,
    txbSummerCoolingSetpointDB: isEdit ? unitInfo.txbSummerCoolingSetpointDBText : 55,
    txbSummerCoolingSetpointWB: isEdit ? unitInfo.txbSummerCoolingSetpointWBText : 55,
    txbWinterHeatingSetpointDB: isEdit ? unitInfo.txbUnitHeightText : 88,
    txbSummerReheatSetpointDB: isEdit ? unitInfo.txbReheatSetpointDBText : 72,
    ddlOA_FilterModel: isEdit ? unitInfo.OA_FilterModelID : ddlOA_FilterModelValue,
    ddlRA_FilterModel: isEdit ? unitInfo.RA_FilterModelID : ddlRA_FilterModelValue,
    ddlPreheatComp: isEdit ? unitInfo.PreheatCompID : ddlPreheatCompValue,
    ddlHeatExchComp: isEdit ? unitInfo.HeatExchCompID : ddlHeatExchCompValue,
    ddlCoolingComp: isEdit ? unitInfo.CoolingCompID : ddlCoolingCompValue,
    ddlHeatingComp: isEdit ? unitInfo.HeatingCompID : ddlHeatingCompValue,
    txbOA_FilterPD: isEdit ? unitInfo.txbOA_FilterPDText : 0.5,
    txbRA_FilterPD: isEdit ? unitInfo.txbRA_FilterPDText : 0.5,
    ckbHeatPump: isEdit ? unitInfo.ckbHeatPump : cooling.ckbHeatPumpChecked,
    ckbDehumidification: dehumidification.ckbDehumidification,
    ddlReheatComp: isEdit ? unitInfo.ReheatCompID : reheat.ddlReheatCompValue,
    ddlDamperAndActuator: isEdit ? unitInfo.DamperActuatorID : ddlDamperAndActuatorValue,
    ddlElecHeaterVoltage: isEdit ? unitInfo.ElecHeaterVoltageID : electricHeaterVoltage.ddlElecHeaterVoltageValue,
    ddlPreheatElecHeaterInstallation: isEdit
      ? unitInfo.PreheatElecHeaterInstallationID
      : preheatElectricHeader.ddlPreheatElecHeaterInstallationValue,
    ddlHeatElecHeaterInstallation: isEdit
      ? unitInfo.HeatElecHeaterInstallationID
      : heatElectricHeader.ddlHeatElecHeaterInstallationValue,
    ckbValveAndActuator: isEdit ? unitInfo.ckbValveAndActuator : valveAndActuator.ckbValveAndActuatorChecked,
    ckbDrainPan: isEdit ? unitInfo.ckbDrainPan : drainPan.ckbDrainPanChecked,
    ddlPreheatCoilHanding: isEdit ? unitInfo.PreheatCoilHandingID : ddlPreheatCoilHandingValue,
    ddlCoolingCoilHanding: isEdit ? unitInfo.CoolingCoilHandingID : ddlCoolingCoilHandingValue,
    ddlHeatingCoilHanding: isEdit ? unitInfo.HeatingCoilHandingID : ddlHeatingCoilHandingValue,
    ddlValveType: isEdit ? unitInfo.ValveTypeID : ddlValveTypeValue,
    txbPreheatSetpointDB: isEdit ? unitInfo.txbPreheatSetpointDBText : 40,
    txbCoolingSetpointDB: isEdit ? unitInfo.txbCoolingSetpointDBText : 55,
    txbCoolingSetpointWB: isEdit ? unitInfo.txbCoolingSetpointWBText : 54,
    txbHeatingSetpointDB: isEdit ? unitInfo.txbHeatingSetpointDBText : 72,
    txbReheatSetpointDB: isEdit ? unitInfo.txbReheatSetpointDBText : 70,
    ckbPreheatHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseCapValue : 0,
    txbPreheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_CapText : 0,
    ckbPreheatHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseFlowRateValue : 0,
    txbPreheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_FlowRateText : 0,
    ckbCoolingCWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseCapValue : 0,
    txbCoolingCWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_CapText : 0,
    ckbCoolingCWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseFlowRateValue : 0,
    txbCoolingCWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_FlowRateText : 0,
    ckbHeatingHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseCapValue : 0,
    txbHeatingHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_CapText : 0,
    ckbHeatingHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseFlowRateValue : 0,
    txbHeatingHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_FlowRateText : 0,
    ckbReheatHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseCapValue : 0,
    txbReheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_CapText : 0,
    ckbReheatHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseFlowRateValue : 0,
    txbReheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_FlowRateText : 0,
    ddlCoolingFluidType: isEdit ? unitInfo.CoolingFluidTypeID : ddlCoolingFluidTypeValue,
    ddlCoolingFluidConcentration: isEdit ? unitInfo.CoolingFluidConcentrationID : ddlCoolingFluidConcentrationValue,
    txbCoolingFluidEntTemp: isEdit ? unitInfo.txbCoolingFluidEntTempText : 45,
    txbCoolingFluidLvgTemp: isEdit ? unitInfo.txbCoolingFluidLvgTempText : 55,
    txbRefrigSuctionTemp: isEdit ? unitInfo.txbRefrigSuctionTempText : 43,
    txbRefrigLiquidTemp: isEdit ? unitInfo.txbRefrigLiquidTempText : 77,
    txbRefrigSuperheatTemp: isEdit ? unitInfo.txbRefrigSuperheatTempText : 9,
    ddlHeatingFluidType: isEdit ? unitInfo.HeatingFluidTypeID : ddlHeatingFluidTypeValue,
    ddlHeatingFluidConcentration: isEdit ? unitInfo.HeatingFluidConcentrationID : ddlHeatingFluidConcentrationValue,
    txbHeatingFluidEntTemp: isEdit ? unitInfo.txbHeatingFluidEntTempText : 140,
    txbHeatingFluidLvgTemp: isEdit ? unitInfo.txbHeatingFluidLvgTempText : 120,
    txbRefrigCondensingTemp: isEdit ? unitInfo.txbRefrigCondensingTempText : 115,
    txbRefrigVaporTemp: isEdit ? unitInfo.txbRefrigVaporTempText : 140,
    txbRefrigSubcoolingTemp: isEdit ? unitInfo.txbRefrigSubcoolingTempText : 5.4,
    txbPercentCondensingLoad: 0,
  };

  console.log(defaultValues);

  const methods = useForm({
    resolver: yupResolver(useUnitEditFormSchema),
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
        // setUnitModel(data.modelInfo);
        // setOrientation(data.orientationInfo);
        // setVoltage(data.voltageInfo.data);
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

  const onSubmit = (data) => {
    console.log(data);
  };

  const getDisplay = (key) => ({ display: key ? 'block' : 'block' });

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          {/* <LoadingButton
            type="submit"
            startIcon={<Iconify icon={isEdit ? 'bx:save' : 'carbon:add'} />}
            variant="contained"
            loading={isSubmitting}
          >
            {isEdit ? 'Save Changes' : 'Add Unit to Project'}
          </LoadingButton> */}
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
                    <RHFTextField size="small" name="txtTag" label="Tag" />
                    <RHFTextField size="small" name="txbQty" label="Quantity" />
                    <RHFSelect size="small" name="ddlLocation" label="Location" placeholder="">
                      <option value="" />
                      {ddlLocation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFCheckbox
                      size="small"
                      name="ckbDownshot"
                      label="Downshot"
                      checked={isEdit ? unitInfo.ckbDownshot === 1 : ckbDownshot === 1}
                    />
                    <RHFSelect size="small" name="ddlOrientation" label="Orientation" placeholder="">
                      <option value="" />
                      {ddlOrientation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlUnitType" label="Unit Type" placeholder="" disabled>
                      {ddlUnitType.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlControlsPreference" label="Control Preference" placeholder="">
                      <option value="" />
                      {ddlControlsPreference.map((item, index) => (
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
                        name="txbSummerSupplyAirCFM"
                        label="Supply Air (CFM)"
                        onBlur={onChangeSummerSupplyAirCFM}
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirCFM"
                        label="Supply Air (ASD)"
                        sx={getDisplay(divSummerReturnAirCFMVisible)}
                        onBlur={onChangeSummerReturnAirCFM}
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbSupplyAirESP"
                        label="Supply Air (ERC)"
                        onBlur={onChangeSupplyAirCFM}
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbExhaustAirESP"
                        label="Supply Air (DVG)"
                        sx={getDisplay(divExhaustAirESPVisible)}
                        onBlur={onChangeReturnAirCFM}
                        autoComplete="off"
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox
                        size="small"
                        name="ckbBypass"
                        label="Bypass for Economizer"
                        sx={getDisplay(divUnitBypassVisible)}
                        checked={isEdit ? unitInfo.ckbBypass === 1 : ckbBypass === 1}
                      />
                      <RHFSelect size="small" name="ddlUnitModel" label="Unit Model">
                        <option value="" />
                        {ddlUnitModel.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect size="small" name="ddlUnitVoltage" label="Unit Voltage">
                        <option value="" />
                        {ddlUnitVoltage.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFCheckbox
                        size="small"
                        name="ckbVoltageSPP"
                        label="Single Point Power Connection"
                        sx={getDisplay(divVoltageSPPVisible)}
                        checked={isEdit ? unitInfo.ckbVoltageSPP === 1 : ckbVoltageSPP === 1}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...getDisplay(divOutdoorAirDesignConditionsVisible), mb: 3 }}>
                <CardHeaderStyle title="Outdoor Air Design Conditions" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbAltitude" label="Altitude (ft):" autoComplete="off" />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirDB"
                        label="Summer Outdoor Air DB (F)"
                        onBlur={handleChangeSummerOutdoorAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirWB"
                        label="Summer Outdoor Air WB (F)"
                        onBlur={handleChangeSummerOutdoorAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirRH"
                        label="Summer Outdoor Air RH (%)"
                        onBlur={handleChangeSummerOutdoorAirRHChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirDB"
                        label="Winter Outdoor Air DB"
                        onBlur={handleChangeWinterOutdoorAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirWB"
                        label="Winter Outdoor Air WB"
                        onBlur={handleChangeWinterOutdoorAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirRH"
                        label="Winter Outdoor Air RH"
                        onBlur={handleChangeWinterOutdoorAirRHChanged}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...getDisplay(divReturnAirDesignConditionsVisible), mb: 3 }}>
                <CardHeaderStyle title="Return Air Design Conditions" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirDB"
                        label="Summer Return Air DB (F)"
                        onBlur={handleChangeSummerReturnAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirWB"
                        label="Summer Return Air WB (F)"
                        onBlur={handleChangeSummerReturnAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirRH"
                        label="Summer Return Air RH (%)"
                        onBlur={handleChangeSummerReturnAirRHChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirDB"
                        label="Winter Return Air DB"
                        onBlur={handleChangeWinterReturnAirDBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirWB"
                        label="Winter Return Air WB"
                        onBlur={handleChangeWinterReturnAirWBChanged}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirRH"
                        label="Winter Return Air RH"
                        onBlur={handleChangeWinterReturnAirRHChanged}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...getDisplay(divSetpoint_1Visible), mb: 3 }}>
                <CardHeaderStyle title="Setpoints" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="txbWinterPreheatSetpointDB"
                        label="Winter Preheat Setpoint DB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerCoolingSetpointDB"
                        label="Summer Cooling Setpoint DB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerCoolingSetpointWB"
                        label="Summer Cooling Setpoint WB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterHeatingSetpointDB"
                        label="Winter Heating Setpoint DB (F):"
                        autoComplete="off"
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReheatSetpointDB"
                        label="Summer Reheat Setpoint DB (F):"
                        autoComplete="off"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              {/* <Card sx={{ ...getDisplay(divNotesVisible), mb: 3 }}>
                <CardHeaderStyle title="Notes" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <Typography id="lblSelectionType" sx={{ p: 3 }}>
                      Velocity (FPM):
                    </Typography>
                    <Typography id="lblVelocity" sx={{ p: 3}}>
                      Selection Type: 
                    </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeaderStyle title="COMPONENTS" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlOA_FilterModel" label="QA Filter">
                      {ddlOA_FilterModel.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlRA_FilterModel"
                      label="RA Filter"
                      sx={getDisplay(divRA_FilterModelVisible)}
                    >
                      {ddlRA_FilterModel.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlPreheatComp"
                      label="Preheat"
                      sx={getDisplay(divPreheatCompVisible)}
                      onChange={onChangePreheat}
                    >
                      {ddlPreheatComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlHeatExchComp"
                      label="Heat Exchanger"
                      sx={getDisplay(divHeatExchCompVisible)}
                      onChange={onChangeCooling}
                    >
                      {ddlHeatExchComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlCoolingComp"
                      label="Cooling"
                      sx={getDisplay(divCoolingCompVisible)}
                      onChange={onChangeCooling}
                    >
                      {ddlCoolingComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlHeatingComp"
                      label="Heating"
                      sx={getDisplay(divHeatingCompVisible)}
                      onChange={onChangeHeating}
                    >
                      {ddlHeatingComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <Typography id="lblDXC_Message" sx={{ ...getDisplay(divDXC_MsgVisible), p: 3 }}>
                      DX Coil : Contact sales@oxygen8.ca for EEV/DX
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txbOA_FilterPD" label="QA Filter PD (in w.g.)" />
                    <RHFTextField
                      size="small"
                      name="txbRA_FilterPD"
                      label="RA Filter PD (in w.g.)"
                      sx={getDisplay(divRA_FilterPDVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbHeatPump"
                      label="Heat Pump"
                      sx={getDisplay(cooling.divHeatPumpVisible)}
                      checked={isEdit ? unitInfo.ckbHeatPump === 1 : cooling.ckbHeatPumpChecked === 1}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbDehumidification"
                      label="Dehumidification"
                      sx={getDisplay(dehumidification.divDehumidificationVisible)}
                      checked={isEdit ? unitInfo.ckbDehumidification === 1 : dehumidification.ckbDehumidification === 1}
                    />
                    <RHFSelect size="small" name="ddlReheatComp" label="Reheat" placeholder="">
                      {reheat.ddlReheatComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlDamperAndActuator" label="Dampers & Actuator" placeholder="">
                      {ddlDamperAndActuator.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlElecHeaterVoltage"
                      label="Elec. Heater Voltage"
                      placeholder=""
                      sx={getDisplay(elecHeaterVoltage.divElecHeaterVoltageVisible)}
                    >
                      {electricHeaterVoltage.ddlElecHeaterVoltage.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlPreheatElecHeaterInstallation"
                      label="Preheat Elec. Heater Installation"
                      placeholder=""
                    >
                      {preheatElectricHeader.ddlPreheatElecHeaterInstallation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlHeatElecHeaterInstallation"
                      label="Heating Elec. Heater Installation"
                      sx={getDisplay(heatElectricHeader.divHeatElecHeaterInstallationVisible)}
                      placeholder=""
                    >
                      {heatElectricHeader.ddlHeatElecHeaterInstallation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFCheckbox
                      size="small"
                      name="ckbValveAndActuator"
                      label="Include Valves & Actuator"
                      sx={getDisplay(valveAndActuator.divValveAndActuatorVisible)}
                      checked={
                        isEdit ? unitInfo.ckbValveAndActuator === 1 : valveAndActuator.ckbValveAndActuatorChecked === 1
                      }
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbDrainPan"
                      label="Drain Pan Required"
                      sx={getDisplay(drainPan.divDrainPanVisible)}
                      checked={isEdit ? unitInfo.ckbDrainPan === 1 : drainPan.ckbDrainPanChecked === 1}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(divSubmittalItemsVisible), mb: 3 }}>
              <CardHeaderStyle title="Submittals" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlPreheatCoilHanding" label="Preheat Coil Handing">
                      {ddlPreheatCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlCoolingCoilHanding" label="Cooling Coil Handing">
                      {ddlCoolingCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlHeatingCoilHanding" label="Heating Coil Handing">
                      {ddlHeatingCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlValveType"
                      sx={getDisplay(valveAndActuator.divValveTypeVisible)}
                      label="Valve Type"
                    >
                      {ddlValveType.map((item, index) => (
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
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeaderStyle title="Setpoints" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField
                      size="small"
                      name="txbPreheatSetpointDB"
                      label="Preheat LAT Setpoint DB (F)"
                      sx={getDisplay(divPreheatSetpointVisible)}
                    />
                    <RHFTextField
                      size="small"
                      name="txbCoolingSetpointDB"
                      label="Cooling LAT Setpoint DB (F)"
                      sx={getDisplay(divCoolingSetpointVisible.DB)}
                    />
                    <RHFTextField
                      size="small"
                      name="txbCoolingSetpointWB"
                      label="Cooling LAT Setpoint WB (F)"
                      sx={getDisplay(divHeatingSetpointVisible.WB)}
                    />
                    <RHFTextField
                      size="small"
                      name="txbHeatingSetpointDB"
                      label="Heating LAT Setpoint DB (F)"
                      sx={getDisplay(divHeatingSetpointVisible)}
                    />
                    <RHFTextField
                      size="small"
                      name="txbReheatSetpointDB"
                      label="Dehum. Reheat Setpoint DB (F)"
                      sx={getDisplay(reheatSetpoints.divReheatSetpointVisible)}
                    />
                  </Box>
                  <Divider />
                  <Box sx={{ ...getDisplay(divCustomVisible), display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFCheckbox
                      size="small"
                      name="ckbPreheatHWC_UseCap"
                      label="Preheat HWC Use Capacity"
                      sx={getDisplay(customInputs.divPreheatHWC_UseCapVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseCapValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbPreheatHWC_Cap"
                      label="Preheat HWC Capacity (MBH)"
                      sx={getDisplay(customInputs.divPreheatHWC_CapVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbPreheatHWC_UseFlowRate"
                      label="Preheat HWC Use Flow Rate"
                      sx={getDisplay(customInputs.divPreheatHWC_UseFlowRateVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseFlowRateValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbPreheatHWC_FlowRate"
                      label="Preheat HWC Flow Rate (GPM)"
                      sx={getDisplay(customInputs.divPreheatHWC_FlowRateVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbCoolingCWC_UseCap"
                      label="Cooling CWC Use Capacity"
                      sx={getDisplay(customInputs.divCoolingCWC_UseCapVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseCapValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbCoolingCWC_Cap"
                      label="Cooling CWC Capacity (MBH)"
                      sx={getDisplay(customInputs.divCoolingCWC_CapVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbCoolingCWC_UseFlowRate"
                      label="Cooling CWC Use Flow Rate"
                      sx={getDisplay(customInputs.divCoolingCWC_UseFlowRateVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseFlowRateValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbCoolingCWC_FlowRate"
                      label="Cooling CWC Flow Rate (GPM)"
                      sx={getDisplay(customInputs.divCoolingCWC_FlowRateVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbHeatingHWC_UseCap"
                      label="Heating HWC Use Capacity"
                      sx={getDisplay(customInputs.divHeatingHWC_UseCapVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseCapValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbHeatingHWC_Cap"
                      label="Heating HWC Capacity (MBH)"
                      sx={getDisplay(customInputs.divHeatingHWC_CapVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbHeatingHWC_UseFlowRate"
                      label="Heating HWC Use Flow Rate"
                      sx={getDisplay(customInputs.divHeatingHWC_UseFlowRateVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseFlowRateValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbHeatingHWC_FlowRate"
                      label="Heating HWC Flow Rate (GPM)"
                      sx={getDisplay(customInputs.divHeatingHWC_FlowRateVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbReheatHWC_UseCap"
                      label="Reheat HWC Use Capacity"
                      sx={getDisplay(customInputs.divReheatHWC_UseCapVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseCapValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbReheatHWC_Cap"
                      label="Reheat HWC Capacity (MBH)"
                      sx={getDisplay(customInputs.divReheatCompVisible)}
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbReheatHWC_UseFlowRate"
                      label="Reheat HWC Use Flow Rate"
                      sx={getDisplay(customInputs.divReheatHWC_UseFlowRateVisible)}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseFlowRateValue : false}
                    />
                    <RHFTextField
                      size="small"
                      name="txbReheatHWC_FlowRate"
                      label="Reheat HWC Flow Rate (GPM)"
                      sx={getDisplay(customInputs.divReheatSetpointVisible)}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(cooling.divCoolingFluidDesignConditionsVisible), mb: 3 }}>
              <CardHeaderStyle title="Cooling Fluid Design Conditions" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlCoolingFluidType" label="Cooling Fluid Type">
                      {ddlCoolingFluidType.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlCoolingFluidConcentration" label="Cooling Fluid %">
                      {ddlCoolingFluidConcentration.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFTextField size="small" name="txbCoolingFluidEntTemp" label="Cooling Fluid Ent Temp (F)" />
                    <RHFTextField size="small" name="txbCoolingFluidLvgTemp" label="Cooling Fluid Lvg Temp (F)" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(refrigerantInfo.divDX_RefrigerantVisible), mb: 3 }}>
              <CardHeaderStyle title="DX Coil Refrigerant" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txbRefrigSuctionTemp" label="Suction Temp (F)" />
                    <RHFTextField size="small" name="txbRefrigLiquidTemp" label="Liquid Temp (F)" />
                    <RHFTextField size="small" name="txbRefrigSuperheatTemp" label="Superheat Temp (F)" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(divHeatingFluidDesignConditionsVisible), mb: 3 }}>
              <CardHeaderStyle title="Heating Fluid Design Conditions" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlHeatingFluidType" label="Heating Fluid Type">
                      {ddlHeatingFluidType.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlHeatingFluidConcentration" label="Heating Fluid %">
                      {ddlHeatingFluidConcentration.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFTextField size="small" name="txbHeatingFluidEntTemp" label="Heating Fluid Ent Temp (F)" />
                    <RHFTextField size="small" name="txbHeatingFluidLvgTemp" label="Heating Fluid Lvg Temp (F)" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(refrigerantInfo.divCondRefrigerantVisible), mb: 3 }}>
              <CardHeaderStyle title="Condenser Coil Refrigerant" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txbRefrigCondensingTemp" label="Condensing Temp (F)" />
                    <RHFTextField size="small" name="txbRefrigVaporTemp" label="Condensing Temp (F)" />
                    <RHFTextField size="small" name="txbRefrigSubcoolingTemp" label="Subcooling Temp (F)" />
                    <RHFTextField size="small" name="txbPercentCondensingLoad" label="% Condensing Load" />
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
