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

function Card() {
    return (
        <StyledCard>
            <Header>
                <Typography fontWeight='bold' fontSize='large'>
                    Learn Mobx-State-tree
                </Typography>
            </Header>
            <Content>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores perferendis reiciendis quasi mollitia sit saepe, molestiae at. Sapiente eveniet sed possimus et totam, nesciunt blanditiis incidunt obcaecati atque debitis dolore.
            </Content>
            <Assignee>
                <AccountCircleIcon sx={{fontSize: '45px'}}/>
                <Typography ml='10px'>Name Surname</Typography>
            </Assignee>
        </StyledCard>
    )
}

export default Card
