import { buildsConstants } from '../_constants';

export function builds(state = {}, action, project) {
  switch (action.type) {
    case buildsConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case buildsConstants.GETALL_SUCCESS:
      return {
        selectedProject: action.builds ? (action.builds.length > 0 ? action.defaultProject && action.builds.some(x => x.ProjectName == action.defaultProject) ? 
        action.builds.find(x => x.ProjectName == action.defaultProject) : action.builds[0] : null) : null,
        selectedProjectBuilds: action && action.builds ? (action.defaultProject && action.builds.some(x => x.ProjectName == action.defaultProject) ? 
          action.builds.find(x => x.ProjectName == action.defaultProject).value.filter((y) => y.latestOutcome.result !== "")
            .sort(function(a,b){
            return new Date(b.latestOutcome.finishTime) - new Date(a.latestOutcome.finishTime)}) 
            : 
            action.builds[0] ? action.builds[0].value.filter((y) => y.latestOutcome.result !== "")
            .sort(function(a,b){
            return new Date(b.latestOutcome.finishTime) - new Date(a.latestOutcome.finishTime)}) : null
            ) : null,
        online: action.builds ? true : false
      }
    case buildsConstants.GETALL_BY_PROJECTNAME_FAILURE:
      return { 
        error: action.error,
        online: false
      };
      case buildsConstants.GETALL_BY_PROJECTNAME_REQUEST:
        return {
          ...state,
          loading: true,
          project: project
        };
      case buildsConstants.GETALL_BY_PROJECTNAME_SUCCESS:
        return {
          selectedProject: action.builds,
          selectedProjectBuilds: (action.builds ? action.builds.value.filter((y) => y.latestOutcome.result !== "")
            .sort(function(a,b){
            return new Date(b.latestOutcome.finishTime) - new Date(a.latestOutcome.finishTime)}) : null),
          online: true
        }
      case buildsConstants.GETALL_FAILURE:
        return { 
          error: action.error,
          online: false
        };
    default:
      return state
  }
}