import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';
// store
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  productType: [],
  unitType: [],
  productTypeUnitTypeLink: [],
  controlInfo: {},
  unitInfo: {},
  visibleInfo: {},
};

const UnitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setJobInfo(state, action) {
      state.productType = action.payload.productType;
      state.unitType = action.payload.unitType;
      state.productTypeUnitTypeLink = action.payload.productTypeUnitTypeLink;
      state.isLoading = false;
    },
    setInitInfo(state, action) {
      const {controlInfo, unitInfo, visibleInfo} = action.payload;
      state.controlInfo = {
        ddlOrientation : controlInfo.mainControlData.ddlOrientation,
        ddlOrientationValue : controlInfo.mainControlData.ddlOrientationValue,
        ddlUnitModel : controlInfo.mainControlData.ddlUnitModel ,
        ddlUnitModelValue : controlInfo.mainControlData.ddlUnitModelValue,
        divCustomVisible : visibleInfo.divCustomVisible,
        divHeatExchCompVisible : visibleInfo.divHeatExchCompVisible,
        divOutdoorAirDesignConditionsVisible : visibleInfo.divOutdoorAirDesignConditionsVisible,
        divReturnAirDesignConditionsVisible : visibleInfo.divReturnAirDesignConditionsVisible,
        divSetpoint_1Visible : visibleInfo.divSetpoint_1Visible,
        divSubmittalItemsVisible : visibleInfo.divSubmittalItemsVisible,
        ddlUnitType : controlInfo.ddlUnitType,
        ddlUnitTypeValue : controlInfo.ddlUnitTypeValue,
        ddlControlsPreference : controlInfo.ddlControlsPreference,
        ddlControlsPreferenceValue : controlInfo.ddlControlsPreferenceValue,
        ddlDamperAndActuator : controlInfo.ddlDamperAndActuator,
        ddlDamperAndActuatorValue : controlInfo.ddlDamperAndActuatorValue,
        ddlDamperAndActuatorVisible : controlInfo.ddlDamperAndActuatorVisible,
        ddlCoolingCoilHanding : controlInfo.ddlCoolingCoilHanding,
        ddlCoolingCoilHandingValue : controlInfo.ddlCoolingCoilHandingValue,
        ddlHeatingCoilHanding : controlInfo.ddlHeatingCoilHanding,
        ddlHeatingCoilHandingValue : controlInfo.ddlHeatingCoilHandingValue,
        ddlPreheatCoilHanding : controlInfo.ddlPreheatCoilHanding,
        ddlPreheatCoilHandingValue : controlInfo.ddlPreheatCoilHandingValue,
        ddlValveType : controlInfo.ddlValveType,
        ddlValveTypeValue : controlInfo.ddlValveTypeValue,
        ckbVoltageSPP : controlInfo.ckbVoltageSPP,
        divUnitBypassVisible : controlInfo.divUnitBypassVisible,
        divVoltageSPPVisible : controlInfo.divVoltageSPPVisible,
        ddlLocation : controlInfo.unitTypes.ddlLocation,
        ddlLocationValue : controlInfo.unitTypes.ddlLocationValue,
        ckbDownshot : controlInfo.unitTypes.ckbDownshot,
        ddlOA_FilterModel : controlInfo.unitTypes.ddlOA_FilterModel,
        ddlOA_FilterModelValue : controlInfo.unitTypes.ddlOA_FilterModelValue,
        ddlRA_FilterModel : controlInfo.unitTypes.ddlRA_FilterModel,
        ddlRA_FilterModelValue : controlInfo.unitTypes.ddlRA_FilterModelValue,
        ddlPreheatComp : controlInfo.unitTypes.ddlPreheatComp,
        ddlPreheatCompValue : controlInfo.unitTypes.ddlPreheatCompValue,
        ddlHeatExchComp : controlInfo.unitTypes.ddlHeatExchComp,
        ddlHeatExchCompValue : controlInfo.unitTypes.ddlHeatExchCompValue,
        ddlCoolingComp : controlInfo.unitTypes.ddlCoolingComp,
        ddlCoolingCompValue : controlInfo.unitTypes.ddlCoolingCompValue,
        ddlHeatingComp : controlInfo.unitTypes.ddlHeatingComp,
        ddlHeatingCompValue : controlInfo.unitTypes.ddlHeatingCompValue,
        ddlCoolingFluidType : controlInfo.unitTypes.ddlCoolingFluidType,
        ddlCoolingFluidTypeValue : controlInfo.unitTypes.ddlCoolingFluidTypeValue,
        ddlCoolingFluidConcentration : controlInfo.unitTypes.ddlCoolingFluidConcentration,
        ddlCoolingFluidConcentrationValue : controlInfo.unitTypes.ddlCoolingFluidConcentrationValue,
        ddlHeatingFluidType : controlInfo.unitTypes.ddlHeatingFluidType,
        ddlHeatingFluidTypeValue : controlInfo.unitTypes.ddlHeatingFluidTypeValue,
        ddlHeatingFluidConcentration : controlInfo.unitTypes.ddlHeatingFluidConcentration,
        ddlHeatingFluidConcentrationValue : controlInfo.unitTypes.ddlHeatingFluidConcentrationValue,
        divCoolingCompVisible : controlInfo.unitTypes.divCoolingCompVisible,
        divExhaustAirESPVisible : controlInfo.unitTypes.divExhaustAirESPVisible,
        divHeatingCompVisible : controlInfo.unitTypes.divHeatingCompVisible,
        divPreheatCompVisible : controlInfo.unitTypes.divPreheatCompVisible,
        divRA_FilterModelVisible : controlInfo.unitTypes.divRA_FilterModelVisible,
        divRA_FilterPDVisible : controlInfo.unitTypes.divRA_FilterPDVisible,
        divSummerReturnAirCFMVisible : controlInfo.unitTypes.divSummerReturnAirCFMVisible,
        reheat : controlInfo.unitTypes.componentOptions.reheat,
        cooling : controlInfo.unitTypes.componentOptions.cooling,
        drainPan : controlInfo.unitTypes.componentOptions.drainPan,
        customInputs : controlInfo.unitTypes.componentOptions.customInputs,
        reheatSetpoints : controlInfo.unitTypes.componentOptions.reheatSetpoints,
        refrigerantInfo : controlInfo.unitTypes.componentOptions.refrigerantInfo,
        dehumidification : controlInfo.unitTypes.componentOptions.dehumidification,
        valveAndActuator : controlInfo.unitTypes.componentOptions.valveAndActuator,
        divDXC_MsgVisible : controlInfo.unitTypes.componentOptions.divDXC_MsgVisible,
        heatElectricHeater : controlInfo.unitTypes.componentOptions.heatElectricHeater,
        preheatElectricHeater : controlInfo.unitTypes.componentOptions.preheatElectricHeater,
        electricHeaterVoltage : controlInfo.unitTypes.componentOptions.electricHeaterVoltage,
        divPreheatSetpointVisible : controlInfo.unitTypes.componentOptions.divPreheatSetpointVisible,
        divCoolingSetpointVisible : controlInfo.unitTypes.componentOptions.divCoolingSetpointVisible,
        divHeatingSetpointVisible : controlInfo.unitTypes.componentOptions.divHeatingSetpointVisible,
        divHeatingFluidDesignConditionsVisible : controlInfo.unitTypes.componentOptions.divHeatingFluidDesignConditionsVisible,
        ddlUnitVoltage : controlInfo.mainControlData.others.ddlUnitVoltage,
        ddlUnitVoltageValue : controlInfo.mainControlData.others.ddlUnitVoltageValue, 
        elecHeaterVoltage : controlInfo.mainControlData.others.elecHeaterVoltage, 
        ckbBypass : controlInfo.mainControlData.others.ckbBypass
      }
      state.unitInfo = unitInfo;
      state.isLoading = false;
    },
    ddlLocationChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlDamperAndActuatorValue: data.ddlDamperAndActuatorValue,
        ddlDamperAndActuatorVisible: data.divDamperAndActuatorVisible,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage : data.others.ddlUnitVoltage,
        ddlUnitVoltageValue : data.others.ddlUnitVoltageValue, 
        elecHeaterVoltage : data.others.elecHeaterVoltage, 
        ckbBypass : data.others.ckbBypass,
        ckbDownshot: data.downshot,
        electricHeaterVoltage:  data.electricHeaterVoltage,
        preheatElectricHeater: data.preheatElectricHeater
      }

      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: data.txbSupplyAirESP,
        txbExhaustAirESP: data.txbExhaustAirESP,
      }
    }
  },
});

export const { getUnitInfoByJobId } = UnitSlice.actions;

// Reducer
export default UnitSlice.reducer;

// ----------------------------------------------------------------------

export function getUnitTypeInfo() {
  return async () => {
    dispatch(UnitSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/units/getunittypeinfo`);
    dispatch(UnitSlice.actions.setJobInfo(response.data));
  };
}

export function getInitUnitinfo(data) {
  return async () => {
    dispatch(UnitSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/units/getunitinfo`, data);
    dispatch(UnitSlice.actions.setInitInfo(response.data));
  };
}

export function saveUnitInfo(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/Save`, data);
    return response;
  };
}

export function saveLayout(data){
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SaveLayout`, data);
    return response.data;
  };
}

export function ddlLocationChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/locationchanged`, data);
    dispatch(UnitSlice.actions.ddlLocationChanged(response.data));
  };
}

export function ddlOrientationChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/orientationchanged`, data);
    console.log(response.data);
  };
}

// ----------------------------------------------------------------------
