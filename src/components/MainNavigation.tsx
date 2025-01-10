import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MainNavigation() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'}}>
                    LOGO
                </Typography>
                <Button color="inherit" component={Link} to="/habits">Habits</Button>
            </Toolbar>
        </AppBar>
    )
}