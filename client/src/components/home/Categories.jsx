import React from "react";
import { Button, makeStyles, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Link } from "react-router-dom";
import { categories } from "../../constants/data";


const useStyle = makeStyles({
    button: {
        margin: 20,
        color: '#fff',
        width: '86%',
    },
    table: {
        marginLeft: 10,
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    }
});


const Categories = () => {
    const classes = useStyle();
    return (
        <>
            <Link to='/create' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>Ask a Question</Button>
            </Link>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={"/"} className={classes.link}>All Categories</Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <Link to={`/?Category=${category.name}`} className={classes.link}>{category.name}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default Categories;