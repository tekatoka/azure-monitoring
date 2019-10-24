import config from 'config';
import { authHeader } from '../_helpers';

export const projectsService = {
    getAll
};

function getAll() {
    const API_URL = "https://vsjedoc201.jmce.intern:15002/projects";
    return fetch(API_URL, {
        method : "GET",
        mode: 'cors'
    }).then(response => {
        return response.json()
    }).catch(function (err) {
        console.log(err)
    });
}