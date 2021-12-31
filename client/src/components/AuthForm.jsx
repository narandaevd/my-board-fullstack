import {useContext, useState} from 'react';
import UserContext from '../contexts/UserContext';
import { Alert, Typography, Button, Box } from '@mui/material'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import API from './../API'
import {useNavigate} from 'react-router-dom'

const StyledForm = styled.form`
    margin: 300px auto 0 auto;
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

function AuthForm() {
    const [loggedIn, setLoggedIn, 
        currentDashboardId, setCurrentDashboardId, 
        currentUserId, setCurrentUserId] = useContext(UserContext);
    const {register, handleSubmit, errors, reset} = useForm();
    const navigate = useNavigate();
    const [isOpenedHelper, setIsOpenedHelper] = useState(null);

    const dangerHelper = () => setIsOpenedHelper(() => true);
    const successHelper = () => setIsOpenedHelper(() => false);

    const onSubmit = async (data) => {
        const response = await fetch(API.auth.getUrl(), API.auth.getOptions(data)); 
        const json = await response.json();
        const body = json.body;
        if (body.isFounded === true) {
            successHelper();
            setLoggedIn(() => true);
            setCurrentUserId(() => body.userId);
            setCurrentDashboardId(() => 0);
            navigate('/');
        } else 
            dangerHelper();
        reset({});
    }

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledTypography mt='15px' fontSize='40px'>Authorization</StyledTypography>
            <StyledTypography mt='30px' fontSize='20px'>E-mail</StyledTypography>
            <StyledInput type="text" {...register('email')}/>
            <StyledTypography mt='15px' fontSize='20px'>Password</StyledTypography>
            <StyledInput type="password" {...register('password')}/>
            <ButtonWrap>
                <Button variant='outlined' color='info' type='submit' sx={{width: '120px'}}>Sign in</Button>
                <Button onClick={() => navigate('/register')} variant='outlined' color='info' type='submit' sx={{width: '120px'}}>Sign up</Button>
            </ButtonWrap>
            {
                (isOpenedHelper === null) ? (
                    null
                ) : (
                    (isOpenedHelper) ? (
                        <Alert variant='outlined' color='error'>
                            Incorrect email or password
                        </Alert>
                    ) : (
                        <Alert variant='outlined' color='success'>
                            Success!
                        </Alert>
                    )
                )
            }
        </StyledForm>
    )
}

export default AuthForm;
