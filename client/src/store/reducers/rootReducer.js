import { combineReducers } from 'redux';

import dashboardReducer from './dashboardReducer'
import { mapStateToProps as mapDashboardStateToProps, mapDispatchToProps as mapDashboardDispatchToProps } from './dashboardReducer' 
const rootReducer = combineReducers({
    userData: dashboardReducer,
})

function mapStateToProps(state) {
    return {
        ...mapDashboardStateToProps(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...mapDashboardDispatchToProps(dispatch),
    }
}

export default rootReducer;
export { mapStateToProps, mapDispatchToProps };