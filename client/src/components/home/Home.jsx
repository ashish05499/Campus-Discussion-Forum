import React from "react";
import { Grid } from "@material-ui/core";

//components
import Categories from "./Categories";
import Posts from "./Posts";


const Home = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item lg={10} xs={12} sm={10}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;