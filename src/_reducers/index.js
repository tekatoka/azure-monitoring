import { combineReducers } from 'redux';

import { projects } from './projects.reducer';
import { builds } from './builds.reducer';
import { currentBuilds } from './currentBuilds.reducer';

const rootReducer = combineReducers({
  projects,
  builds,
  currentBuilds
});

export default rootReducer;