import { React, useState, useEffect, useContext } from "react";
import { Box, makeStyles, FormControl, FormControlLabel, InputBase, Button, FormLabel, RadioGroup, Radio, Typography } from "@material-ui/core";
import { Send, CloudUpload } from "@material-ui/icons"
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

//api
import { CreatePost, uploadImage } from "../../service/api";

const useStyle = makeStyles(theme => ({
    container: {
        padding: '0 400px',
        [theme.breakpoints.down('md')]: {
            padding: '10px 100px'
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
    },
    radio: {
        display: 'flex',
        flexDirection: 'row',
    },
    textfield: {
        flex: 1,
        margin: '10px 0 10px 0',
        fontSize: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    btnBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5px'
    },
    postbtn: {
        marginLeft: 'auto'
    }
}));

const initialValues = {
    question: '',
    image: '',
    category: '',
    username: '',
    email: '',
    date_created: new Date()
};

const Create = () => {

    const classes = useStyle();

    const [post, setPost] = useState(initialValues);

    const [file, setFile] = useState('');

    const [imageURL, setImageURL] = useState('');

    const { state, dispatch } = useContext(userContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const username = state.username;
        const email = state.email;
        setPost({ ...post, [e.target.name]: [e.target.value], username: username, email: email });
    }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);
                const image = await uploadImage(data);
                post.image = image.data;
                setImageURL(image.data);

            }
        }
        getImage();
    }, [file])

    const savePost = async () => {
        await CreatePost(post);
        navigate('/');
    }

    return (
        <Box className={classes.container}>
            <FormControl className={classes.form}>
                <InputBase
                    className={classes.textfield}
                    fullWidth={true} multiline={true}
                    placeholder="write your question here"
                    onChange={(e) => handleChange(e)}
                    name='question'
                />
            </FormControl>
            <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>Category:</Typography>
            <RadioGroup row className={classes.radio}>
                <FormControlLabel name="category" value="Academics" onChange={(e) => handleChange(e)} control={<Radio />} label="Academics" />
                <FormControlLabel name="category" value="Placement" onChange={(e) => handleChange(e)} control={<Radio />} label="Placement" />
                <FormControlLabel name="category" value="Technical" onChange={(e) => handleChange(e)} control={<Radio />} label="Technical" />
                <FormControlLabel name="category" value="Others" onChange={(e) => handleChange(e)} control={<Radio />} label="Others" />
            </RadioGroup>

            {post.image &&
                <img className={classes.image} src={imageURL} alt="DefaultImage" />
            }

            <Box className={classes.btnBox}>
                <input
                    type="file" id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="fileInput">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<CloudUpload />}>
                        Upload
                    </Button>
                </label>

                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Send />}
                    className={classes.postbtn}
                    onClick={savePost}>
                    Post
                </Button>
            </Box>
        </Box>
    )
}

export default Create;