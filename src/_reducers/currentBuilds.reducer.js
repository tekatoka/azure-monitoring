import { buildsConstants } from '../_constants';

export function currentBuilds(state = {}, action) {
  switch (action.type) {
    case buildsConstants.GETALL_CURRENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case buildsConstants.GETALL_CURRENT_SUCCESS:
      return {
        "allCurrentBuilds": action.builds,
        "runningBuilds": action && action.builds && action.project && action.builds.find(y => y.ProjectName == action.project).count > 0 ? true 
        : action.builds && action.builds.some(x => x.count > 0) ? true : false,
        "selectedProjectCurrentBuilds": action && action.builds && action.project ? action.builds.find(y => y.ProjectName == action.project) : action.builds ? action.builds[0] : null,
        "loading": false,
      }

    case buildsConstants.GETALL_CURRENT_FAILURE:
      return { 
        error: action.error,
        "loading": false,
      };
    default:
      return state
  }
}