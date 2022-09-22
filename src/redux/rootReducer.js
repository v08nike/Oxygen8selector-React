import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import jobsReducer from './slices/jobsReducer';
import jobDashboardReducer from './slices/jobDashboardReducer';

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
});

export { rootPersistConfig, rootReducer };