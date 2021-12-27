import {useState, useEffect} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { CircularProgress, AppBar, Toolbar, Menu, MenuItem, Button, Typography, Box, Avatar } from '@mui/material';
import '@fontsource/roboto/500.css';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';
import { connect } from 'react-redux';
import _ from 'lodash'
import styled from 'styled-components'
import '@fontsource/roboto/500.css';

const ProgressWrap = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;
`

function Header(props) {

    const [anchorDashboardElement, setAnchorDashboardElement] = useState(null);
    const [selectedDashboardId, setSelectedDashboardId] = useState(0);

    const [anchorAccountElement, setAnchorAccountElement] = useState(null);

    useEffect(() => {
        props.onChangeDashboard(selectedDashboardId);
    }, [selectedDashboardId])

    function ToggleDashboardMenuMode(event) {
        setAnchorDashboardElement((anchorDashboardElement === null) ? event.currentTarget : null);
    }

    function ToggleAccountMenuMode(event) {
        setAnchorAccountElement((anchorAccountElement === null) ? event.currentTarget : null);
    }

    function ChangeSelectedItem(index) {
        setSelectedDashboardId(() => index);
        ToggleDashboardMenuMode();
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
                        onClick={ToggleDashboardMenuMode}>
                        <MenuIcon sx={{fontSize: '50px'}}
                        />
                    </Button>
                    <Box sx={{ml: '20px'}}>
                        <Typography fontSize='30px'>Dashboard</Typography>
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
                            _.isEmpty(props.userData) ? (
                                <ProgressWrap>
                                    <CircularProgress size={30}/>
                                </ProgressWrap>
                            ) 
                            : (
                                props.userData.dashboards
                                    .map((dashboard) => dashboard.title)  
                                    .map((item, index) => ( 
                                    <MenuItem 
                                        key={index} 
                                        selected={index === selectedDashboardId}
                                        onClick={() => ChangeSelectedItem(index)}
                                    >
                                        <Box sx={{margin: '0 auto'}}>
                                            <Typography>{item}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))
                            )
                        }
                    </Box>
                </Menu>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button sx={{color: 'white'}} onClick={ToggleAccountMenuMode}>
                        <AccountCircleIcon sx={{color: 'white', fontSize: '50px', mr: '5px'}}/>
                        {
                            _.isEmpty(props.userData) ? null
                            : (
                                <Typography sx={{textTransform: 'none'}} fontSize='20px'>{`${props.userData.name} ${props.userData.surname}`}</Typography>
                            )
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
                        <MenuItem><Avatar sx={{marginRight: '10px'}}/><Typography fontSize='20px'>Profile</Typography></MenuItem>
                        <MenuItem><Typography fontSize='20px'>Exit</Typography></MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
