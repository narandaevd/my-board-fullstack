import React from 'react'
import List from './List'
import styled from 'styled-components';

const StyledDashboard = styled.div`
    display: flex;
`

function Dashboard() {
    return (
        <StyledDashboard>
            <List />
            <List />
            <List />
            <List />
        </StyledDashboard>
    )
}

export default Dashboard
