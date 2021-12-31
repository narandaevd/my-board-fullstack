import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Alert, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import API from '../API'
import UserContext from '../contexts/UserContext' 

const StyledForm = styled.form`
    margin: 200px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 500px;
    background-color: white;
`

const StyledTypography = styled(Typography)`
    font-weight: normal;
    font-size: 25px;
    text-align: center;
`
const StyledInput = styled.input`
    height: 30px;
    margin-top: 15px;
    width: 80%;
`

const ButtonWrap = styled(Box)`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
`

function RegisterForm(props) {

    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId] = useContext(UserContext);

    const {register, handleSubmit, errors, reset} = useForm();
    
    const [dangerMessage, setDangerMessage] = useState('');

    const navigate = useNavigate();
    const [isOpenedHelper, setIsOpenedHelper] = useState(null);

    const dangerHelper = (mes) => {
        setIsOpenedHelper(() => true);
        setDangerMessage(() => mes)
    }
    const successHelper = () => setIsOpenedHelper(() => false);

    const onSubmit = async (data) => {
        const res = await fetch(API.register.getUrl(),API.register.getOptions(data));
        const json = await res.json();
        const body = json.body;
        if (json.body.isSuccess) {
            reset({
                email: '', 
                password: '', 
                confirmPassword: '',
                name: '',
                surname: '',
            });
            successHelper();
            setLoggedIn(() => true);
            setCurrentUserId(() => body.userId);
            setCurrentDashboardId(() => 0);
            navigate('/');
        } else {
            dangerHelper(body.description);
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledTypography mt='15px' fontSize='40px'>Create your account</StyledTypography>
            <StyledTypography mt='30px' fontSize='20px'>E-mail</StyledTypography>
            <StyledInput type="text" {...register('email')}/>
            <StyledTypography mt='15px' fontSize='20px'>Password</StyledTypography>
            <StyledInput type="password" {...register('password')}/>
            <StyledTypography mt='15px' fontSize='20px'>Confirm password</StyledTypography>
            <StyledInput type="password" {...register('confirmPassword')}/>
            <StyledTypography mt='15px' fontSize='20px'>Name</StyledTypography>
            <StyledInput type="text" {...register('name')}/>
            <StyledTypography mt='15px' fontSize='20px'>Surname</StyledTypography>
            <StyledInput type="text" {...register('surname')}/>
            <ButtonWrap>
                <Button variant='outlined' color='info' type='submit' sx={{width: '120px'}}>Sign up</Button>
                <Button onClick={() => navigate('/')} variant='outlined' color='error' type='submit' sx={{width: '120px'}}>Cancel</Button>
            </ButtonWrap>
            {
                (isOpenedHelper === null) ? (
                    null
                ) : (
                    (isOpenedHelper) ? (
                        <Alert variant='outlined' color='error'>
                            {dangerMessage}
                        </Alert>
                    ) : (
                        <Alert variant='outlined' color='success'>
                            Successful creating!
                        </Alert>
                    )
                )
            }
    </StyledForm>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
