import React from 'react'
import List from './List'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/rootReducer'
import _ from 'lodash'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material'
import styled from 'styled-components'

const ProgressWrap = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 200px;
`

function Dashboard(props) {
    return (
        <div>
            {
                (_.isEmpty(props.userData)) ? (
                    <ProgressWrap>
                        <CircularProgress size={150}/>
                    </ProgressWrap>
                )
                    :
                (
                    props.userData.dashboards[props.userData.dashboardId].lists.map((list, index) => (
                        <List list={list} listIndex={index} key={index}/>
                    ))
                )
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
