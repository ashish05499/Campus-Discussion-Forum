import { React, useContext } from "react";
import { Typography, Box, makeStyles, IconButton } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import { userContext } from "../../App";

//api
import { deleteAnswer } from "../../service/api";

const useStyles = makeStyles({
    component: {
        marginTop: 30,
        background: '#F5F5F5',
        padding: 10
    },
    container: {
        display: 'flex',
        marginBottom: 5
    },
    name: {
        fontWeight: 600,
        fontSize: 18,
        marginRight: 20
    },
    date: {
        fontSize: 14,
        color: '#878787'
    },
    delete: {
        marginLeft: 'auto'
    }
})

const Answer = ({ answer, setToggle }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(userContext)

    const removeAnswer = async () => {
        await deleteAnswer(answer._id);
        setToggle(prev => !prev);
    }


    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.name}>{answer.username}</Typography>
                {answer.email === state.email &&
                    <IconButton onClick={removeAnswer} className={classes.delete}>
                        <Delete />
                    </IconButton>

                }

            </Box>
            <Typography>{answer.answers}</Typography>
        </Box>
    )
}

export default Answer;