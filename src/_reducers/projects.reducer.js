import { projectsConstants } from '../_constants';

export function projects(state = {}, action) {
  switch (action.type) {
    case projectsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case projectsConstants.GETALL_SUCCESS:
      return action && action.projects ? action.projects : null;
    case projectsConstants.GETALL_FAILURE:
      return { 
        error: action.error,
        online: false
      };

    default:
      return state
  }
}