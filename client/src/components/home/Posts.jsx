import { React, useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

//components
import Post from "./Post";

//api
import { getAllPosts } from "../../service/api";

const Posts = () => {

    const [posts, setPosts] = useState([]);

    const { search } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPosts(search);
            setPosts(data);
        }
        fetchData();

    }, [search]);

    return (
        posts.map(post => (
            <Grid key={post._id} item lg={12} sm={12} xs={12}>
                <Link to={`/details/${post._id}`} style={{ color: 'inherit' }}>
                    <Post post={post} />
                </Link>
            </Grid>
        ))
    );
}

export default Posts;