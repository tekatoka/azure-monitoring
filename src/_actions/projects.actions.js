import { projectsConstants } from '../_constants';
import { projectsService } from '../_services';

export const projectsActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        projectsService.getAll()
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: projectsConstants.GETALL_REQUEST } }
    function success(projects) { return { type: projectsConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: projectsConstants.GETALL_FAILURE, error } }
}