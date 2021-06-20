import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const componentStyles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

const useStyles = makeStyles(componentStyles);

const LoaderOverlay = ({ fetching }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={fetching}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

LoaderOverlay.propTypes = {
    fetching: PropTypes.bool.isRequired
};

export default LoaderOverlay;
