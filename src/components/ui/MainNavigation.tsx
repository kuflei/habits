import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MainNavigation() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MyApp
                </Typography>
                <Button color="inherit" component={Link} to="/">Main</Button>
                <Button color="inherit" component={Link} to="/habits">Habits</Button>
               {/* <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>*/}
            </Toolbar>
        </AppBar>
    )
}