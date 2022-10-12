import { createSlice } from '@reduxjs/toolkit';
// store
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  jobInfo: {},
  unitList: [],
};

const JobDashboardSlice = createSlice({
  name: 'jobDashboard',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setJobAndUnitInfo(state, action) {
      state.isLoading = false;
      state.jobInfo = action.payload.jobInfo[0];
      state.unitList = action.payload.unitList;
    },
    setUnitInfo(state, action){
      state.unitList = action.payload;
    }
  },
});

export const { setJobAndUnitInfo } = JobDashboardSlice.actions;

// Reducer
export default JobDashboardSlice.reducer;

// ----------------------------------------------------------------------

export function getJobsAndUnitsInfo(data) {
  return async () => {
    dispatch(JobDashboardSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/getwithunit`, data);
    dispatch(setJobAndUnitInfo(response.data));
  };
}

export const deleteUnits = async (data) => {
  const response = await axios.post(`${serverUrl}/api/units/Delete`, data);
  dispatch(JobDashboardSlice.actions.setUnitInfo(response.data));
  return response.data;
}

// ----------------------------------------------------------------------
