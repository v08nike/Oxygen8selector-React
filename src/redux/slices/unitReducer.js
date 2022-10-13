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
      const { controlInfo, unitInfo, visibleInfo } = action.payload;
      state.controlInfo = {
        ddlOrientation: controlInfo.mainControlData.ddlOrientation,
        ddlOrientationValue: controlInfo.mainControlData.ddlOrientationValue,
        ddlUnitModel: controlInfo.mainControlData.ddlUnitModel,
        ddlUnitModelValue: controlInfo.mainControlData.ddlUnitModelValue,
        divCustomVisible: visibleInfo.divCustomVisible,
        divHeatExchCompVisible: visibleInfo.divHeatExchCompVisible,
        divOutdoorAirDesignConditionsVisible: visibleInfo.divOutdoorAirDesignConditionsVisible,
        divReturnAirDesignConditionsVisible: visibleInfo.divReturnAirDesignConditionsVisible,
        divSetpoint_1Visible: visibleInfo.divSetpoint_1Visible,
        divSubmittalItemsVisible: visibleInfo.divSubmittalItemsVisible,
        ddlUnitType: controlInfo.ddlUnitType,
        ddlUnitTypeValue: controlInfo.ddlUnitTypeValue,
        ddlControlsPreference: controlInfo.ddlControlsPreference,
        ddlControlsPreferenceValue: controlInfo.ddlControlsPreferenceValue,
        ddlDamperAndActuator: controlInfo.ddlDamperAndActuator,
        ddlDamperAndActuatorValue: controlInfo.ddlDamperAndActuatorValue,
        ddlDamperAndActuatorVisible: controlInfo.ddlDamperAndActuatorVisible,
        ddlCoolingCoilHanding: controlInfo.ddlCoolingCoilHanding,
        ddlCoolingCoilHandingValue: controlInfo.ddlCoolingCoilHandingValue,
        ddlHeatingCoilHanding: controlInfo.ddlHeatingCoilHanding,
        ddlHeatingCoilHandingValue: controlInfo.ddlHeatingCoilHandingValue,
        ddlPreheatCoilHanding: controlInfo.ddlPreheatCoilHanding,
        ddlPreheatCoilHandingValue: controlInfo.ddlPreheatCoilHandingValue,
        ddlValveType: controlInfo.ddlValveType,
        ddlValveTypeValue: controlInfo.ddlValveTypeValue,
        ckbVoltageSPP: controlInfo.ckbVoltageSPP,
        divUnitBypassVisible: controlInfo.divUnitBypassVisible,
        divVoltageSPPVisible: controlInfo.divVoltageSPPVisible,
        ddlLocation: controlInfo.unitTypes.ddlLocation,
        ddlLocationValue: controlInfo.unitTypes.ddlLocationValue,
        ckbDownshot: controlInfo.unitTypes.ckbDownshot,
        ddlOA_FilterModel: controlInfo.unitTypes.ddlOA_FilterModel,
        ddlOA_FilterModelValue: controlInfo.unitTypes.ddlOA_FilterModelValue,
        ddlRA_FilterModel: controlInfo.unitTypes.ddlRA_FilterModel,
        ddlRA_FilterModelValue: controlInfo.unitTypes.ddlRA_FilterModelValue,
        ddlPreheatComp: controlInfo.unitTypes.ddlPreheatComp,
        ddlPreheatCompValue: controlInfo.unitTypes.ddlPreheatCompValue,
        ddlHeatExchComp: controlInfo.unitTypes.ddlHeatExchComp,
        ddlHeatExchCompValue: controlInfo.unitTypes.ddlHeatExchCompValue,
        ddlCoolingComp: controlInfo.unitTypes.ddlCoolingComp,
        ddlCoolingCompValue: controlInfo.unitTypes.ddlCoolingCompValue,
        ddlHeatingComp: controlInfo.unitTypes.ddlHeatingComp,
        ddlHeatingCompValue: controlInfo.unitTypes.ddlHeatingCompValue,
        ddlCoolingFluidType: controlInfo.unitTypes.ddlCoolingFluidType,
        ddlCoolingFluidTypeValue: controlInfo.unitTypes.ddlCoolingFluidTypeValue,
        ddlCoolingFluidConcentration: controlInfo.unitTypes.ddlCoolingFluidConcentration,
        ddlCoolingFluidConcentrationValue: controlInfo.unitTypes.ddlCoolingFluidConcentrationValue,
        ddlHeatingFluidType: controlInfo.unitTypes.ddlHeatingFluidType,
        ddlHeatingFluidTypeValue: controlInfo.unitTypes.ddlHeatingFluidTypeValue,
        ddlHeatingFluidConcentration: controlInfo.unitTypes.ddlHeatingFluidConcentration,
        ddlHeatingFluidConcentrationValue: controlInfo.unitTypes.ddlHeatingFluidConcentrationValue,
        divCoolingCompVisible: controlInfo.unitTypes.divCoolingCompVisible,
        divExhaustAirESPVisible: controlInfo.unitTypes.divExhaustAirESPVisible,
        divHeatingCompVisible: controlInfo.unitTypes.divHeatingCompVisible,
        divPreheatCompVisible: controlInfo.unitTypes.divPreheatCompVisible,
        divRA_FilterModelVisible: controlInfo.unitTypes.divRA_FilterModelVisible,
        divRA_FilterPDVisible: controlInfo.unitTypes.divRA_FilterPDVisible,
        divSummerReturnAirCFMVisible: controlInfo.unitTypes.divSummerReturnAirCFMVisible,
        reheat: controlInfo.unitTypes.componentOptions.reheat,
        cooling: controlInfo.unitTypes.componentOptions.cooling,
        drainPan: controlInfo.unitTypes.componentOptions.drainPan,
        customInputs: controlInfo.unitTypes.componentOptions.customInputs,
        reheatSetpoints: controlInfo.unitTypes.componentOptions.reheatSetpoints,
        refrigerantInfo: controlInfo.unitTypes.componentOptions.refrigerantInfo,
        dehumidification: controlInfo.unitTypes.componentOptions.dehumidification,
        valveAndActuator: controlInfo.unitTypes.componentOptions.valveAndActuator,
        divDXC_MsgVisible: controlInfo.unitTypes.componentOptions.divDXC_MsgVisible,
        heatElectricHeater: controlInfo.unitTypes.componentOptions.heatElectricHeater,
        preheatElectricHeater: controlInfo.unitTypes.componentOptions.preheatElectricHeater,
        electricHeaterVoltage: controlInfo.unitTypes.componentOptions.electricHeaterVoltage,
        divPreheatSetpointVisible: controlInfo.unitTypes.componentOptions.divPreheatSetpointVisible,
        divCoolingSetpointVisible: controlInfo.unitTypes.componentOptions.divCoolingSetpointVisible,
        divHeatingSetpointVisible: controlInfo.unitTypes.componentOptions.divHeatingSetpointVisible,
        divHeatingFluidDesignConditionsVisible:
          controlInfo.unitTypes.componentOptions.divHeatingFluidDesignConditionsVisible,
        ddlUnitVoltage: controlInfo.mainControlData.others.ddlUnitVoltage,
        ddlUnitVoltageValue: controlInfo.mainControlData.others.ddlUnitVoltageValue,
        elecHeaterVoltage: controlInfo.mainControlData.others.elecHeaterVoltage,
        ckbBypass: controlInfo.mainControlData.others.ckbBypass,
      };
      state.unitInfo = unitInfo;
      state.isLoading = false;
    },
    ddlLocationChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlOrientation: data.ddlOrientation,
        ddlOrientationValue: data.ddlOrientationValue,
        ddlDamperAndActuatorValue: data.ddlDamperAndActuatorValue,
        ddlDamperAndActuatorVisible: data.divDamperAndActuatorVisible,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage: data.others.ddlUnitVoltage,
        ddlUnitVoltageValue: data.others.ddlUnitVoltageValue,
        elecHeaterVoltage: data.others.elecHeaterVoltage,
        ckbBypass: data.others.ckbBypass.ckbBypassChecked,
        ckbDownshot: data.downshot,
        electricHeaterVoltage: data.electricHeaterVoltage,
        preheatElectricHeater: data.preheatElectricHeater,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: data.txbSupplyAirESP,
        txbExhaustAirESP: data.txbExhaustAirESP,
      };
    },
    ddlOrientationChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage: data.others.ddlUnitVoltage,
        ddlUnitVoltageValue: data.others.ddlUnitVoltageValue,
        elecHeaterVoltage: data.others.elecHeaterVoltage,
        ckbBypass: data.others.ckbBypass.ckbBypassChecked,
        ddlSupplyAirOpening: data.ddlSupplyAirOpening,
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlSupplyAirOpeningValue: data.ddlSupplyAirOpeningValue,
        ddlSupplyAirOpeningText: data.ddlSupplyAirOpeningText,
      };
    },
    txbSummerSupplyAirCFMChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlOrientation: data.ddlOrientation,
        ddlOrientationValue: data.ddlOrientationValue,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage: data.others.ddlUnitVoltage,
        ddlUnitVoltageValue: data.others.ddlUnitVoltageValue,
        ddlSupplyAirOpening: data.ddlSupplyAirOpening,
        elecHeaterVoltage: data.others.elecHeaterVoltage,
        ckbBypass: data.others.ckbBypass,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSummerSupplyAirCFM: data.txbSummerSupplyAirCFM,
        txbSummerReturnAirCFM: data.txbSummerReturnAirCFM,
        ddlSupplyAirOpeningValue: data.ddlSupplyAirOpeningValue,
        ddlSupplyAirOpeningText: data.ddlSupplyAirOpeningText,
      };
    },
    txbSummerReturnAirCFMChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirCFM: action.payload,
      };
    },
    txbSupplyAirESPChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: action.payload,
      };
    },
    txbExhaustAirESPChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbExhaustAirESP: action.payload,
      };
    },
    ddlUnitModelChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlUnitVoltage: data.ddlUnitVoltage,
        ddlUnitVoltageValue: data.ddlUnitVoltageValue,
        elecHeaterVoltage: data.elecHeaterVoltage,
        ckbBypass: data.ckbBypass,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: data.txbSupplyAirESP,
      };
    },
    ddlPreheatCompChanged(state, action) {
      const data = action.payload;


    },
    ddlUnitVoltageChanged(state, action) {
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltage: action.payload,
      };
    },
    txbSummerOutdoorAirWBChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerOutdoorAirRH: action.payload
      }
    },
    txbSummerOutdoorAirRHChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerOutdoorAirWB: action.payload
      }
    },
    txbWinterOutdoorAirWBChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterOutdoorAirRH: action.payload,
      }
    },
    txbWinterOutdoorAirRHChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterOutdoorAirWB: action.payload,
      }
    },
    txbSummerReturnAirWBChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirRH: action.payload
      }
    },
    txbSummerReturnAirRHChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirWB: action.payload
      }
    },
    txbWinterReturnAirWBChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterReturnAirRH: action.payload
      }
    },
    txbWinterReturnAirRHChanged(state, action) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterReturnAirWB: action.payload
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
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/Save`, data);
    dispatch(UnitSlice.actions.setInitInfo(response.data));
    return true;
  };
}

export function saveLayout(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SaveLayout`, data);
    return response.data;
  };
}

