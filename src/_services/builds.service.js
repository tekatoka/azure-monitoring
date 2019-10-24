import config from 'config';
import { authHeader } from '../_helpers';
// import * as https from 'https';
// import axios from 'axios';

export const buildsService = {
    getAll,
    getAllCurrent,
    getAllByProjectName
};

function getAll() {
    const API_URL = "https://vsjedoc201.jmce.intern:15002/buildstatus";
    // const agent = new https.Agent({  
    //     rejectUnauthorized: false
    //   });
    // return  axios.get(API_URL, { httpsAgent: agent });
    return fetch(API_URL, {
        method : "GET",
        mode: 'cors',
    }).then(response => {
        return response.json()
    }).catch(function (err) {
        console.log(err)
    });
}

function getAllByProjectName(name) {
    const API_URL = "https://vsjedoc201.jmce.intern:15002/buildstatus/" + name;
    return fetch(API_URL, {
        method : "GET",
        mode: 'cors'
    }).then(response => {
        return response.json()
    }).catch(function (err) {
        console.log(err)
    });
}

function getAllCurrent() {
    const API_URL = "https://vsjedoc201.jmce.intern:15002/currentbuilds";
    return fetch(API_URL, {
        method : "GET",
        mode: 'cors'
    }).then(response => {
        return response.json()
    }).catch(function (err) {
        console.log(err)
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}