import { Box, Typography, Button, makeStyles } from "@material-ui/core"
import { Edit, Delete } from "@material-ui/icons"
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from '../../App'

//components
import Answers from "../answer/Answers";

//api
import { getPost, deletePost } from "../../service/api";


const useStyle = makeStyles(theme => ({
    container: {
        padding: '0 400px',

        [theme.breakpoints.down('md')]: {
            padding: '10px 100px'
        },
    },
    titlebox: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        flex: 1,
        fontSize: 30,
        fontWeight: 600,
        margin: '10px 0 10px 0',
    },
    subheading: {
        color: '#878787',
        display: 'flex',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    btnBox: {
        marginTop: '10px',
        float: 'right',

    },
    postbtn: {
        marginLeft: 'auto'
    },
}))


const Detail = () => {

    const classes = useStyle();

    const { state, dispatch } = useContext(userContext);

    const [post, setPost] = useState({});

    let { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let data = await getPost({ id });
            setPost(data);
        }
        fetchData();

        return () => {
            setPost(null);
        };
    }, [])

    const DeletePost = async () => {
        await deletePost(post._id);
        navigate('/')
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.titlebox}>
                <Typography className={classes.title}>{post.question}</Typography>
            </Box>

            <Box className={classes.subheading}>
                <Typography>Asked By: <span style={{ fontWeight: 600 }}>{post.username}</span> </Typography>
                <Typography style={{ marginLeft: 'auto' }}>Date:{new Date(post.date_created).toDateString()}</Typography>
            </Box>

            {(post.image) &&

                <img src={post.image} alt='DefaultImage' className={classes.image} />

            }

            {post.email && (post.email === state.email) &&
                <Box className={classes.btnBox}>
                    <Link to={`/update/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<Edit />}>
                            Edit
                        </Button>
                    </Link>
                    <Button
                        size="small"
                        style={{ marginLeft: 10 }}
                        variant="contained"
                        color="secondary"
                        startIcon={<Delete />}
                        onClick={DeletePost}
                        className={classes.postbtn}>
                        Delete
                    </Button>
                </Box>
            }
            <Answers post={post} />
        </Box>
    )
}


export default Detail;