import React, {useEffect} from "react";
// @material-ui/core components
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import {connect, useDispatch} from "react-redux";
import {loginAction, socialLoginAction} from "../../redux/UserDucks";
import {withRouter} from "react-router-dom";
import {GoogleLogin} from 'react-google-login';
import {useForm} from "../../hooks/useForm";
import {useValidationErrorsForm} from "../../hooks/useValidationErrorsForm";

const useStyles = makeStyles(componentStyles);

function Login({access_token, history, user}) {
    useEffect(() => {
        if (access_token) {
            history.push('/admin');
        }
    }, [access_token]);

    const {formData, handleInputChange, handleSubmit} = useForm(
        {
            email: "",
            password: "",
        },
        () => dispatch(loginAction(email, password))
    );


    const {email, password} = formData;

    const test =useValidationErrorsForm(user);
debugger;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const responseGoogle = ({accessToken}) => {
        dispatch(socialLoginAction('google', accessToken))
    }

    return (
        <>
            <Grid item xs={12} lg={5} md={7}>
                <Card classes={{root: classes.cardRoot}}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={
                            <Box
                                fontSize="80%"
                                fontWeight="400"
                                component="small"
                                color={theme.palette.gray[600]}
                            >
                                Sign in with
                            </Box>
                        }
                        titleTypographyProps={{
                            component: Box,
                            textAlign: "center",
                            marginBottom: "1rem!important",
                            marginTop: ".5rem!important",
                            fontSize: "1rem!important",
                        }}
                        subheader={
                            <Box textAlign="center">
                                <Box
                                    component={Button}
                                    variant="contained"
                                    marginRight=".5rem!important"
                                    classes={{root: classes.buttonRoot}}
                                >
                                    <Box component="span" marginRight="4px">
                                        <Box
                                            alt="..."
                                            component="img"
                                            width="20px"
                                            className={classes.buttonImg}
                                            src={
                                                require("assets/img/icons/common/github.svg").default
                                            }
                                        ></Box>
                                    </Box>
                                    <Box component="span" marginLeft=".75rem">
                                        Github
                                    </Box>
                                </Box>
                                {/*<Button
                                    variant="contained"
                                    classes={{root: classes.buttonRoot}}
                                >
                                    <Box component="span" marginRight="4px">
                                        <Box
                                            alt="..."
                                            component="img"
                                            width="20px"
                                            className={classes.buttonImg}
                                            src={
                                                require("assets/img/icons/common/google.svg").default
                                            }
                                        ></Box>
                                    </Box>
                                    <Box component="span" marginLeft=".75rem">
                                        Google
                                    </Box>
                                </Button>*/}
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_API_GOOGLE_LOGIN}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Box>
                        }
                    ></CardHeader>
                    <CardContent classes={{root: classes.cardContent}}>
                        <Box
                            color={theme.palette.gray[600]}
                            textAlign="center"
                            marginBottom="1rem"
                            marginTop=".5rem"
                            fontSize="1rem"
                        >
                            <Box fontSize="80%" fontWeight="400" component="small">
                                Or sign in with credentials
                            </Box>
                        </Box>
                        <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <FilledInput
                                name="email"
                                onChange={handleInputChange}
                                autoComplete="off"
                                type="email"
                                placeholder="Email"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Email/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <FilledInput
                                name="password"
                                onChange={handleInputChange}
                                autoComplete="off"
                                type="password"
                                placeholder="Password"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary"/>}
                            label="Remeber me"
                            labelPlacement="end"
                            classes={{
                                root: classes.formControlLabelRoot,
                                label: classes.formControlLabelLabel,
                            }}
                        />
                        <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                            <Button onClick={handleSubmit} color="primary"
                                    variant="contained">
                                Sign in
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Grid container component={Box} marginTop="1rem">
                    <Grid item xs={6} component={Box} textAlign="left">
                        <a
                            href="#admui"
                            onClick={(e) => e.preventDefault()}
                            className={classes.footerLinks}
                        >
                            Forgot password
                        </a>
                    </Grid>
                    <Grid item xs={6} component={Box} textAlign="right">
                        <a
                            href="#admui"
                            onClick={(e) => e.preventDefault()}
                            className={classes.footerLinks}
                        >
                            Create new account
                        </a>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

function mapState(state) {
    return {
        access_token: state.user.accessToken,
        user: state.user,
    }
}

export default withRouter(connect(mapState)(Login));
