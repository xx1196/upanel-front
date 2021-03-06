import React, {useEffect, useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// @material-ui/lab components
import Pagination from "@material-ui/lab/Pagination";
// @material-ui/icons components
import DeleteIcon from '@material-ui/icons/Delete';
// core components
import Header from "components/Headers/Header.js";

import {useHistory} from 'react-router-dom'
import {connect, useDispatch} from "react-redux";
import {deleteCategoryAction, fetchCategoriesAction} from "../../../redux/CategoryDucks";
import LoaderOverlay from "../../../components/Loaders/loaderOverlay";
import boxShadows from "../../../assets/theme/box-shadow";

const componentStyles = (theme) => ({
    cardRoot: {
        boxShadow: boxShadows.boxShadow + "!important",
    },
    cardRootDark: {
        backgroundColor: theme.palette.dark.main,
        "& *": {
            color: theme.palette.white.main,
        },
        "& $tableCellRoot, & $tableRoot": {
            color: theme.palette.white.main,
            borderColor: theme.palette.dark.tableBorder,
        },
        "& $tableCellRootHead": {
            color: theme.palette.dark.tableHeadColor,
            backgroundColor: theme.palette.dark.tableHeadBgColor,
        },
    },
    cardHeader: {
        backgroundColor: "initial",
    },
    cardActionsRoot: {
        paddingBottom: "1.5rem!important",
        paddingTop: "1.5rem!important",
        borderTop: "0!important",
    },
    containerRoot: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: "39px",
            paddingRight: "39px",
        },
    },
    tableRoot: {
        marginBottom: "0!important",
    },
    tableCellRoot: {
        verticalAlign: "middle",
        paddingLeft: "1.5rem",
        margin: "1.5rem",
        paddingRight: "1.5rem",
        borderTop: "0",
    },
    tableCellRootHead: {
        backgroundColor: theme.palette.gray[100],
        color: theme.palette.gray[600],
    },
    tableCellRootBodyHead: {
        textTransform: "unset!important",
        fontSize: ".8125rem",
    },
    linearProgressRoot: {
        height: "3px!important",
        width: "120px!important",
        margin: "0!important",
    },
    bgGradientError: {
        background:
            "linear-gradient(87deg," +
            theme.palette.error.main +
            ",#f56036)!important",
    },
    bgGradientSuccess: {
        background:
            "linear-gradient(87deg," +
            theme.palette.success.main +
            ",#2dcecc)!important",
    },
    bgGradientPrimary: {
        background:
            "linear-gradient(87deg," +
            theme.palette.primary.main +
            ",#825ee4)!important",
    },
    bgGradientInfo: {
        background:
            "linear-gradient(87deg," +
            theme.palette.info.main +
            ",#1171ef)!important",
    },
    bgGradientWarning: {
        background:
            "linear-gradient(87deg," +
            theme.palette.warning.main +
            ",#fbb140)!important",
    },
    bgPrimary: {
        backgroundColor: theme.palette.primary.main,
    },
    bgPrimaryLight: {
        backgroundColor: theme.palette.primary.light,
    },
    bgError: {
        backgroundColor: theme.palette.error.main,
    },
    bgErrorLight: {
        backgroundColor: theme.palette.error.light,
    },
    bgWarning: {
        backgroundColor: theme.palette.warning.main,
    },
    bgWarningLight: {
        backgroundColor: theme.palette.warning.light,
    },
    bgInfo: {
        backgroundColor: theme.palette.info.main,
    },
    bgInfoLight: {
        backgroundColor: theme.palette.info.light,
    },
    bgSuccess: {
        backgroundColor: theme.palette.success.main,
    },
    verticalAlignMiddle: {
        verticalAlign: "middle",
    },
    avatarRoot: {
        width: "36px",
        height: "36px",
        fontSize: ".875rem",
    },
    button: {
        margin: theme.spacing(1),
    },
});

const useStyles = makeStyles(componentStyles);

const Category = (props) => {
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        let categories = props.categories;

        dispatch(fetchCategoriesAction(page));

        setCategories(categories.data);
        setPagination(categories.pagination);
    }, [props.categories.data, page]);

    const handleChange = (event, page) => {
        setPage(page);
    }

    const classes = useStyles();

    const handleOnClickEdit = (category) => {
        history.push(`/admin/categories/${category.id}`)
    }

    const handleOnClickDelete = (category) => {
        dispatch(deleteCategoryAction(category.id));
    }

    return (
        <>
            <LoaderOverlay fetching={props.fetching}/>
            <Header/>
            {/* Page content */}
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{root: classes.containerRoot}}
            >
                <Card classes={{root: classes.cardRoot}}>
                    <CardHeader
                        className={classes.cardHeader}
                        title="Card Tables"
                        titleTypographyProps={{
                            component: Box,
                            marginBottom: "0!important",
                            variant: "h3",
                        }}
                    ></CardHeader>
                    <TableContainer>
                        <Box
                            component={Table}
                            alignItems="center"
                            marginBottom="0!important"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        Nombre
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        Descripci??n
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    categories.map(category => {
                                        return <TableRow key={category.id}>
                                            <TableCell
                                                classes={{
                                                    root:
                                                        classes.tableCellRoot +
                                                        " " +
                                                        classes.tableCellRootBodyHead,
                                                }}
                                                component="th"
                                                variant="head"
                                                scope="row"
                                            >
                                                <Box alignItems="center" display="flex">
                                                    <Box display="flex" alignItems="flex-start">
                                                        <Box fontSize=".875rem" component="span">
                                                            {category.id}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                classes={{
                                                    root:
                                                        classes.tableCellRoot +
                                                        " " +
                                                        classes.tableCellRootBodyHead,
                                                }}
                                                component="th"
                                                variant="head"
                                                scope="row"
                                            >
                                                <Box alignItems="center" display="flex">
                                                    <Box display="flex" alignItems="flex-start">
                                                        <Box fontSize=".875rem" component="span">
                                                            {category.name}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell classes={{root: classes.tableCellRoot}}>
                                                {category.description.substring(0, 82) + '...'}
                                            </TableCell>
                                            <TableCell
                                                classes={{root: classes.tableCellRoot}}
                                                align="right"
                                            >

                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon/>}
                                                    onClick={() => handleOnClickEdit(category)}
                                                >
                                                    Editar
                                                </Button>

                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon/>}
                                                    onClick={() => handleOnClickDelete(category)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>;
                                    })
                                }
                            </TableBody>
                        </Box>
                    </TableContainer>
                    <Box
                        classes={{root: classes.cardActionsRoot}}
                        component={CardActions}
                        justifyContent="flex-end"
                    >
                        <Pagination onChange={handleChange} count={pagination.lastPage} color="primary"
                                    variant="outlined"/>
                    </Box>
                </Card>
            </Container>
        </>
    );
};

function mapState(state) {
    return {
        categories: state.categories,
        fetching: state.categories.fetching,
    }
}

export default connect(mapState)(Category);

