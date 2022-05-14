import { React, useState, useEffect, useContext } from 'react';
import { Box, IconButton, makeStyles, InputBase } from '@material-ui/core';
import { Send } from "@material-ui/icons";
import { userContext } from '../../App';

//components
import Answer from './Answer';

//api
import { newAnswer, getAnswers } from '../../service/api';

const useStyles = makeStyles({
    container: {
        marginTop: 80,
        display: 'flex',
    },
    textarea: {
        border: '1px solid black',

        width: '100%',
        marginRight: '5px'
    },
    button: {
        marginTop: 25,
        height: 40
    }
})

const initialValue = {
    username: '',
    email: '',
    postId: '',
    answers: ''
}

const Answers = ({ post }) => {
    const classes = useStyles();

    const [answer, setAnswer] = useState(initialValue);

    const [answers, setAnswers] = useState([]);

    const [data, setData] = useState();

    const [toggle, setToggle] = useState(false);

    const { state, dispatch } = useContext(userContext);

    useEffect(() => {
        const getData = async () => {
            const response = await getAnswers(post._id);
            setAnswers(response);
        }
        getData();

        return () => {
            setAnswers(null);
        };
    }, [toggle, post]);

    const handleChange = (e) => {
        setAnswer({
            ...answer,
            username: state.username,
            email: state.email,
            postId: post._id,
            answers: e.target.value,

        });
        setData(e.target.value);
    }

    const addAnswer = async () => {
        await newAnswer(answer);
        setData('')
        setToggle(prev => !prev);
    }

    return (
        <Box>
            <Box className={classes.container}>
                <InputBase
                    minRows={5}
                    fullWidth={true} multiline={true}
                    className={classes.textarea}
                    placeholder="Write your answer here..."
                    onChange={(e) => handleChange(e)}
                    value={data}
                />
                <IconButton
                    color="primary"
                    className={classes.button}
                    onClick={(e) => addAnswer(e)}><Send /></IconButton>
            </Box>
            <Box>
                {
                    answers && answers.map(answer => (
                        <Answer answer={answer} key={answer._id} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Answers;