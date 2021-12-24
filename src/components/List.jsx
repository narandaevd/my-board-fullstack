import '@fontsource/roboto/400.css';
import { Button, Typography } from '@mui/material'
import styled from 'styled-components'
import Card from './Card'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ListHeader = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
`

const ListContent = styled.div`
    padding: 10px;
    border-radius: 0 0 5px 5px;
`

const StyledList = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 400px;
    margin: 10px;
    box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.41);
    border-radius: 5px 5px 5px 5px;
    background-color: #F0F0EF;
`

function List(props) {
    return (
        <StyledList>
            <ListHeader>
                <Typography fontSize='25px' ml='5px'>{props.name}</Typography>
                <Button color='info'>
                    <MoreHorizIcon />
                </Button>
            </ListHeader>
            <ListContent>
                {
                    props.cards.map((card, index) => (
                        <Card {...card}/>
                    ))
                }
            </ListContent>
            <Button sx={{marginBottom: '5px', marginTop: '-10px'}}variant='text'>
                ADD
            </Button>
        </StyledList>
    )
}

export default List
