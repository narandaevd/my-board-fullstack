import { addAC, startLoadAC, pushCardAC } from "../actions/dashboardActions";
import _ from 'lodash';

const initialState = {}

function reducer(state = initialState, action) {
    const newState = {...JSON.parse(JSON.stringify(state))};
    console.log(action);
    switch (action.type) {
        case 'CHANGE_DASHBOARD':
            if (!_.isEmpty(newState))
                newState.dashboardId = action.id;
            return {...JSON.parse(JSON.stringify(newState))};
        case 'START_LOAD':
            return {
                ...JSON.parse(JSON.stringify(state)), 
                ...JSON.parse(JSON.stringify(action.data.body)),
            };
        case 'PUSH_CARD':
            newState.dashboards[action.dashboardId].lists[action.listId].cards.push(action.data);
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
        onAdd: (card, listIndex) => dispatch(addAC(card, listIndex)),
        onStartLoad: (id) => dispatch(startLoadAC(id)),
        onPushCard: (dashboardId, listId, data) => dispatch(pushCardAC(dashboardId, listId, data)),
    }
}

export default reducer;
export { mapStateToProps, mapDispatchToProps };