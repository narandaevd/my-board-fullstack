export const addAC = (card, listIndex) => ({
    type: 'ADD',
    listIndex,
    data: card,
})

export const changeDashboardAC = (id) => ({
    type: 'CHANGE_DASHBOARD',
    id,
})

export const startLoadAC = () => (dispatch) => fetch('http://127.0.0.1:5000/api/user/0/data')
    .then(response => response.json())
    .then(json => dispatch( {type: 'START_LOAD', data: json} ))