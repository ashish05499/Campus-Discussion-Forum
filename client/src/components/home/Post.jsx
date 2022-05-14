import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles({
    container: {
        minHeight: '50%',
        width: '50%',
        marginTop: 20,
        margin: 'auto',
        border: '1px solid #d3cede',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '&>*': {
            padding: '0 5px 5px 5px'
        }
    },
    image: {
        height: '80%',
        width: '80%',
        objectFit: 'cover',
    },
    text: {
        color: '#878787',
        fontSize: 12,
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        wordBreak: 'break-word',
    }
});

const Post = ({ post }) => {

    const classes = useStyle();

    return (
        <Box className={classes.container}>
            <Typography className={classes.heading}>{post.question}</Typography>

            {post.image &&
                <img src={post.image} alt='DefaultImage' className={classes.image} />
            }

            <Typography className={classes.text}>Category: {post.category}</Typography>
            <Typography className={classes.text}>Asked By: {post.username}</Typography>
        </Box>
    );
}

export default Post;