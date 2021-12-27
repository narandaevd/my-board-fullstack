import { addAC, startLoadAC, changeDashboardAC } from "../actions/dashboardActions";
import _ from 'lodash';

const initialState = {}

function reducer(state = initialState, action) {
    const newState = {...JSON.parse(JSON.stringify(state))};
    switch (action.type) {
        case 'CHANGE_DASHBOARD':
            if (!_.isEmpty(newState))
                newState.dashboardId = action.id;
            return {...JSON.parse(JSON.stringify(newState))};
        case 'START_LOAD':
            return {
                ...JSON.parse(JSON.stringify(state)), 
                ...JSON.parse(JSON.stringify(action.data.body)),
                dashboardId: 0,
            };
        // case 'ADD':
        //     newState.lists[action.listIndex].cards.push(action.data);
        //     return {...JSON.parse(JSON.stringify(newState))};
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
        onStartLoad: () => dispatch(startLoadAC()),
        onChangeDashboard: (id) => dispatch(changeDashboardAC(id)),
    }
}

export default reducer;
export { mapStateToProps, mapDispatchToProps };