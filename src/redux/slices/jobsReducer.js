import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';
// store
import { dispatch } from '../store';
// mock
import { _jobList, _unitList } from '../../_mock/_myJobs';
// paths
// import { PATH_JOBS, PATH_JOB, PATH_UNIT } from '../../routes/paths';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  jobList: [],
  jobInitInfo: {}
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
    // GET JOB DATA
    getJobInfo(state, action) {
      return state.jobList;
    },
    getJobInfoByID(state, action) {},
    addJob(state, action) {
      state.jobList.push(action.payload);
    },
    updateJob(state, action) {
      const { jobId, data } = action.payload;
      state.jobList[jobId] = data;
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

// export const getJobList = async (state) => {
//   const response = await axios.post((`${serverUrl}/api/auth/login`), {
//     userId: localStorage.getItem("userId"),
//     action: "all",
//   });

//   return response.data;
// }

export function getJobsInfo() {
  return async () => {
    dispatch(JobsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/jobs/get`);
    dispatch(JobsSlice.actions.setJobInfo(response.data));
  };
};

export function getJobsIntInfo() {
  return async () => {
    dispatch(JobsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/get`);
    dispatch(JobsSlice.actions.setJobInitInfo(response.data));
  };
};

export function addNewJob(data) {
  dispatch(JobsSlice.actions.addJob(data));
}

export function setJobInfo(data) {
  dispatch(JobsSlice.actions.setJobInfo(data));
}

export function updateJob(data) {
  dispatch(JobsSlice.actions.updateJob(data));
}

export function deleteJob(data) {
  dispatch(JobsSlice.actions.deleteJob(data));
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