export function ddlLocationChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/locationchanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlLocationChanged(response.data));
    return response.data;
  };
}

export function ddlOrientationChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/orientationchanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlOrientationChanged(response.data));
    return response.data;
  };
}

export function txbSummerSupplyAirCFMChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerSupplyAirCFMChanged`, data);
    dispatch(UnitSlice.actions.txbSummerSupplyAirCFMChanged(response.data));
    return response.data;
  };
}

export function txbSummerReturnAirCFMChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirCFMChanged`, data);
    dispatch(UnitSlice.actions.txbSummerReturnAirCFMChanged(response.data));
    return response.data;
  };
}

export function txbSupplyAirESPChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SupplyAirESPChanged`, data);
    dispatch(UnitSlice.actions.txbSupplyAirESPChanged(response.data));
    return response.data;
  };
}

export function txbExhaustAirESPChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ExhaustAirESPChanged`, data);
    dispatch(UnitSlice.actions.txbSupplyAirESPChanged(response.data));
    return response.data;
  };
}

export function ddlUnitModelChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/UnitModelChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlUnitModelChanged(response.data));
    return response.data;
  };
}

export function ddlUnitVoltageChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/UnitVoltageChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlUnitVoltageChanged(response.data));
    return response.data;
  }
}

export function txbSummerOutdoorAirWBChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerOutdoorAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerOutdoorAirWBChanged(response.data));
    return response.data;
  }
}


export function txbSummerOutdoorAirRHChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api//units/SummerOutdoorAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerOutdoorAirRHChanged(response.data));
    return response.data;
  }
}

export function txbWinterOutdoorAirWBChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api//units/WinterOutdoorAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterOutdoorAirWBChanged(response.data));
    return response.data;
  }
}

export function txbWinterOutdoorAirRHChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterOutdoorAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterOutdoorAirRHChanged(response.data));
    return response.data;
  }
}

export function txbSummerReturnAirWBChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ummerReturnAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.action.txbSummerReturnAirWBChanged(response.data));
    return response.data;
  }
}

export function txbSummerReturnAirRHChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.action.txbSummerReturnAirRHChanged(response.data));
    return response.data;
  }
}

export function txbWinterReturnAirWBChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterReturnAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.action.txbWinterReturnAirWBChanged(response.data));
    return response.data;
  }
}

export function txbWinterReturnAirRHChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterReturnAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.action.txbWinterReturnAirRHChanged(response.data));
    return response.data;
  }
}

export function ddlPreheatCompChanged(data) {
  console.log(data);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlPreheatCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.action.ddlPreheatCompChanged(response.data));
    return response.data;
  }
}
// ----------------------------------------------------------------------
