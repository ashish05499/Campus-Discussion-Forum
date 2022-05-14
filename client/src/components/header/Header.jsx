import { React, useContext } from 'react';
import { AppBar, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from '../../App';

//api
import { logout } from '../../service/api';

const useStyle = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black',
    },
    container: {
        justifyContent: 'center',
        '& > *': {
            padding: 20
        }

    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
});

const Header = () => {

    const classes = useStyle();

    const { state, dispatch } = useContext(userContext);

    const navigate = useNavigate();

    const Logout = async () => {
        localStorage.clear();
        await logout();
        dispatch({ type: "CLEAR" })
        navigate('/login');
    }

    const renderList = () => {
        if (state) {
            return (
                [
                    <Link key={1} to='/' className={classes.link}>
                        <Typography>Home</Typography>
                    </Link>,

                    <Button key={2} variant="text" onClick={Logout}>Logout</Button>

                ]
            )
        }
        else {
            return (
                [
                    <Link key={1} to='/register' className={classes.link}>
                        <Typography>Register</Typography>
                    </Link>,
                    <Link key={2} to='/login' className={classes.link}>
                        <Typography>Login</Typography>
                    </Link>
                ]
            )
        }

    }

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Typography className={classes.title}> Campus Discussion Forum</Typography>
                {renderList()}
            </Toolbar>
        </AppBar>
    );
}

export default Header;