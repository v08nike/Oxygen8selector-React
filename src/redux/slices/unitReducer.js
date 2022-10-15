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
  viewSelectionInfo: {}
};

const UnitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setJobInfo(state, actions) {
      state.productType = actions.payload.productType;
      state.unitType = actions.payload.unitType;
      state.productTypeUnitTypeLink = actions.payload.productTypeUnitTypeLink;
      state.isLoading = false;
    },
    setInitInfo(state, actions) {
      const { controlInfo, unitInfo, visibleInfo } = actions.payload;
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
        divSetpointsVisible: controlInfo.unitTypes.componentOptions.divSetpointsVisible,
        divHeatingFluidDesignConditionsVisible:
          controlInfo.unitTypes.componentOptions.divHeatingFluidDesignConditionsVisible,
        ddlUnitVoltage: controlInfo.mainControlData.others.ddlUnitVoltage,
        ddlUnitVoltageValue: controlInfo.mainControlData.others.ddlUnitVoltageValue,
        elecHeaterVoltage: controlInfo.mainControlData.others.elecHeaterVoltage,
        ckbBypass: controlInfo.mainControlData.others.ckbBypass,
        btnNextVisible: visibleInfo.btnNextVisible,
        btnOutputVisible: visibleInfo.btnOutputVisible,
        btnQuoteVisible: visibleInfo.btnQuoteVisible,
        btnSubmittalsVisible: visibleInfo.btnSubmittalsVisible,
        btnViewModelOptionVisible: visibleInfo.btnViewModelOptionVisible,
        divNotesVisible: visibleInfo.divNotesVisible,
        divUnitOpeningsMsgVisible: visibleInfo.divUnitOpeningsMsgVisible,
        div_hx_fp_hiddenVisible: visibleInfo.div_hx_fp_hiddenVisible,
      };
      state.unitInfo = unitInfo;
      state.isLoading = false;
    },
    ddlLocationChanged(state, actions) {
      const data = actions.payload;
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
    ddlOrientationChanged(state, actions) {
      const data = actions.payload;
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
    txbSummerSupplyAirCFMChanged(state, actions) {
      const data = actions.payload;
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
    txbSummerReturnAirCFMChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirCFM: actions.payload,
      };
    },
    txbSupplyAirESPChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: actions.payload,
      };
    },
    txbExhaustAirESPChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbExhaustAirESP: actions.payload,
      };
    },
    ddlUnitModelChanged(state, actions) {
      const data = actions.payload;
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
    ddlPreheatCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        customInputs: data.customInputs,
        divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        preheatElectricHeater: data.preheatElectricHeater,
        elecHeaterVoltage: data.preheatElectricHeater.electricHeaterVoltageInfo,
        lblPreheatWarningText: data.preheatInfomation.lblPreheatWarningText,
        lblPreheatWarningVisible: data.preheatInfomation.lblPreheatWarningVisible,
        valveAndActuator: data.valveAndActuator,
        divPreheatSetpointVisible: data.isAUHID? data.divPreheatSetpointVisible: false,
        divSetpointsVisible: data.isAUHID? data.divSetpointsVisible: false,
      }
    },
    ddlCoolingCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        reheat: data.reheat,
        cooling: data.cooling,
        dehumidification: data.dehumidification,
        valveAndActuator: data.valveAndActuator,
        heatElectricHeater: data.heatElectricHeater,
        divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        refrigerantInfo: data.refrigerantInfo,
        divCoolingSetpointVisible: data.divCoolingSetpointVisible,
        divHeatingSetpointVisible: data.divHeatingSetpointVisible,
        reheatSetpoints: data.reheatSetpoints,
        divSetpointsVisible: data.divSetpointsVisible,
        customInputs: data.customInputs,
      }
    },
    ddlHeatingCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        heatElectricHeater: data.heatElectricHeater,
        divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        valveAndActuator: data.valveAndActuator,
        divHeatingSetpointVisible: data.divHeatingSetpointVisible,
        divSetpointsVisible: data.divSetpointsVisible,
        customInputs: data.customInputs,
      }
    },
    ddlUnitVoltageChanged(state, actions) {
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltage: actions.payload,
      };
    },
    txbSummerOutdoorAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerOutdoorAirRH: actions.payload
      }
    },
    txbSummerOutdoorAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerOutdoorAirWB: actions.payload
      }
    },
    txbWinterOutdoorAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterOutdoorAirRH: actions.payload,
      }
    },
    txbWinterOutdoorAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterOutdoorAirWB: actions.payload,
      }
    },
    txbSummerReturnAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirRH: actions.payload
      }
    },
    txbSummerReturnAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirWB: actions.payload
      }
    },
    txbWinterReturnAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterReturnAirRH: actions.payload
      }
    },
    txbWinterReturnAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterReturnAirWB: actions.payload
      }
    },
    getViewSelectionInfo(state, actions) {
      state.isLoading = false;
      const data = actions.payload;
      state.viewSelectionInfo = {
        pricingDetail: data.outputPricing.gvPricingDataSource,
        performanceVisible: data.outputPricing.divPricingVisible,
        unitDetails: data.outputUnitDetails.gvOutUnitDetails_1DataSource.concat(data.outputUnitDetails.gvOutUnitDetails_2DataSource),
        unitDetailsVisible: data.outputUnitDetails.divOutUnitDetailsVisible,
        electricalRequirements: {
          unitData: data.outputElecReq.gvOutElecReqUnitDataDataSource,
          unitDataVisible: data.outputElecReq.divOutElecReqUnitDataVisible,
          preheatData: data.outputElecReq.gvOutElecReqPreheatElecHeaterDataSource,
          preheatDataVisible: data.outputElecReq.divOutElecReqPreheatElecHeaterVisible,
          heatingData: data.outputElecReq.gvOutElecReqHeatingElecHeaterDataSource,
          heatingDataVisible: data.outputElecReq.divOutElecReqHeatingElecHeaterVisible,
        },
        electricPreheat: data.outputPreheatElecHeater.gvOutPreheatElecHeaterDataSource,
        electricPreheatVisible: data.outputPreheatElecHeater.divOutPreheatElecHeaterVisible,
        heatExchanger: {
          designConditions: data.outputFixedPlateCORE.gvOutHX_FP_EntAirDataSource,
          designConditionsVisible: data.outputFixedPlateCORE.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data.outputFixedPlateCORE.gvOutHX_FP_LvgAirDataSource,
          performanceLeavingAirVisible: data.outputFixedPlateCORE.gvOutHX_FP_LvgAirVisible,
          performance: data.outputFixedPlateCORE.gvOutHX_FP_PerfDataSource,
          performanceVisible: data.outputFixedPlateCORE.gvOutHX_FP_PerfVisible,
        },
        heatingElectricHeater: data.outputHeatingElecHeater.gvOutHeatingElecHeaterDataDataSource,
        heatingElectricHeaterVisible: data.outputHeatingElecHeater.divOutHeatingElecHeaterVisible,
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
    console.log(response.data);
    dispatch(UnitSlice.actions.setInitInfo(response.data));
  };
}

