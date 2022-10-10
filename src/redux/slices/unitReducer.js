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
      console.log(action.payload);
      state.controlInfo = action.payload.controlInfo;
      state.unitInfo = action.payload.unitInfo;
      state.visibleInfo = action.payload.visibleInfo;
      state.isLoading = false;
    },
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
    console.log(response);
  };
}
// ----------------------------------------------------------------------
