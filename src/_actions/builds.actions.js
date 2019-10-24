import { buildsConstants } from '../_constants';
import { buildsService } from '../_services';
import appsettings from '../../appsettings.json'

export const buildsActions = {
    getAll,
    getAllCurrent,
    getAllByProjectName
};

function getAll() {
    var defaultProject = appsettings && appsettings.defaultProject ? appsettings.defaultProject : null;
    return dispatch => {
        dispatch(request());

        buildsService.getAll()
            .then(
                builds => dispatch(success(builds, defaultProject)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: buildsConstants.GETALL_REQUEST } }
    function success(builds, defaultProject) { return { type: buildsConstants.GETALL_SUCCESS, builds, defaultProject } }
    function failure(error) { return { type: buildsConstants.GETALL_FAILURE, error } }
}

function getAllByProjectName(name) {
    return dispatch => {
        dispatch(request());

        buildsService.getAllByProjectName(name)
            .then(
                builds => dispatch(success(builds)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: buildsConstants.GETALL_BY_PROJECTNAME_REQUEST } }
    function success(builds) { return { type: buildsConstants.GETALL_BY_PROJECTNAME_SUCCESS, builds } }
    function failure(error) { return { type: buildsConstants.GETALL_BY_PROJECTNAME_FAILURE, error } }
}

function getAllCurrent(project) {
    
    return dispatch => {
        dispatch(request());

        buildsService.getAllCurrent()
            .then(
                builds => dispatch(success(builds, project)),
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: buildsConstants.GETALL_CURRENT_REQUEST } }
    function success(builds, project) { return { type: buildsConstants.GETALL_CURRENT_SUCCESS, builds, project } }
    function failure(error) { return { type: buildsConstants.GETALL_CURRENT_FAILURE, error } }
}