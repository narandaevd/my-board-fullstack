const API = require('./../../API')

export const addAC = (card, listIndex) => ({
    type: 'ADD',
    listIndex,
    data: card,
})

export const pushCardAC = (dashboardId, listId, data) => ({
    type: 'PUSH_CARD',
    dashboardId, listId,
    data,
})

export const startLoadAC = (id) => (dispatch) => {
    fetch(API.getUserdataById(id))
        .then(response => response.json())
        .then(json => dispatch( {type: 'START_LOAD', data: json} ))   
}