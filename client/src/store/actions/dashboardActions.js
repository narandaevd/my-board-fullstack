const API = require('./../../API');

export const START_LOAD = 'START_LOAD';

export const DELETE_DASHBOARD = 'DELETE_DASHBOARD';
export const PUSH_DASHBOARD = 'PUSH_DASHBOARD';

export const DELETE_LIST = 'DELETE_LIST';
export const PUSH_LIST = 'PUSH_LIST';

export const DELETE_CARD = 'DELETE_CARD';
export const PUSH_CARD = 'PUSH_CARD';

export const deleteDashboardAC = (id, dashboardId) => ({
    type: DELETE_DASHBOARD,
    id, dashboardId,
})

export const pushDashboardAC = (id, data) => ({
    type: PUSH_DASHBOARD,
    id, data,
})

export const deleteListAC = (id, dashboardId, listId) => ({
    type: DELETE_LIST,
    dashboardId, listId, id,
});
export const pushListAC = (id, dashboardId, data) => ({
    type: PUSH_LIST,
    dashboardId, data, id,
});

export const deleteCardAC = (id, dashboardId, listId, cardId) => ({
    type: DELETE_CARD,
    dashboardId, listId, cardId, id,
});
export const pushCardAC = (id, dashboardId, listId, data) => ({
    type: PUSH_CARD,
    dashboardId, listId, data, id,
});

export const startLoadAC = (id) => (dispatch) => {
    fetch(API.user.getUserDataById(id))
        .then(response => response.json())
        .then(json => dispatch( {type: START_LOAD, data: json} ))   
};