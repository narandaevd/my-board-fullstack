import React from 'react'
import List from './List'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/rootReducer'

function Dashboard(props) {
    return (
        <div>
            {
                props.dashboard.lists.map((list, index) => (
                    <List list={list} listIndex={index}/>
                ))
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