export function saveUnitInfo(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/Save`, data);
    dispatch(UnitSlice.actions.setInitInfo(response.data.unitData));
    return response.data.intUnitNo;
  };
}

export function saveLayout(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SaveLayout`, data);
    return response.data;
  };
}

export function ddlLocationChanged(data) {
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
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerSupplyAirCFMChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerSupplyAirCFMChanged(response.data));
    return response.data;
  };
}

export function txbSummerReturnAirCFMChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirCFMChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerReturnAirCFMChanged(response.data));
    return response.data;
  };
}

export function txbSupplyAirESPChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SupplyAirESPChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSupplyAirESPChanged(response.data));
    return response.data;
  };
}

export function txbExhaustAirESPChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ExhaustAirESPChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSupplyAirESPChanged(response.data));
    return response.data;
  };
}

export function ddlUnitModelChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/UnitModelChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlUnitModelChanged(response.data));
    return response.data;
  };
}

export function ddlUnitVoltageChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/UnitVoltageChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlUnitVoltageChanged(response.data));
    return response.data;
  }
}

export function txbSummerOutdoorAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerOutdoorAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerOutdoorAirWBChanged(response.data));
    return response.data;
  }
}


export function txbSummerOutdoorAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api//units/SummerOutdoorAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerOutdoorAirRHChanged(response.data));
    return response.data;
  }
}

export function txbWinterOutdoorAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api//units/WinterOutdoorAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterOutdoorAirWBChanged(response.data));
    return response.data;
  }
}

export function txbWinterOutdoorAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterOutdoorAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterOutdoorAirRHChanged(response.data));
    return response.data;
  }
}

export function txbSummerReturnAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerReturnAirWBChanged(response.data));
    return response.data;
  }
}

export function txbSummerReturnAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirRHChanged`, data);
    console.log(response.data);
    console.log(UnitSlice.actions);
    dispatch(UnitSlice.actions.txbSummerReturnAirRHChanged(response.data));
    return response.data;
  }
}

export function txbWinterReturnAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterReturnAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterReturnAirWBChanged(response.data));
    return response.data;
  }
}

export function txbWinterReturnAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterReturnAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterReturnAirRHChanged(response.data));
    return response.data;
  }
}

export function ddlPreheatCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlPreheatCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlPreheatCompChanged(response.data));
    return response.data;
  }
}

export function ddlCoolingCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlCoolingCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlCoolingCompChanged(response.data));
    return response.data;
  }
}

export function ddlHeatingCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlHeatingCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlHeatingCompChanged(response.data));
    return response.data;
  }
}

export function getViewSelectionInfo(data) {
  console.log(data);
  return async () => {    
    dispatch(UnitSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/units/ViewSelection`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.getViewSelectionInfo(response.data));
    return response.data;
  }
}
// ----------------------------------------------------------------------
