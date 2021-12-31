import '@fontsource/roboto/300.css';
import styled from 'styled-components';
import { Typography, Avatar, Button, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import UserContext from '../contexts/UserContext';
import {useContext} from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/rootReducer';
import API from '../API'

const StyledCard = styled.div`
    background-color: white;
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 5px;
`

const Header = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
`

const Content = styled.div`
    margin-bottom: 10px;
`

const Assignee = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
`

const ButtonWrap = styled(Box)`
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
`

function Card(props) {

    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId] = useContext(UserContext);

    async function handleDelete() {
        props.onDeleteCard(currentUserId, currentDashboardId, props.listId, props.cardId);
    }

    return (
        <StyledCard>
            <Header>
                <Typography fontWeight='bold' fontSize='large'>
                    {props.card.header}
                </Typography>
            </Header>
            <Content>
                {props.card.content}
            </Content>
            <Assignee>
                <Avatar />
                <Typography ml='10px'>{props.card.assignee}</Typography>
            </Assignee>
            <ButtonWrap>
                <Button variant='outlined' color='info'>
                    <EditIcon />
                </Button>
                <Button variant='outlined' 
                    color='error' 
                    onClick={handleDelete}>
                    <DeleteForeverIcon />
                </Button>
            </ButtonWrap>
        </StyledCard>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
