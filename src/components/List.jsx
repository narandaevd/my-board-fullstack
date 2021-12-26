import '@fontsource/roboto/400.css';
import { Button, Typography, Modal, Box } from '@mui/material'
import styled from 'styled-components'
import Card from './Card'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useState} from 'react'
import { mapStateToProps } from '../store/reducers/rootReducer';
import { mapDispatchToProps } from '../store/reducers/rootReducer';
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form';

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: '5px',
    pt: 2,
    px: 4,
    pb: 3,
};

const StyledTypography = styled(Typography)`
    font-weight: normal;
    font-size: 25px;
    text-align: center;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

const StyledInput = styled.input`
    height: 30px;
    margin-top: 15px;
    width: 80%;
`

function List(props) {

    const [isModalOpened, setIsModalOpened] = useState(false);
    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = (data) => {
        props.onAdd(data, props.listIndex); 
        setIsModalOpened(() => false); 
        reset({});
    };

    return (
        <StyledList>
            <ListHeader>
                <Typography fontSize='25px' ml='5px'>{props.list.name}</Typography>
                <Button color='info'>
                    <MoreHorizIcon />
                </Button>
            </ListHeader>
            <ListContent>
                {
                    props.list.cards.map((card, index) => (
                        <Card card={card} listIndex={props.listIndex} cardIndex={index}/>
                    ))
                }
            </ListContent>
            <Button 
                onClick={() => setIsModalOpened(() => true)}
                sx={{marginBottom: '5px', marginTop: '-10px'}}
                variant='text'>
                ADD
            </Button>
            <Modal
                open={isModalOpened}
                onClose={() => setIsModalOpened(() => false)}
            >
                <Box sx={style}>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <Button variant='outlined' color='error' sx={{alignSelf: 'end'}}>X</Button>
                        <StyledTypography mt='15px' >Title</StyledTypography>
                        <StyledInput type="text" {...register('header')}/>
                        <StyledTypography mt='15px' >Content</StyledTypography>
                        <StyledInput type="text" {...register('content')}/>
                        <StyledTypography mt='15px' >Assignee</StyledTypography>
                        <StyledInput type="text" {...register('assignee')}/>
                        <Button variant='outlined' color='success' type='submit' sx={{width: '120px', marginTop: '30px'}}>Отправить</Button>
                    </StyledForm>
                </Box>
            </Modal>
        </StyledList>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
