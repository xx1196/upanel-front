import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import {ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const componentStyles = (theme) => ({
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

const useStyles = makeStyles(componentStyles);

const ListProductsCategory = ({category}) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <List className={classes.listRoot} subheader={<li/>}>
                    <li key={`section-${category.name}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>{`Productos de  ${category.name}`}</ListSubheader>
                            {category.products.map((product, index) => (
                                <ListItem key={`item-${category.name}-${index}`}>
                                    <ListItemText primary={`Item ${product.name}`}/>
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                </List>
            </Grid>
        </Grid>
    );
}

ListProductsCategory.propTypes = {
    category: PropTypes.array.isRequired
};

export default ListProductsCategory;
