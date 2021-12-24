import {useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Menu, MenuItem, Button, Typography, Box } from '@mui/material';

import '@fontsource/roboto/500.css';

// !!!
const MenuItems = [
    'text1',
    'text2',
    'text3',
    'text4',
]

function Header() {

    const [anchorDashboardElement, setAnchorDashboardElement] = useState(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const [anchorAccountElement, setAnchorAccountElement] = useState(null);

    function ToggleDashboardMenuMode(event) {
        setAnchorDashboardElement((anchorDashboardElement === null) ? event.currentTarget : null);
    }

    function ToggleAccountMenuMode(event) {
        setAnchorAccountElement((anchorAccountElement === null) ? event.currentTarget : null);
    }

    function ChangeSelectedItem(index) {
        setSelectedItemIndex(() => index);
        ToggleDashboardMenuMode();
    }

    return (
        <AppBar component='div' color='primary' position='static' sx={{marginBottom: '15px'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{mr: '20px'}}>
                        <Typography fontSize='30px'>Dashboard</Typography>
                    </Box>
                    <Button 
                        sx={{
                            width: '50px',
                            color: 'white',
                        }}
                        onClick={ToggleDashboardMenuMode}>
                        <MenuIcon sx={{fontSize: '50px'}}
                        />
                    </Button>
                </Box>
                <Menu
                    anchorEl={anchorDashboardElement}
                    open={Boolean(anchorDashboardElement)} 
                    onClose={ToggleDashboardMenuMode}
                    >
                    <Box sx={{p: '10px'}}>
                        <Box sx={{mb: '10px'}}>
                            <Typography>
                                Your boards
                            </Typography>
                        </Box>
                        {
                            MenuItems.map((item, index) => ( 
                                <MenuItem 
                                    key={index} 
                                    selected={index === selectedItemIndex}
                                    onClick={() => ChangeSelectedItem(index)}>
                                    {item}
                                </MenuItem>
                            ))
                        }
                    </Box>
                </Menu>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button sx={{color: 'white'}} onClick={ToggleAccountMenuMode}>
                        <AccountCircleIcon sx={{color: 'white', fontSize: '50px', mr: '5px'}}/>
                        <Typography fontSize='20px'>Name</Typography>
                    </Button>
                    <Menu 
                        sx={{p: '10px'}}
                        anchorEl={anchorAccountElement}
                        open={Boolean(anchorAccountElement)}
                        onClose={ToggleAccountMenuMode}
                        >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Exit</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
