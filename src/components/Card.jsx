import '@fontsource/roboto/300.css';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

function Card(props) {
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
                <AccountCircleIcon sx={{fontSize: '45px'}}/>
                <Typography ml='10px'>{props.card.assignee}</Typography>
            </Assignee>
        </StyledCard>
    )
}

export default Card;
