import {useContext, useState} from 'react';
import UserContext from '../contexts/UserContext';
import { Alert, Typography, Button } from '@mui/material'
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
        const response = await fetch(API.getAuthUrl(), API.getAuthOptions(data)); 
        const json = await response.json();
        const body = json.body;
        if (body.isFounded === true) {
            await setLoggedIn(() => true);
            await setCurrentUserId(() => body.userId);
            await setCurrentDashboardId(() => 0);
            navigate('/');
            successHelper();
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
            <StyledInput type="text" {...register('password')}/>
            <Button variant='outlined' color='success' type='submit' sx={{width: '120px', marginY: '30px'}}>Sign in</Button>
            {
                (isOpenedHelper === null) ? (
                    null
                ) : (
                    (isOpenedHelper) ? (
                        <Alert variant='outlined' color='error'>
                            Incorrect data
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
