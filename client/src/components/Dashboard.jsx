import { useState, useContext, Fragment } from 'react'
import List from './List'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/rootReducer'
import _ from 'lodash'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Menu, MenuItem } from '@mui/material'
import styled from 'styled-components'
import UserContext from '../contexts/UserContext'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from 'react-hook-form'
import API from './../API'

const ProgressWrap = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 200px;
`

const AddListButton = styled(Button)`
    width: 100%;    
    opacity: 0.5;
`

const AddListButtonWrap = styled(Box)`
    width: 300px;
    display: inline-block;
    vertical-align: top;
    margin: 10px;
`

const StyledForm = styled.form`
    padding: 15px 15px 0 15px;
    width: 300px;
`

const StyledInput = styled.input`
    width: 100%;
    height: 30px;
    padding: 5px;
`

const StyledMenu = styled(Menu)`
`

function Dashboard(props) {

    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId] = useContext(UserContext);

    const [menuListAnchor, setMenuListAnchor] = useState(null);
    const closeMenuList = () => {setMenuListAnchor(null); reset({name: ''})};
    const openMenuList = (e) => setMenuListAnchor(e.currentTarget);

    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = (data) => {
        closeMenuList();
        const addingList = {...data, cards: []};
        props.onPushList(currentUserId, currentDashboardId, addingList);
        reset({name: ''});
    }

    return (
        <div>
            {
                (loggedIn) ? (
                    (_.isEmpty(props.userData)) ? (
                        <ProgressWrap>
                            <CircularProgress size={150}/>
                        </ProgressWrap>
                        ) : (
                            <Fragment>
                                {
                                    props.userData.dashboards[currentDashboardId].lists.map((list, index) => (
                                        <List list={list} listId={index} key={index}/>
                                    ))
                                }
                                <AddListButtonWrap>
                                    <AddListButton
                                        onClick={openMenuList} 
                                        size='large' 
                                        variant='contained' 
                                        color='info'
                                    >Add list</AddListButton>
                                    <StyledMenu
                                        sx={{mt: '10px'}}
                                        open={Boolean(menuListAnchor)}
                                        anchorEl={menuListAnchor}
                                        onClose={closeMenuList}
                                    >
                                        <StyledForm>
                                            <StyledInput autoComplete='off' placeholder={'Input name...'} type={'text'} {...register('name')}/>
                                            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                                                <Button 
                                                    onClick={handleSubmit(onSubmit)}
                                                    type='submit' 
                                                    color='success'
                                                ><DoneIcon /></Button>
                                                <Button 
                                                    onClick={closeMenuList}
                                                    color='error'
                                                ><CloseIcon /></Button>
                                            </Box>
                                        </StyledForm>
                                    </StyledMenu>
                                </AddListButtonWrap>
                            </Fragment>   
                        )
                ) : (
                    <Box sx={{textAlign: 'center'}}><h1>empty</h1></Box>
                )
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
