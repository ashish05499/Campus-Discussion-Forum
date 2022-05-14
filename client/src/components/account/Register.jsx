import { React, useState } from 'react';
import { Avatar, Button, FormControl, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import { useNavigate } from 'react-router-dom';

//api
import { register } from '../../service/api';

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
});

const initialUserData = {
    username: "",
    email: "",
    password: "",
    cpassword: ""
}

const Register = () => {
    const classes = useStyle();

    const [user, setUserData] = useState(initialUserData);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...user, [e.target.name]: [e.target.value] })
    }

    const registerUser = async () => {
        await register(user);
        navigate('/login')
    }

    return (
        <Grid>
            <Paper elevation={20} className={classes.paper}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                        <AddCircleOutlineOutlined />
                    </Avatar>
                    <h2 className={classes.heading}>Register</h2>
                    <Typography variant='caption'>Please fill this form to create an account</Typography>
                </Grid>
                <FormControl fullWidth>
                    <TextField
                        name='username'
                        onChange={(e) => handleChange(e)}
                        variant='outlined'
                        required
                        type='text'
                        fullWidth
                        label='Username'
                        margin='normal' />

                    <TextField
                        name='email'
                        onChange={(e) => handleChange(e)}
                        variant='outlined'
                        required
                        type='email'
                        fullWidth
                        margin='normal'
                        label='Email' />

                    <TextField
                        name='password'
                        onChange={(e) => handleChange(e)}
                        variant='outlined'
                        required
                        type='password'
                        fullWidth
                        margin='normal'
                        label='Password' />

                    <TextField
                        name='cpassword'
                        onChange={(e) => handleChange(e)}
                        variant='outlined'
                        required
                        type='password'
                        fullWidth
                        margin='normal'
                        label='Confirm Password' />

                    <Button
                        className={classes.button}
                        type='submit'
                        variant='contained'
                        color='primary'
                        margin='normal'
                        onClick={registerUser}
                    >
                        Register
                    </Button>

                </FormControl>
            </Paper>
        </Grid>
    )
}

export default Register;