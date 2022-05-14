import { React, useState, useContext } from 'react';
import { Avatar, Button, FormControl, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from '../../App';

//api
import { login } from '../../service/api';

const useStyle = makeStyles({
    paper: {
        padding: '20px 20px',
        width: 300,
        margin: '20px auto'
    },
    heading: {
        margin: '0'
    },
    button: {
        margin: '5px auto',
    }
})

const initialUserData = {
    email: '',
    password: '',
}


const Login = () => {
    const classes = useStyle();

    const [user, setUserData] = useState(initialUserData);

    const { state, dispatch } = useContext(userContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...user, [e.target.name]: [e.target.value] });
    }

    const loginUser = async () => {
        const response = await login(user);

        if (response) {
            localStorage.setItem("user", JSON.stringify(response.data.user))
            dispatch({ type: "USER", payload: response.data.user })
            navigate('/');
        }
        else {
            navigate('/login');
        }

    }

    return (
        <Grid>
            <Paper elevation={20} className={classes.paper}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                        <Lock />
                    </Avatar>
                    <h2 className={classes.heading}>Login</h2>
                </Grid>
                <FormControl fullWidth>

                    <TextField
                        variant='outlined'
                        required
                        type='email'
                        fullWidth
                        margin='normal'
                        label='Email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                    />

                    <TextField
                        variant='outlined'
                        required
                        type='password'
                        fullWidth
                        margin='normal'
                        label='Password'
                        name='password'
                        onChange={(e) => handleChange(e)}
                    />

                    <Button
                        className={classes.button}
                        type='submit'
                        variant='contained'
                        color='primary'
                        margin='normal'
                        onClick={loginUser}
                    >
                        Login
                    </Button>

                </FormControl>
                <Typography>Don't have an account? <Link to='/register'>Register</Link></Typography>
            </Paper>
        </Grid>
    )
}

export default Login;