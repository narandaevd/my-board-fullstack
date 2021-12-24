import '@fontsource/roboto/400.css';
import { Button, Typography } from '@mui/material'
import styled from 'styled-components'
import Card from './Card'

const ListHeader = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
`

const ListContent = styled.div`
    background-color: gray;
    padding: 10px;
    border-radius: 0 0 5px 5px;
`

const StyledList = styled.div`
    width: 400px;
    margin: 10px;
    box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.41);
    border-radius: 5px 5px 5px 5px;
`

function List() {
    return (
        <StyledList>
            <ListHeader>
                <Typography fontSize='25px' ml='5px'>Name</Typography>
                <Button variant='outlined'>ADD</Button>
            </ListHeader>
            <ListContent>
                <Card />
                <Card />
                <Card />
            </ListContent>
        </StyledList>
    )
}

export default List
