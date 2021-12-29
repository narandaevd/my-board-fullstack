import { useContext } from 'react'
import List from './List'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/rootReducer'
import _ from 'lodash'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material'
import styled from 'styled-components'
import UserContext from '../contexts/UserContext'

const ProgressWrap = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 200px;
`

function Dashboard(props) {

    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId] = useContext(UserContext);

    return (
        <div>
            {
                (loggedIn) ? (
                    (_.isEmpty(props.userData)) ? (
                        <ProgressWrap>
                            <CircularProgress size={150}/>
                        </ProgressWrap>
                        ) : (
                            props.userData.dashboards[currentDashboardId].lists.map((list, index) => (
                                <List list={list} listIndex={index} key={index}/>
                            ))
                        )
                ) : (
                    <Box sx={{textAlign: 'center'}}><h1>empty</h1></Box>
                )
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
