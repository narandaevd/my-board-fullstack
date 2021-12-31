import { startLoadAC, deleteCardAC, pushCardAC, deleteListAC, pushListAC, pushDashboardAC, deleteDashboardAC } from "../actions/dashboardActions";
import { START_LOAD, DELETE_CARD, PUSH_CARD, DELETE_LIST, PUSH_LIST, PUSH_DASHBOARD, DELETE_DASHBOARD } from '../actions/dashboardActions'
import API from './../../API';

const initialState = {};

function reducer(state = initialState, action) {
    const newState = {...JSON.parse(JSON.stringify(state))};
    switch (action.type) {
        case START_LOAD:
            return {
                ...JSON.parse(JSON.stringify(state)), 
                ...JSON.parse(JSON.stringify(action.data.body)),
            };
        case PUSH_DASHBOARD:
            newState.dashboards.push({...action.data, lists: []});
            fetch(
                API.dashboard.getPushUrl(action.id, newState.dashboards.length),
                API.dashboard.getPushOptions({...action.data, lists: []})
            )
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));                
            return {...JSON.parse(JSON.stringify(newState))};
        case DELETE_DASHBOARD:
            fetch(
                API.dashboard.getDeleteUrl(action.id, action.dashboardId),
                API.dashboard.getDeleteOptions(),
            )
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));
            newState.dashboards.splice(action.dashboardId, 1);
            return {...JSON.parse(JSON.stringify(newState))};
        case PUSH_LIST:
            fetch(
                API.list.getPushUrl(
                    action.id, 
                    action.dashboardId, 
                    newState.dashboards[action.dashboardId].lists.length
                ), 
                API.list.getPushOptions({...action.data, cards: []}),
            )
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));
            newState.dashboards[action.dashboardId].lists.push(action.data);
            return {...JSON.parse(JSON.stringify(newState))};
        case DELETE_LIST:
            fetch(
                API.list.getDeleteUrl(action.id, action.dashboardId, action.listId),
                API.list.getDeleteOptions()
            )
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));
            newState.dashboards[action.dashboardId].lists.splice(action.listId, 1);
            return {...JSON.parse(JSON.stringify(newState))};
        case PUSH_CARD:
            fetch(
                API.card.getPushUrl(
                    action.id, 
                    action.dashboardId, 
                    action.listId, 
                    newState.dashboards[action.dashboardId].lists[action.listId].cards.length, 
                ),
                API.card.getPushOptions(action.data)
            )
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));
            newState.dashboards[action.dashboardId].lists[action.listId].cards.push(action.data);
            return {...JSON.parse(JSON.stringify(newState))};
        case DELETE_CARD:
            fetch(
                API.card.getDeleteUrl(
                    action.id, 
                    action.dashboardId, 
                    action.listId, 
                    action.cardId
                ), 
                API.card.getDeleteOptions()
            )
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));
            newState.dashboards[action.dashboardId].lists[action.listId].cards.splice(action.cardId, 1);
            return {...JSON.parse(JSON.stringify(newState))};
        default:
            return state;
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onStartLoad: (id) => dispatch(startLoadAC(id)),
        onPushCard: (id, dashboardId, listId, data) => dispatch(pushCardAC(id, dashboardId, listId, data)),
        onDeleteCard: (id, dashboardId, listId, cardId) => dispatch(deleteCardAC(id, dashboardId, listId, cardId)),
        onDeleteList: (id, dashboardId, listId) => dispatch(deleteListAC(id, dashboardId, listId)),
        onPushList: (id, dashboardId, data) => dispatch(pushListAC(id, dashboardId, data)),
        onPushDashboard: (id, data) => dispatch(pushDashboardAC(id, data)),
        onDeleteDashboard: (id, dashboardId) => dispatch(deleteDashboardAC(id, dashboardId)),
    }
}

export default reducer;
export { mapStateToProps, mapDispatchToProps };