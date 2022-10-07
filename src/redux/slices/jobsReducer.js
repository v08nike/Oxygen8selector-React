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
  jobList: [],
  unitList: [],
  jobInitInfo: {},
};

const JobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setJobInfo(state, action) {
      state.isLoading = false;
      state.jobList = action.payload.jobList;
      state.jobInitInfo = action.payload.jobInitInfo;
    },
    setJobInitInfo(state, action) {
      state.isLoading = false;
      state.jobInitInfo = action.payload;
    },
    addNewJob(state, action) {
      state.jobList.push(action.payload);
    },
    setJobsAndUnitsInfo(state, action) {
      state.isLoading = false;
      state.jobList = action.payload.jobList;
      state.unitList = action.payload.unitList;
    },
    updateJob(state, action) {
      state.jobList = action.payload;
    },
    deleteJob(state, action) {
      const { jobData } = action.payload;
      state.jobList = jobData;
      state.unitList = state.unitList.filter((item) => jobData.find((element) => element.jobId === item.jobId));
    },
    updateUnit(state, action) {
      const { jobId, unitId, data } = action.payload;
      const selectedJobIdx = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      const selectedUnitIdx = state.unitList[selectedJobIdx].data.findIndex(
        (item) => item.unitId.toString() === unitId
      );
      state.unitList[selectedJobIdx].data[selectedUnitIdx] = data;
    },
    addUnitInfo(state, action) {
      const { jobId, data } = action.payload;
      const selectedId = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      state.unitList[selectedId].data.unshift(data);
    },
    deleteUnit(state, action) {
      const { jobId, data } = action.payload;
      const selectedId = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      state.unitList[selectedId].data = data;
    },
  },
});

export const { getUnitInfoByJobId } = JobsSlice.actions;

// Reducer
export default JobsSlice.reducer;

// ----------------------------------------------------------------------

export function getJobsInfo() {
  return async () => {
    dispatch(JobsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/jobs/get`);
    console.log(response.data);
    dispatch(JobsSlice.actions.setJobInfo(response.data));
  };
};

export function getJobsInitInfo() {
  return async () => {
    dispatch(JobsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/get`);
    dispatch(JobsSlice.actions.setJobInitInfo(response.data));
  };
};

export function addNewJob(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/add`, data);
    dispatch(JobsSlice.actions.addNewJob(response.data[0]));
    return response.data[0].id;
  };
}

export function updateJob(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/update`, data);
    dispatch(JobsSlice.actions.updateJob(response.data));
  };
}

export function deleteJob(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/delete`, data);
    dispatch(JobsSlice.actions.updateJob(response.data));
  };
}

export function getJobsAndUnitsInfo(data) {
  return async () => {
    dispatch(JobsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/getwithunit`, data);
    dispatch(JobsSlice.actions.setJobsAndUnitsInfo(response.data));
  };
}

export function addNewUnit(data) {
  dispatch(JobsSlice.actions.addUnitInfo(data));
}

export function updateUnit(data) {
  dispatch(JobsSlice.actions.updateUnit(data));
}

export function deleteUnit(data) {
  dispatch(JobsSlice.actions.deleteUnit(data));
}
// ----------------------------------------------------------------------
