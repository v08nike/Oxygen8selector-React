import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';
// store
import { dispatch } from '../store';
// mock
import { _jobList, _unitList } from '../../_mock/_myJobs';
// paths
// import { PATH_JOBS, PATH_JOB, PATH_UNIT } from '../../routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  jobList: _jobList,
  unitList: _unitList,
};

const JobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // GET JOB DATA
    getJobInfo(state, action) {
      return state.jobList;
    },
    setJobInfo(state, action) {
      state.jobList = action.payload;
    },
    getJobInfoByID(state, action) {},
    addJob(state, action) {
      state.jobList.push(action.payload);
    },
    updateJob(state, action) {
      const { jobId, data } = action.payload;
      state.jobList[jobId] = data;
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
      const { jobId, data} = action.payload;
      const selectedId = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      state.unitList[selectedId].data = data;
    },
  },
});

export const { getUnitInfoByJobId } = JobsSlice.actions;

// Reducer
export default JobsSlice.reducer;

// ----------------------------------------------------------------------

export function getJobList(state) {
  return state.jobs.jobList;
}

export function addNewJob(data) {
  dispatch(JobsSlice.actions.addJob(data));
}

export function setJobInfo(data) {
  dispatch(JobsSlice.actions.setJobInfo(data));
}

export function updateJob(jobUpdated) {
  dispatch(JobsSlice.actions.updateJob(jobUpdated));
}

export function addNewUnit(data) {
  dispatch(JobsSlice.actions.addUnitInfo(data));
}

export function updateUnit(data) {
  dispatch(JobsSlice.actions.updateUnit(data));
}

export function deleteUnit(data){
  dispatch(JobsSlice.actions.deleteUnit(data));
}
// ----------------------------------------------------------------------
