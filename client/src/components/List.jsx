import '@fontsource/roboto/400.css';
import { Button, Typography, Modal, Box, Menu, MenuItem } from '@mui/material'
import styled from 'styled-components'
import Card from './Card'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useState, useContext} from 'react'
import { mapStateToProps } from '../store/reducers/rootReducer';
import { mapDispatchToProps } from '../store/reducers/rootReducer';
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form';
import API from '../API'
import UserContext from '../contexts/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';

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
    width: 300px;
    margin: 10px;
    box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.41);
    border-radius: 5px 5px 5px 5px;
    background-color: #F0F0EF;
`

const StyledForm = styled.form`
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`

const StyledInput = styled.input`
    margin-top: 10px;
    width: 100%;
    height: 30px;
    padding: 0 0 0 5px;
`

function List(props) {

    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId]= useContext(UserContext);

    const [anchorMenuListEl, setAnchorMenuListEl] = useState(null);

    const [anchorAddButtonEl, setAnchorAddButtonEl] = useState(null);

    function ToggleAnchorAddButtonEl(e) {
        if (e)
            setAnchorAddButtonEl(() => (anchorAddButtonEl === null) ? e.currentTarget : null);
        else
            setAnchorAddButtonEl(() => null);
    }

    const openMenu = (e) => setAnchorMenuListEl(e.currentTarget);
    const closeMenu = (e) => setAnchorMenuListEl(null);
    function handleDeleteList() {
        closeMenu();
        props.onDeleteList(currentUserId, currentDashboardId, props.listId);
    }

    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = (data) => { 
        ToggleAnchorAddButtonEl(); 
        reset({header: '', content: '', assignee: ''});
        props.onPushCard(currentUserId, currentDashboardId, props.listId, data);
    };
    const handleCloseAddCardMenu = (e) => {ToggleAnchorAddButtonEl(e); reset({header: '', content: '', assignee: ''})};

    return (
        <StyledList>
            <ListHeader>
                <Typography fontSize='25px' ml='5px'>{props.list.name}</Typography>
                <Button color='info' onClick={openMenu}>
                    <MoreHorizIcon />
                </Button>
                <Menu
                    open={Boolean(anchorMenuListEl)}
                    anchorEl={anchorMenuListEl}
                    onClose={closeMenu}
                >
                    <MenuItem onClick={() => {}}>
                        <EditIcon />
                        <Typography ml='5px'>Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleDeleteList}>
                        <DeleteForeverIcon />
                        <Typography ml='5px'>Delete</Typography>
                    </MenuItem>
                </Menu>
            </ListHeader>
            <ListContent>
                {
                    props.list.cards.map((card, index) => (
                        <Card card={card} listId={props.listId} cardId={index} key={index}/>
                    ))
                }
            </ListContent>
            <Button 
                onClick={ToggleAnchorAddButtonEl}
                sx={{marginBottom: '5px', marginTop: '-10px'}}
                variant='text'>
                Add
            </Button>
            <Menu
                sx={{marginTop: '15px'}}
                anchorEl={anchorAddButtonEl}
                open={Boolean(anchorAddButtonEl)}
                onClose={ToggleAnchorAddButtonEl}
            >
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledInput autoComplete='off' placeholder={'Input header...'} type="text" {...register('header')}/>
                    <StyledInput autoComplete='off' placeholder={'Input content...'} type="text" {...register('content')}/>
                    <StyledInput autoComplete='off' placeholder={'Input assignee...'} type="text" {...register('assignee')}/>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                        <Button color='success' type='submit'><DoneIcon /></Button>
                        <Button color='error' onClick={handleCloseAddCardMenu}><CloseIcon /></Button>
                    </Box>
                </StyledForm>
            </Menu>
        </StyledList>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
