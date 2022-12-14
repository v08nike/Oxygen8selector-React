import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';

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
  Divider,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUnitEditFormSchema } from '../../hooks/useUnitEditForm';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import * as unitReducer from '../../redux/slices/unitReducer';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../../components/hook-form';
import { PATH_UNIT } from '../../routes/paths';
//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: theme.palette.primary.main,
}));

const dblTempErrorValue = 0.000;

// -----------------------------------------------

UnitEdit.propTypes = {
  unitType: PropTypes.string,
  productType: PropTypes.number,
};
export default function UnitEdit({ unitType, productType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const { state } = useLocation();

  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo } = useSelector((state) => state.unit);
  console.log(controlInfo, unitInfo);

  const {
    ddlOrientation,
    ddlOrientationValue,
    ddlUnitModel,
    ddlUnitModelValue,
    divCustomVisible,
    divHeatExchCompVisible,
    divOutdoorAirDesignConditionsVisible,
    divReturnAirDesignConditionsVisible,
    divSetpoint_1Visible,
    divSubmittalItemsVisible,
    ddlUnitType,
    ddlUnitTypeValue,
    ddlControlsPreference,
    ddlControlsPreferenceValue,
    ddlDamperAndActuator,
    ddlDamperAndActuatorValue,
    ddlDamperAndActuatorVisible,
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
    ddlUnitVoltage,
    ddlUnitVoltageValue,
    elecHeaterVoltage,
    ckbBypass,
    reheat,
    cooling,
    drainPan,
    customInputs,
    reheatSetpoints,
    refrigerantInfo,
    dehumidification,
    valveAndActuator,
    divDXC_MsgVisible,
    heatElectricHeater,
    preheatElectricHeater,
    divPreheatSetpointVisible,
    divCoolingSetpointVisible,
    divHeatingSetpointVisible,
    divHeatingFluidDesignConditionsVisible,
  } = controlInfo;

  const defaultValues = {
    txtTag: isEdit ? unitInfo.txbTagText : '',
    txbQty: isEdit ? unitInfo.txbQtyText : '1',
    ddlLocation: isEdit ? unitInfo.locationID : ddlLocationValue,
    ckbDownshot: isEdit ? unitInfo.ckbDownshot === 1 : ckbDownshot === 1,
    ddlOrientation: isEdit ? unitInfo.orientationID : ddlOrientationValue,
    ddlUnitType: isEdit ? unitInfo.unitTypeID : ddlUnitTypeValue,
    ddlControlsPreference: ddlControlsPreferenceValue,
    txbSummerSupplyAirCFM: isEdit ? unitInfo.txbSummerSupplyAirCFMText : 325,
    txbSummerReturnAirCFM: isEdit ? unitInfo.txbSummerReturnAirCFMText : 325,
    txbSupplyAirESP: isEdit ? unitInfo.txbSupplyAirESPText : 0.75,
    txbExhaustAirESP: isEdit ? unitInfo.txbExhaustAirESPText : 0.75,
    ckbBypass: isEdit ? unitInfo.ckbBypass === 1 : ckbBypass.ckbBypassChecked === 1,
    ddlUnitModel: isEdit ? unitInfo.unitModelID : ddlUnitModelValue,
    ddlUnitVoltage: isEdit ? unitInfo.unitVoltageID : ddlUnitVoltageValue,
    ckbVoltageSPP: isEdit ? unitInfo.ckbVoltageSPP === 1 : ckbVoltageSPP === 1,
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
    ddlHeatExchComp: isEdit ? unitInfo.HeatExchCompID : ddlHeatExchCompValue, //
    ddlCoolingComp: isEdit ? unitInfo.CoolingCompID : ddlCoolingCompValue, //
    ddlHeatingComp: isEdit ? unitInfo.HeatingCompID : ddlHeatingCompValue,
    txbOA_FilterPD: isEdit ? unitInfo.txbOA_FilterPDText : 0.5,
    txbRA_FilterPD: isEdit ? unitInfo.txbRA_FilterPDText : 0.5,
    ckbHeatPump: isEdit ? unitInfo.ckbHeatPump === 1 : cooling.ckbHeatPumpChecked === 1,
    ckbDehumidification: isEdit ? unitInfo.ckbDehumidification : dehumidification.ckbDehumidification === 1,
    ddlReheatComp: isEdit ? unitInfo.ReheatCompID : reheat.ddlReheatCompValue,
    ddlDamperAndActuator: isEdit ? unitInfo.DamperActuatorID : ddlDamperAndActuatorValue,
    ddlElecHeaterVoltage: isEdit ? unitInfo.ElecHeaterVoltageID : elecHeaterVoltage.ddlElecHeaterVoltageValue,
    ddlPreheatElecHeaterInstallation: isEdit
      ? unitInfo.PreheatElecHeaterInstallationID
      : preheatElectricHeater.ddlPreheatElecHeaterInstallationValue,
    ddlHeatElecHeaterInstallation: isEdit
      ? unitInfo.HeatElecHeaterInstallationID
      : heatElectricHeater.ddlHeatElecHeaterInstallationValue,
    ckbValveAndActuator: isEdit ? unitInfo.ckbValveAndActuator === 1 : valveAndActuator.ckbValveAndActuatorChecked === 1,
    ckbDrainPan: isEdit ? unitInfo.ckbDrainPan  === 1: drainPan.ckbDrainPanChecked === 1,
    ddlPreheatCoilHanding: isEdit ? unitInfo.PreheatCoilHandingID : ddlPreheatCoilHandingValue,
    ddlCoolingCoilHanding: isEdit ? unitInfo.CoolingCoilHandingID : ddlCoolingCoilHandingValue,
    ddlHeatingCoilHanding: isEdit ? unitInfo.HeatingCoilHandingID : ddlHeatingCoilHandingValue,
    ddlValveType: isEdit ? unitInfo.ValveTypeID : ddlValveTypeValue,
    txbPreheatSetpointDB: isEdit ? unitInfo.txbPreheatSetpointDBText : 40,
    txbCoolingSetpointDB: isEdit ? unitInfo.txbCoolingSetpointDBText : 55,
    txbCoolingSetpointWB: isEdit ? unitInfo.txbCoolingSetpointWBText : 54,
    txbHeatingSetpointDB: isEdit ? unitInfo.txbHeatingSetpointDBText : 72,
    txbReheatSetpointDB: isEdit ? unitInfo.txbReheatSetpointDBText : 70,
    ckbPreheatHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseCapValue === 1 : false,
    txbPreheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_CapText : 0,
    ckbPreheatHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseFlowRateValue === 1 : false,
    txbPreheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_FlowRateText : 0,
    ckbCoolingCWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseCapValue  === 1: false,
    txbCoolingCWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_CapText : 0,
    ckbCoolingCWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseFlowRateValue === 1 : false,
    txbCoolingCWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_FlowRateText : 0,
    ckbHeatingHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseCapValue  === 1: 0,
    txbHeatingHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_CapText : 0,
    ckbHeatingHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseFlowRateValue === 1 : false,
    txbHeatingHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_FlowRateText : 0,
    ckbReheatHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseCapValue  === 1: 0,
    txbReheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_CapText : 0,
    ckbReheatHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseFlowRateValue === 1 : false,
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
    txbUnitHeightText: isEdit ? unitInfo.txbUnitHeightText : 0,
    txbUnitLengthText: isEdit ? unitInfo.txbUnitLengthText : 0,
    txbUnitWeightText: isEdit ? unitInfo.txbUnitWeightText : 0,
    txbUnitWidthText: isEdit ? unitInfo.txbUnitWidthText : 0,
    ddlHandingValue: isEdit ? unitInfo.ddlHandingValue : 1,
    ddlSupplyAirOpeningValue: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlSupplyAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '1',
    ddlExhaustAirOpeningValue: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlExhaustAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '2',
    ddlOutdoorAirOpeningValue: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlOutdoorAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '4',
    ddlReturnAirOpeningValue: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlReturnAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '3',
  };

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

  const [successNotification, setOpenSuccessNotification] = React.useState(false);

  const handleSuccessNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessNotification(false);
  };

  const [errorNotification, setOpenErrorNotification] = React.useState(false);
  const handleErrorNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorNotification(false);
  };

  const getDisplay = (key) => ({ display: key ? 'block' : 'none' });
  const getAllFormData = () => ({
    ...getValues(),
    intJobID: jobId,
    intUnitNo: unitId,
    intProductTypeID: productType,
    intUnitTypeID: unitType,
    intUAL: localStorage.getItem('UAL'),
    intUserID: localStorage.getItem('userId'),
  });

  const onSubmit = async () => {
    const result = await dispatch(unitReducer.saveUnitInfo(getAllFormData()));
    setOpenSuccessNotification(true);
    navigate(PATH_UNIT.edit(jobId, result), {state});
  };

  const ddlLocationChanged = async (e) => {
    setValue('ddlLocation', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlLocationChanged(getAllFormData()));
    setValue("ddlOrientation", result.ddlOrientationValue);
    setValue("ddlDamperAndActuator", result.ddlDamperAndActuatorValue);
    setValue("ddlUnitModel", result.ddlUnitModelValue);
    setValue("ckbBypass", result.others.ckbBypass);
    setValue("ddlElecHeaterVoltage", result.others.elecHeaterVoltage.ddlElecHeaterVoltageValue);
    setValue("ckbBypass", result.downshot);
    setValue("ddlPreheatElecHeaterInstallation", result.preheatElectricHeater.ddlPreheatElecHeaterInstallationValue);
    setValue("txbSupplyAirESP", result.txbSupplyAirESP);
    setValue("txbExhaustAirESP", result.txbExhaustAirESP);
  };

  const ddlOrientationChanged = async (e) => {
    setValue('ddlOrientation', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlOrientationChanged(getAllFormData()));
    setValue("ddlUnitModel", result.ddlUnitModelValue);
    setValue("ckbBypass", result.others.ckbBypass.ckbBypassChecked);
    setValue("ddlElecHeaterVoltage", result.others.elecHeaterVoltage.ddlElecHeaterVoltageValue);
    setValue("ddlSupplyAirOpeningValue", result.ddlSupplyAirOpeningValue);
    setValue("ddlSupplyAirOpeningText", result.ddlSupplyAirOpeningText);
  };

  const txbSummerSupplyAirCFMChanged = async () => {
    const result = await dispatch(unitReducer.txbSummerSupplyAirCFMChanged(getAllFormData()));
    setValue("ddlOrientation", result.ddlOrientationValue);
    setValue("ddlUnitModel", result.ddlUnitModelValue);
    setValue("ckbBypass", result.others.ckbBypass.ckbBypassChecked);
    setValue("ddlElecHeaterVoltage", result.others.elecHeaterVoltage.ddlElecHeaterVoltageValue);
    setValue("ddlSupplyAirOpeningValue", result.ddlSupplyAirOpeningValue);
    setValue("ddlSupplyAirOpeningText", result.ddlSupplyAirOpeningText);
    setValue("txbSummerSupplyAirCFM", result.txbSummerSupplyAirCFM);
    setValue("txbSummerReturnAirCFM", result.txbSummerReturnAirCFM);
  };

  const txbSummerReturnAirCFMChanged = async () => {
    const result = await dispatch(unitReducer.txbSummerReturnAirCFMChanged(getAllFormData()));
    setValue("txbSummerReturnAirCFM", result);
  };

  const txbSupplyAirESPChanged = async () => {
    const result = await dispatch(unitReducer.txbSupplyAirESPChanged(getAllFormData()));
    setValue("txbSupplyAirESP", result);
  };

  const txbExhaustAirESPChanged = async () => {
    const result = await dispatch(unitReducer.txbExhaustAirESPChanged(getAllFormData()));
    setValue("txbExhaustAirESP", result);
  };

  const ddlUnitModelChanged = async (e) => {
    setValue("ddlUnitModel", parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlUnitModelChanged(getAllFormData()));
    setValue("ddlUnitVoltageValue", result.ddlUnitVoltageValue);
    setValue("ddlElecHeaterVoltage", result.elecHeaterVoltage.ddlElecHeaterVoltageValue);
    setValue("txbSupplyAirESP", result.txbSupplyAirESP);
  };

  const ddlUnitVoltageChanged = async (e) => {
    setValue("ddlUnitVoltage", parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlUnitVoltageChanged(getAllFormData()));
    setValue("ddlElecHeaterVoltage", result.ddlElecHeaterVoltageValue);
  };

  const txbSummerOutdoorAirDBChanged = async (e) => {
    setValue("txbSummerOutdoorAirDB", parseFloat(e.target.value, 10));
    if ( e.target.value === 0)
    {
      setValue("txbSummerOutdoorAirWB", 0);
      setValue("txbSummerOutdoorAirRH", 100);
    }
    else
    {
      setValue("txbSummerOutdoorAirWB", dblTempErrorValue);
      setValue("txbSummerOutdoorAirRH", dblTempErrorValue);
    }
  };

  const txbSummerOutdoorAirWBChanged = async (e) => {
    setValue("txbSummerOutdoorAirWB", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerOutdoorAirWBChanged(getAllFormData()));
    setValue('txbSummerOutdoorAirRH', result);
  };

  const txbSummerOutdoorAirRHChanged = async (e) => {
    setValue("txbSummerOutdoorAirRH", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerOutdoorAirRHChanged(getAllFormData()));
    setValue('txbSummerOutdoorAirWB', result);
  };

  const txbWinterOutdoorAirDBChanged = async (e) => {
    setValue('txbWinterOutdoorAirDB', parseFloat(e.target.value, 10));
    if (e.target.value === 0){
      setValue('txbWinterOutdoorAirWB', 0);
      setValue('txbWinterOutdoorAirRH', 100);
    } else {
      setValue('txbWinterOutdoorAirWB', dblTempErrorValue);
      setValue('txbWinterOutdoorAirRH', dblTempErrorValue);
    }
  };
                                                                                                                                                                                                                                                         
  const txbWinterOutdoorAirWBChanged = async (e) => {
    setValue("txbWinterOutdoorAirWB", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbWinterOutdoorAirWBChanged(getAllFormData()));
    setValue('txbWinterOutdoorAirRH', result);
  };

  const txbWinterOutdoorAirRHChanged = async (e) => {
    setValue("txbWinterOutdoorAirRH", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbWinterOutdoorAirRHChanged(getAllFormData()));
    setValue('txbWinterOutdoorAirWB', result);
  };

  const txbSummerReturnAirDBChanged = (e) => {
    setValue('txbSummerReturnAirDB', parseFloat(e.target.value, 10));
    if (e.target.value === 0)
    {
        setValue('txbSummerReturnAirWB', 0);
        setValue('txbSummerReturnAirRH', 100);
    }
    else
    {
      setValue('txbSummerReturnAirWB', dblTempErrorValue);
      setValue('txbSummerReturnAirRH', dblTempErrorValue);
    }
  };

  const txbSummerReturnAirWBChanged = async (e) => {
    setValue("txbSummerReturnAirWB", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerReturnAirWBChanged(getAllFormData()));
    setValue('txbSummerReturnAirRH', result);
  };

  const txbSummerReturnAirRHChanged = async (e) => {
    setValue("txbSummerReturnAirRH", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerReturnAirRHChanged(getAllFormData()));
    setValue('txbSummerReturnAirWB', result);
  };

  const txbWinterReturnAirDBChanged = (e) => {
    setValue("txbWinterReturnAirDB", parseFloat(e.target.value, 10));

    if (e.target === 0)
    {
      setValue('txbWinterReturnAirWB', 0);
      setValue('txbWinterReturnAirRH', 100);
    }
    else
    {
      setValue('txbWinterReturnAirWB', dblTempErrorValue);
      setValue('txbWinterReturnAirRH', dblTempErrorValue);
    }
  };

  const txbWinterReturnAirWBChanged = async (e) => {
    setValue("txbWinterReturnAirWB", parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbWinterReturnAirWBChanged(getAllFormData()));
    setValue('txbWinterReturnAirRH', result);
  };

  const txbWinterReturnAirRHChanged = async(e) => {
    if(!isNaN(+e.target.value)) {
      setValue("txbWinterReturnAirRH", parseFloat(e.target.value, 10));
      const result = await dispatch(unitReducer.txbWinterReturnAirRHChanged(getAllFormData()));
      setValue('txbWinterReturnAirWB', result);
    };
  };

  const ddlPreheatCompChanged = async (e) => {
    setValue("ddlPreheatComp", parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlPreheatCompChanged(getAllFormData()));
    setValue("ddlPreheatElecHeaterInstallation", result.preheatElectricHeater.divPreheatElecHeaterInstallationVisible && result.preheatElectricHeater.ddlPreheatElecHeaterInstallationValue);
    setValue("ddlElecHeaterVoltage", result.preheatElectricHeater.electricHeaterVoltageInfo.divElecHeaterVoltageVisible && result.preheatElectricHeater.electricHeaterVoltageInfo.ddlElecHeaterVoltageValue);
  };

  const ddlHeatExchCompChanged = (e) => {
    // console.log(e.target.value);
  };

  const ddlCoolingCompChanged = async (e) => {
    setValue("ddlCoolingComp", parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlCoolingCompChanged(getAllFormData()));    
  };

  const ddlHeatingCompChanged = async (e) => {
    setValue("ddlHeatingComp", parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlHeatingCompChanged(getAllFormData()));    
  };

  const txbOA_FilterPDChanged = async (e) => {
    console.log(getAllFormData());
    if (e.target.value > 1.0)
    {
      setValue("txbOA_FilterPD", 1.0);
    } else  if (e.target.value < 0.3)
    {
      setValue("txbOA_FilterPD", 0.3);
    } else {
      setValue("txbOA_FilterPD", parseFloat(e.target.value, 10));
    }
  };

  const txbRA_FilterPDChanged = (e) => {
    // console.log(getAllFormData());
    if (e.target.value > 1.0)
    {
      setValue("txbRA_FilterPD", 1.0);
    } else  if (e.target.value < 0.3)
    {
      setValue("txbRA_FilterPD", 0.3);
    } else {
      setValue("txbRA_FilterPD", parseFloat(e.target.value, 10));
    }
  };

  const ddlElecHeaterVoltageChanged = async (e) => {
    setValue("ddlElecHeaterVoltage", parseInt(e.target.value, 10));
  };

  const setValuewithCheck = (e, key) => {
    if (!isNaN(+e.target.value)) {
      setValue(key, parseFloat(e.target.value, 10));
    }
  }

  const clickedCheckbox = (key) => {
    setValue(key, 1 - getValues(key));
    console.log(getValues(key));
  }
  
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          <LoadingButton
            type="submit"
            startIcon={<Iconify icon={isEdit ? 'bx:save' : 'carbon:add'} />}
            variant="contained"
            loading={isSubmitting}
          >
            {isEdit ? 'Save Changes' : 'Add Unit to Project'}
          </LoadingButton>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'grid', rowGap: 0, columnGap: 1 }}>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="GENTERAL UNIT INFORMATION" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txtTag" label="Tag" />
                    <RHFTextField size="small" name="txbQty" label="Quantity" onChange={(e) => {setValuewithCheck(e, 'txbQty')}} />
                    <RHFSelect
                      size="small"
                      name="ddlLocation"
                      label="Location"
                      placeholder=""
                      onChange={ddlLocationChanged}
                    >
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
                      sx={getDisplay(ckbDownshot === 1)}
                      defaultChecked={getValues("ckbDownshot") === 1}
                      onChange={(e) => {
                        e.preventDefault();
                        clickedCheckbox('ckbDownshot')
                      }}
                    />
                    <RHFSelect
                      size="small"
                      name="ddlOrientation"
                      label="Orientation"
                      placeholder=""
                      onChange={ddlOrientationChanged}
                    >
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
                    <RHFSelect size="small" name="ddlControlsPreference" label="Control Preference" placeholder="" onChange={(e) => { setValue('ddlControlsPreference', parseInt(e.target.value, 10)) }}>
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
                        onBlur={txbSummerSupplyAirCFMChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerSupplyAirCFM')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirCFM"
                        label="Supply Air (ASD)"
                        sx={getDisplay(divSummerReturnAirCFMVisible)}
                        onBlur={txbSummerReturnAirCFMChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerReturnAirCFM')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSupplyAirESP"
                        label="Supply Air (ERC)"
                        onBlur={txbSupplyAirESPChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSupplyAirESP')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbExhaustAirESP"
                        label="Supply Air (DVG)"
                        sx={getDisplay(divExhaustAirESPVisible)}
                        onBlur={txbExhaustAirESPChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbExhaustAirESP')}}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox
                        size="small"
                        name="ckbBypass"
                        label="Bypass for Economizer"
                        sx={getDisplay(divUnitBypassVisible)}
                        checked={getValues('ckbBypass') === 1}
                      />
                      <RHFSelect size="small" name="ddlUnitModel" label="Unit Model" onChange={ddlUnitModelChanged}>
                        {ddlUnitModel.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect
                        size="small"
                        name="ddlUnitVoltage"
                        label="Unit Voltage"
                        onChange={ddlUnitVoltageChanged}
                      >

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
                      <RHFTextField size="small" name="txbAltitude" label="Altitude (ft):" autoComplete="off" disabled />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirDB"
                        label="Summer Outdoor Air DB (F)"
                        onBlur={txbSummerOutdoorAirDBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerOutdoorAirDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirWB"
                        label="Summer Outdoor Air WB (F)"
                        onBlur={txbSummerOutdoorAirWBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerOutdoorAirWB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirRH"
                        label="Summer Outdoor Air RH (%)"
                        onBlur={txbSummerOutdoorAirRHChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerOutdoorAirRH')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirDB"
                        label="Winter Outdoor Air DB"
                        onBlur={txbWinterOutdoorAirDBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterOutdoorAirDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirWB"
                        label="Winter Outdoor Air WB"
                        onBlur={txbWinterOutdoorAirWBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterOutdoorAirWB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirRH"
                        label="Winter Outdoor Air RH"
                        onBlur={txbWinterOutdoorAirRHChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterOutdoorAirRH')}}
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
                        onBlur={txbSummerReturnAirDBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerReturnAirDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirWB"
                        label="Summer Return Air WB (F)"
                        onBlur={txbSummerReturnAirWBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerReturnAirWB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirRH"
                        label="Summer Return Air RH (%)"
                        onBlur={txbSummerReturnAirRHChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerReturnAirRH')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirDB"
                        label="Winter Return Air DB"
                        onBlur={txbWinterReturnAirDBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterReturnAirDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirWB"
                        label="Winter Return Air WB"
                        onBlur={txbWinterReturnAirWBChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterReturnAirWB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirRH"
                        label="Winter Return Air RH"
                        onBlur={txbWinterReturnAirRHChanged}
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterReturnAirRH')}}
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
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterPreheatSetpointDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerCoolingSetpointDB"
                        label="Summer Cooling Setpoint DB (F):"
                        autoComplete="off"
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerCoolingSetpointDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerCoolingSetpointWB"
                        label="Summer Cooling Setpoint WB (F):"
                        autoComplete="off"
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerCoolingSetpointWB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterHeatingSetpointDB"
                        label="Winter Heating Setpoint DB (F):"
                        autoComplete="off"
                        onChange={(e) => {setValuewithCheck(e, 'txbWinterHeatingSetpointDB')}}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReheatSetpointDB"
                        label="Summer Reheat Setpoint DB (F):"
                        autoComplete="off"
                        onChange={(e) => {setValuewithCheck(e, 'txbSummerReheatSetpointDB')}}
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
                    <RHFSelect size="small" name="ddlOA_FilterModel" label="QA Filter" onChange={(e) => setValue("ddlOA_FilterModel", parseInt(e.target.value, 10))}>
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
                      onChange={(e) => setValue("ddlRA_FilterModel", parseInt(e.target.value, 10))}
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
                      onChange={ddlPreheatCompChanged}
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
                      onChange={ddlHeatExchCompChanged}
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
                      onChange={ddlCoolingCompChanged}
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
                      onChange={ddlHeatingCompChanged}
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
                    <RHFTextField
                      size="small"
                      name="txbOA_FilterPD"
                      label="QA Filter PD (in w.g.)"
                      onBlur={txbOA_FilterPDChanged}
                      onChange={(e) => {setValuewithCheck(e, 'txbOA_FilterPD')}}
                    />
                    <RHFTextField
                      size="small"
                      name="txbRA_FilterPD"
                      label="RA Filter PD (in w.g.)"
                      sx={getDisplay(divRA_FilterPDVisible)}
                      onBlur={txbRA_FilterPDChanged}
                      onChange={(e) => {setValuewithCheck(e, 'txbRA_FilterPD')}}
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
                      sx={getDisplay()}
                      checked={isEdit ? unitInfo.ckbDehumidification === 1 : dehumidification.ckbDehumidification === 1}
                    />
                    {/* <RHFSelect size="small" name="ddlReheatComp" label="Reheat" placeholder="">
                      {reheat.ddlReheatComp.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect> */}
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect
                      size="small"
                      name="ddlDamperAndActuator"
                      label="Dampers & Actuator"
                      sx={getDisplay(ddlDamperAndActuatorVisible)}
                      onChange={(e) => { setValue('ddlDamperAndActuator', parseInt(e.target.value, 10)) }}
                      placeholder=""
                    >
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
                      onChange={ddlElecHeaterVoltageChanged}
                    >
                      {elecHeaterVoltage.ddlElecHeaterVoltage.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    {preheatElectricHeater.divPreheatElecHeaterInstallationVisible && (
                      <RHFSelect
                        size="small"
                        name="ddlPreheatElecHeaterInstallation"
                        label="Preheat Elec. Heater Installation"
                        placeholder=""
                      >
                        {preheatElectricHeater.ddlPreheatElecHeaterInstallation.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.items}
                            </option>
                          ))}
                      </RHFSelect>
                    )}

                    <RHFSelect
                      size="small"
                      name="ddlHeatElecHeaterInstallation"
                      label="Heating Elec. Heater Installation"
                      sx={getDisplay(heatElectricHeater.divHeatElecHeaterInstallationVisible)}
                      onChange={(e) => setValue('ddlHeatElecHeaterInstallation', parseInt(e.target.value, 10))}
                      placeholder=""
                    >
                      {heatElectricHeater.ddlHeatElecHeaterInstallation.map((item, index) => (
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
                    <RHFSelect size="small" name="ddlPreheatCoilHanding" label="Preheat Coil Handing" onChange={(e) => setValue('ddlPreheatCoilHanding', parseInt(e.target.value, 10))} sx={getDisplay(getValues('ddlPreheatComp') > 1)}>
                      {ddlPreheatCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlCoolingCoilHanding" label="Cooling Coil Handing" onChange={(e) => setValue('ddlCoolingCoilHanding', parseInt(e.target.value, 10))} sx={getDisplay(getValues('ddlCoolingComp') > 1)}>
                      {ddlCoolingCoilHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlHeatingCoilHanding" label="Heating Coil Handing" onChange={(e) => setValue('ddlHeatingCoilHanding', parseInt(e.target.value, 10))} sx={getDisplay(getValues('ddlHeatingComp') > 1)}>
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
                      onChange={(e) => {setValuewithCheck(e, 'txbPreheatSetpointDB')}}
                    />
                    <RHFTextField
                      size="small"
                      name="txbCoolingSetpointDB"
                      label="Cooling LAT Setpoint DB (F)"
                      sx={getDisplay(divCoolingSetpointVisible.DB)}
                      onChange={(e) => {setValuewithCheck(e, 'txbCoolingSetpointDB')}}
                    />
                    <RHFTextField
                      size="small"
                      name="txbCoolingSetpointWB"
                      label="Cooling LAT Setpoint WB (F)"
                      sx={getDisplay(divHeatingSetpointVisible.WB)}
                      onChange={(e) => {setValuewithCheck(e, 'txbCoolingSetpointWB')}}
                    />
                    <RHFTextField
                      size="small"
                      name="txbHeatingSetpointDB"
                      label="Heating LAT Setpoint DB (F)"
                      sx={getDisplay(divHeatingSetpointVisible)}
                      onChange={(e) => {setValuewithCheck(e, 'txbHeatingSetpointDB')}}
                    />
                    <RHFTextField
                      size="small"
                      name="txbReheatSetpointDB"
                      label="Dehum. Reheat Setpoint DB (F)"
                      sx={getDisplay(reheatSetpoints.divReheatSetpointVisible)}
                      onChange={(e) => {setValuewithCheck(e, 'txbReheatSetpointDB')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbPreheatHWC_Cap')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbPreheatHWC_FlowRate')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbCoolingCWC_Cap')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbCoolingCWC_FlowRate')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbHeatingHWC_Cap')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbHeatingHWC_FlowRate')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbReheatHWC_Cap')}}
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
                      onChange={(e) => {setValuewithCheck(e, 'txbReheatHWC_FlowRate')}}
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
                    <RHFTextField size="small" name="txbCoolingFluidEntTemp" label="Cooling Fluid Ent Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbCoolingFluidEntTemp')}}/>
                    <RHFTextField size="small" name="txbCoolingFluidLvgTemp" label="Cooling Fluid Lvg Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbCoolingFluidLvgTemp')}} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(refrigerantInfo.divDX_RefrigerantVisible), mb: 3 }}>
              <CardHeaderStyle title="DX Coil Refrigerant" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txbRefrigSuctionTemp" label="Suction Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbRefrigSuctionTemp')}}/>
                    <RHFTextField size="small" name="txbRefrigLiquidTemp" label="Liquid Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbRefrigLiquidTemp')}}/>
                    <RHFTextField size="small" name="txbRefrigSuperheatTemp" label="Superheat Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbRefrigSuperheatTemp')}}/>
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
                    <RHFTextField size="small" name="txbHeatingFluidEntTemp" label="Heating Fluid Ent Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbHeatingFluidEntTemp')}}/>
                    <RHFTextField size="small" name="txbHeatingFluidLvgTemp" label="Heating Fluid Lvg Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbHeatingFluidLvgTemp')}}/>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(refrigerantInfo.divCondRefrigerantVisible), mb: 3 }}>
              <CardHeaderStyle title="Condenser Coil Refrigerant" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txbRefrigCondensingTemp" label="Condensing Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbRefrigCondensingTemp')}}/>
                    <RHFTextField size="small" name="txbRefrigVaporTemp" label="Condensing Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbRefrigVaporTemp')}}/>
                    <RHFTextField size="small" name="txbRefrigSubcoolingTemp" label="Subcooling Temp (F)" onChange={(e) => {setValuewithCheck(e, 'txbRefrigSubcoolingTemp')}}/>
                    <RHFTextField size="small" name="txbPercentCondensingLoad" label="% Condensing Load" onChange={(e) => {setValuewithCheck(e, 'txbPercentCondensingLoad')}}/>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <Snackbar open={successNotification} autoHideDuration={6000} onClose={handleSuccessNotificationClose}>
        <Alert onClose={handleSuccessNotificationClose} severity="success" sx={{ width: '100%' }}>
          {isEdit ? 'Unit update successful!!!' : 'Unit was successfully added!!!'}
        </Alert>
      </Snackbar>
      <Snackbar open={errorNotification} autoHideDuration={6000} onClose={handleErrorNotificationClose}>
        <Alert onClose={handleErrorNotificationClose} severity="error" sx={{ width: '100%' }}>
          {isEdit ? 'Unit update failed!' : 'Failed to add Unit!'}
        </Alert>
      </Snackbar>
    </Container>
  );
}
