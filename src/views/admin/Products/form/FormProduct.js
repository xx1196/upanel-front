import LoaderOverlay from "../../../../components/Loaders/loaderOverlay";
import Header from "../../../../components/Headers/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import MultiSelectCategoriesProduct from "../MultiSelectCategoriesProduct";
import React, {useEffect, useState} from "react";
import boxShadows from "../../../../assets/theme/box-shadow";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {createProductAction, updateProductAction} from "../../../../redux/ProductDucks";
import PropTypes from "prop-types";

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

const FormProduct = ({id, dispatch, mode_create, fetching, all_categories, product}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState(0.0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!mode_create) {
            setName(product.name);
            setDescription(product.description);
            setCode(product.code);
            setPrice(product.price);
        }
    }, [product]);


    const handleSubmit = () => {
        mode_create ? handleCreate() : handleEdit()
    }

    const handleEdit = () => {
        dispatch(updateProductAction(id, name, code, description, price, categories));
    };

    const handleCreate = () => {
        dispatch(createProductAction(name, code, description, price, categories));
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
                                    {mode_create ? 'Nuevo producto' : `Edición de ${product.name}`}
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
                                        onClick={handleSubmit}
                                    >
                                        {mode_create ? 'Crear' : 'Editar'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    }
                    classes={{root: classes.cardHeaderRoot}}
                />
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
                        Product Information
                    </Box>
                    <div className={classes.plLg4}>
                        <Grid container>
                            <Grid item xs={12} lg={4}>
                                <FormGroup>
                                    <FormLabel>Nombre</FormLabel>
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
                            <Grid item xs={12} lg={4}>
                                <FormGroup>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl
                                        variant="filled"
                                        component={Box}
                                        width="100%"
                                        marginBottom="1rem!important"
                                    >
                                        <Box
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            autoComplete="off"
                                            type="text"
                                            placeholder="Codigo"
                                            disabled={fetching}
                                            paddingLeft="0.75rem"
                                            paddingRight="0.75rem"
                                            component={FilledInput}
                                        />
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormGroup>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl
                                        variant="filled"
                                        component={Box}
                                        width="100%"
                                        marginBottom="1rem!important"
                                    >
                                        <CurrencyTextField
                                            variant="standard"
                                            value={price}
                                            currencySymbol="$"
                                            minimumValue="0"
                                            outputFormat="number"
                                            decimalCharacter=","
                                            digitGroupSeparator="."
                                            onChange={(event, value) => setPrice(value)}
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
                    </div>
                    <MultiSelectCategoriesProduct set_categories={setCategories}
                                                  categories_product={mode_create ? [] : product.categories}
                                                  all_categories={all_categories}/>
                </CardContent>
            </Container>
        </>
    );
}

FormProduct.propTypes = {
    id: PropTypes.string,
    fetching: PropTypes.bool.isRequired,
    mode_create: PropTypes.bool,
    all_categories: PropTypes.array.isRequired,
    product: PropTypes.object,
    dispatch: PropTypes.func,
};

FormProduct.defaultProps = {
    mode_create: true,
}

export default FormProduct;
