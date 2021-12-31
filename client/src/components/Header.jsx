import React, {useState, useEffect, useContext} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { CircularProgress, AppBar, Toolbar, Menu, MenuItem, Button, Typography, Box, Avatar } from '@mui/material';
import '@fontsource/roboto/500.css';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';
import { connect } from 'react-redux';
import styled from 'styled-components'
import '@fontsource/roboto/500.css';
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import _ from 'lodash'
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {useForm} from 'react-hook-form';

const ProgressWrap = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
`
const StyledCircularProgress = styled(CircularProgress)`
    color: white;
`

const AddDashboardButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
`

const StyledForm = styled.form`
    display: flex;
    width: 165px;
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


function Header(props) {

    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId]= useContext(UserContext);

    const [anchorDashboardElement, setAnchorDashboardElement] = useState(null);
    const [anchorDashboardEditElement, setAnchorDashboardEditElement] = useState(null);
    const [anchorAccountElement, setAnchorAccountElement] = useState(null);
    const [anchorDashboardAddElement, setAnchorDashboardAddElement] = useState(null);

    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = (data) => {
        ToggleDashboardAddMenuMode();
        props.onPushDashboard(currentUserId, data);
        reset({title: ''});
    }

    function ToggleDashboardAddMenuMode(event) {
        if (event)
            setAnchorDashboardAddElement((anchorDashboardAddElement === null) ? event.currentTarget : null);
        else
            setAnchorDashboardAddElement(null);
    }

    function handleCloseDashboardAddMenu(e) {
        ToggleDashboardAddMenuMode(e);
        reset({title: ''});
    }

    function ToggleDashboardMenuMode(event) {
        setAnchorDashboardElement((anchorDashboardElement === null) ? event.currentTarget : null);
    }

    function ToggleAccountMenuMode(event) {
        setAnchorAccountElement((anchorAccountElement === null) ? event.currentTarget : null);
    }

    function ToggleDashboardEditMenuMode(event) {
        if (event)
            setAnchorDashboardEditElement((anchorDashboardEditElement === null) ? event.currentTarget : null);
        else
            setAnchorDashboardEditElement(null);
    }

    function ChangeSelectedItem(index) {
        setCurrentDashboardId(() => index);
        ToggleDashboardMenuMode();
    }

    function LogOut() {
        setAnchorAccountElement(() => null);
        setLoggedIn(() => false);
        setCurrentDashboardId(() => -1);
        setCurrentUserId(() => -1);
    }

    const handleDeleteDashboard = () => {
        ToggleDashboardEditMenuMode();
        if (currentDashboardId === 0) {
            if (props.userData.dashboards.length > 1) 
                props.onDeleteDashboard(currentUserId, currentDashboardId);
        } else if (currentDashboardId === props.userData.dashboards.length - 1) {
            setCurrentDashboardId(prev => prev - 1);
            props.onDeleteDashboard(currentUserId, currentDashboardId);
        } else 
            props.onDeleteDashboard(currentUserId, currentDashboardId);
    }

    return (
        <AppBar component='div' color='primary' position='static' sx={{marginBottom: '15px'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button 
                        sx={{
                            width: '50px',
                            color: 'white',
                        }}
                        onClick={ToggleDashboardMenuMode}
                    ><MenuIcon sx={{fontSize: '50px'}}/></Button>
                    <Box sx={{ml: '20px'}}>
                            {
                                (loggedIn) ? (
                                    (_.isEmpty(props.userData)) ? (
                                        <Typography fontSize='30px'>
                                            <StyledCircularProgress size={30}/>
                                        </Typography>
                                    ) : (
                                        <React.Fragment>
                                            <Typography 
                                                sx={{cursor: 'pointer'}} 
                                                fontSize='30px'
                                                onClick={ToggleDashboardEditMenuMode}
                                            >
                                                {props.userData.dashboards[currentDashboardId].title}
                                            </Typography>
                                            <Menu
                                                sx={{marginLeft: '10px'}}
                                                anchorEl={anchorDashboardEditElement}
                                                open={Boolean(anchorDashboardEditElement)}
                                                onClose={ToggleDashboardEditMenuMode}
                                                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            >
                                                <MenuItem><DriveFileRenameOutlineIcon /><Typography ml='5px'>Rename</Typography></MenuItem>
                                                <MenuItem onClick={handleDeleteDashboard}
                                                ><DeleteForeverIcon /><Typography ml='5px'>Delete</Typography></MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )
                                )
                                : (
                                    <Typography fontSize='30px'>
                                        Dashboard
                                    </Typography>
                                )
                            }
                    </Box>
                </Box>
                <Menu
                    anchorEl={anchorDashboardElement}
                    open={Boolean(anchorDashboardElement)} 
                    onClose={ToggleDashboardMenuMode}
                >
                    <Box sx={{p: '10px'}}>
                        <Box sx={{mb: '10px'}}>
                            <Typography sx={{marginX: '5px', fontWeight: 'bold', fontSize: '20px'}}>
                                Your dashboards
                            </Typography>
                        </Box>
                        {
                            (loggedIn) ? (
                                (_.isEmpty(props.userData)) ? (
                                    <ProgressWrap>
                                        <CircularProgress size={30}/>
                                    </ProgressWrap>
                                ) : (
                                    <React.Fragment>
                                        {
                                            props.userData.dashboards
                                                .map((dashboard) => dashboard.title)  
                                                .map((item, index) => ( 
                                                    <MenuItem 
                                                        key={index} 
                                                        selected={index === currentDashboardId}
                                                        onClick={() => ChangeSelectedItem(index)}
                                                    >
                                                        <Box sx={{margin: '0 auto'}}>
                                                            <Typography>{item}</Typography>
                                                        </Box>
                                                    </MenuItem>
                                                ))
                                        }
                                        <AddDashboardButton 
                                            size='small'
                                            variant='outlined'
                                            color='primary'
                                            onClick={ToggleDashboardAddMenuMode}
                                        >
                                            <Box sx={{display: 'flex'}}>
                                                <AddIcon /><Typography>Add</Typography>
                                            </Box>
                                        </AddDashboardButton>
                                        <Menu
                                            sx={{marginTop: '25px'}}
                                            anchorEl={anchorDashboardAddElement}
                                            open={Boolean(anchorDashboardAddElement)}
                                            onClose={ToggleDashboardAddMenuMode}
                                        >
                                            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                                                <StyledInput autoComplete='off' placeholder={'Input title...'} type="text" {...register('title')}/>
                                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                                                    <Button color='success' type='submit'><DoneIcon /></Button>
                                                    <Button color='error' onClick={handleCloseDashboardAddMenu}><CloseIcon /></Button>
                                                </Box>
                                            </StyledForm>
                                        </Menu>
                                    </React.Fragment>
                                )  
                            ) : (
                                <h1>empty</h1>
                            ) 
                        }
                    </Box>
                </Menu>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button sx={{color: 'white'}} onClick={ToggleAccountMenuMode}>
                        <AccountCircleIcon sx={{color: 'white', fontSize: '50px', mr: '5px'}}/>
                        {
                            (loggedIn) ? (
                                (_.isEmpty(props.userData)) ? null : (
                                    <Typography sx={{textTransform: 'none'}} fontSize='20px'>{`${props.userData.name} ${props.userData.surname}`}</Typography>
                                )
                            ) : null
                        }
                    </Button>
                    <Menu 
                        sx={{padding: '20px'}}
                        anchorEl={anchorAccountElement}
                        open={Boolean(anchorAccountElement)}
                        onClose={ToggleAccountMenuMode}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            {
                                (loggedIn) ? (
                                    <React.Fragment>
                                      <Avatar sx={{marginRight: '10px'}} /><Typography fontSize='20px'>Profile</Typography>
                                    </React.Fragment>
                                ) : (
                                    <StyledLink to='/auth'>
                                        <Typography fontSize='20px'>Sign in</Typography>
                                    </StyledLink>
                                )
                            }
                        </MenuItem>
                        {
                            (loggedIn) ? (
                                <MenuItem onClick={LogOut}>
                                    <Typography fontSize='20px'>Log out</Typography>
                                </MenuItem>
                            ) : null
                        }
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
