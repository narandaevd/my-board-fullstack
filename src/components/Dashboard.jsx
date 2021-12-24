import React from 'react'
import List from './List'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/rootReducer'

function Dashboard(props) {
    console.log(props);
    return (
        <React.Fragment>
            {
                props.dashboard.lists.map((list, index) => (
                    <List {...list}/>
                ))
            }
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
