import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
// mock
import { _jobList, _unitList } from '../../_mock/_myJobs';

// ----------------------------------------------------------------------

const initialState = {
  jobList: _jobList,
  unitList: _unitList,
};

const myJobsslice = createSlice({
  name: 'myJobs',
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
    updateJob(state, action) {},
    getUnitInfoByJobId(state, actiond) {},
    updateUnitInfo(state, action) {},
    addUnitInfo(state, action) {},
  },
});

// Reducer
export default myJobsslice.reducer;

// ----------------------------------------------------------------------

export function getJobList(state) {
  return state.myJobs.jobList;
}


export function addNewJob(data) {
  dispatch(myJobsslice.actions.addJob(data));
}

export function setJobInfo(data) {
  dispatch(myJobsslice.actions.setJobInfo(data));
}

export function getUnitList(state) {
  return state.myJobs.unitList;
}
// ----------------------------------------------------------------------
