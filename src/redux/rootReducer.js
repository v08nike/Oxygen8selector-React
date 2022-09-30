import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import jobsReducer from './slices/jobsReducer';
import jobDashboardReducer from './slices/jobDashboardReducer';
import unitReducer from './slices/unitReducer';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  jobs: jobsReducer,
  jobDashboard: jobDashboardReducer,
  unit: unitReducer
});

export { rootPersistConfig, rootReducer };