import React, {useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";
// @material-ui/core components
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import CardContent from "@material-ui/core/CardContent";

// core components
import Header from "components/Headers/Header.js";

import {connect, useDispatch} from "react-redux";
import boxShadows from "assets/theme/box-shadow.js";
import {fetchCategoryAction, updateCategoryAction} from "redux/CategoryDucks";

import LoaderOverlay from "components/Loaders/loaderOverlay"
import ListProductsCategory from "./ListProductsCategory";

const componentStyles = (theme) => ({
    cardRoot: {
        boxShadow: boxShadows.boxShadow + "!important",
        border: "0!important",
    },
    cardRootSecondary: {
        backgroundColor: theme.palette.secondary.main,
    },
    cardHeaderRoot: {
        backgroundColor: theme.palette.white.main + "!important",
    },
    containerRoot: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: "39px",
            paddingRight: "39px",
        },
    },
    gridItemRoot: {
        [theme.breakpoints.up("xl")]: {
            marginBottom: "0!important",
        },
    },
    typographyRootH6: {
        textTransform: "uppercase",
    },
    plLg4: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: "1.5rem",
        },
    },
    ptMd4: {
        [theme.breakpoints.up("sm")]: {
            paddingTop: "1.5rem!important",
        },
    },
    mtMd5: {
        [theme.breakpoints.up("sm")]: {
            paddingTop: "3rem!important",
        },
    },
    cardHeaderRootProfile: {
        [theme.breakpoints.up("sm")]: {
            paddingBottom: "1.5rem!important",
            paddingTop: "1.5rem!important",
        },
    },
    buttonRootInfo: {
        color: theme.palette.white.main,
        backgroundColor: theme.palette.info.main,
        "&:hover": {
            backgroundColor: theme.palette.info.dark,
        },
    },
    buttonRootDark: {
        color: theme.palette.white.main,
        backgroundColor: theme.palette.dark.main,
        "&:hover": {
            backgroundColor: theme.palette.dark.dark,
        },
    },
    profileImage: {
        verticalAlign: "middle",
        borderStyle: "none",
        transform: "translate(-50%,-30%)",
        transition: "all .15s ease",
    },
    cardProfileLink: {
        color: theme.palette.primary.main,
        backgroundColor: "initial",
        textDecoration: "none",
        fontSize: "1rem",
        "&:hover": {
            color: theme.palette.primary.dark,
        },
    },
    order1: {
        [theme.breakpoints.down("lg")]: {
            order: "1!important",
        },
    },
    order2: {
        [theme.breakpoints.down("lg")]: {
            order: "2!important",
        },
    },
    marginBottomXl0: {
        [theme.breakpoints.up("lg")]: {
            marginBottom: "0!important",
        },
    }
});

const useStyles = makeStyles(componentStyles);

const Category = ({access_token, fetching, history, category}) => {
    let {id} = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!access_token) {
            history.push('/admin');
        }
    }, [access_token]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryAction(id));

        setName(category.name);
        setDescription(category.description);
    }, [category]);

    const classes = useStyles();
    const theme = useTheme();

    const handleSave = () => {
        dispatch(updateCategoryAction(id, name, description));
    };

    return (
        <>
            <LoaderOverlay fetching={fetching}/>
            <Header/>
            {/* Page content */}
            <Container
                maxWidth={false}
                component={Box}
                marginTop="2rem"
                classes={{root: classes.containerRoot}}
            >
                <CardHeader
                    subheader={
                        <Grid
                            container
                            component={Box}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item xs="auto">
                                <Box
                                    component={Typography}
                                    variant="h3"
                                    marginBottom="0!important"
                                >
                                    Edición de {category.name}
                                </Box>
                            </Grid>
                            <Grid item xs="auto">
                                <Box
                                    justifyContent="flex-end"
                                    display="flex"
                                    flexWrap="wrap"
                                >
                                    <Button
                                        disabled={fetching}
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    }
                    classes={{root: classes.cardHeaderRoot}}
                ></CardHeader>
                <CardContent>
                    <Box
                        component={Typography}
                        variant="h6"
                        color={theme.palette.gray[600] + "!important"}
                        paddingTop=".25rem"
                        paddingBottom=".25rem"
                        fontSize=".75rem!important"
                        letterSpacing=".04em"
                        marginBottom="1.5rem!important"
                        classes={{root: classes.typographyRootH6}}
                    >
                        Category Information
                    </Box>
                    <div className={classes.plLg4}>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <FormGroup>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        variant="filled"
                                        component={Box}
                                        width="100%"
                                        marginBottom="1rem!important"
                                    >
                                        <Box
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoComplete="off"
                                            type="text"
                                            placeholder="Nombre"
                                            disabled={fetching}
                                            paddingLeft="0.75rem"
                                            paddingRight="0.75rem"
                                            component={FilledInput}
                                        />
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl
                                        variant="filled"
                                        component={Box}
                                        width="100%"
                                        marginBottom="1rem!important"
                                    >
                                        <Box
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            autoComplete="off"
                                            type="text"
                                            placeholder="descripcion"
                                            disabled={fetching}
                                            paddingLeft="0.75rem"
                                            paddingRight="0.75rem"
                                            component={FilledInput}
                                            autoComplete="off"
                                            multiline
                                            rows="4"
                                        />
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <ListProductsCategory category={category}/>
                    </div>
                </CardContent>
            </Container>
        </>
    );
};

function mapState(state) {
    return {
        category: state.categories.category,
        fetching: state.categories.fetching,
        access_token: state.user.accessToken,
    }
}

export default withRouter(connect(mapState)(Category));

