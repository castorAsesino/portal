
import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { signup, getUserInfo } from "../../service/service"
import { dispatches as dispatchesSnackbarAlert } from '../../components/snackbarAlert/actions';
import { useDispatch } from "react-redux";
import { message_types } from '../../utils/constants';
import { UserInfoContext } from "../../service/UserInfoContext";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Logo from "../../assets/img/logologin.png";
import Logodpy from "../../assets/img/logokiga.png";
import "./login.scss";

import Box from '@mui/material/Box';


const initalValues = {
    username: "",
    password: "",
};


export default function Login() {
    const navigate = useNavigate();
    const { snackBarOpen } = dispatchesSnackbarAlert(useDispatch());
    const theme = useTheme();
    const userInfoContext = useContext(UserInfoContext);
    const [loading, setLoading] = useState(false);
    const location = window.location.origin;

    /* se almacenan las credenciales del usuario logueado en el localStorage, una vez que este inicia sesion */
    const submit = (data) => {
        setLoading(true);
        signup(data).then(response => {
            localStorage.clear();
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('isLoggin', true);
            userInfo();
        }).catch(error => {
            setLoading(false);
            console.error(error);
            snackBarOpen(message_types.ERROR, error.error);
        });
    };

    /* se realiza la peticion para obtiener los datos del usuario */
    const userInfo = () => {

        getUserInfo(localStorage.getItem('accessToken')).then(response => {
            setLoading(false);
            localStorage.setItem('user', JSON.stringify(response.data[0]));
            userInfoContext.update({ ...response.data[0] });
            if (location.includes("modiga")) {
                navigate('/listacomprobantes');
            } else if (location.includes("antell")) {
                navigate('/listacomprobantes');
            }
        }).catch(error => {
            setLoading(false);
            console.error(error);
        })
    }


    return (
        <>

            <div className="container px-md-5 px-lg-1 px-xl-5 py-3 mx-auto pt-5 mt-5" >
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1">
                                <div className="row  pt-3">
                                    <img src={Logodpy} alt="Logodpy" className="logodpy" />
                                </div>
                                <div className="row px-3 justify-content-center mt-4 mb-5 border-line hidden-mobile" >
                                    <img src={Logo} alt="logo" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card2 card border-0 px-4 py-5">

                                <div className="row px-3 mb-4" >

                                    <div className="row">
                                        <div className="col-sm hidden-mobile">
                                            <div className="line"></div>
                                        </div>
                                        <div className="col-sm" style={{ marginTop: '-2.5rem' }}>
                                            <div className="logo text-center text-lg-left">
                                                <span>Portal de <b>Facturación Electónica</b></span>
                                            </div>
                                        </div>
                                        <div className="col-sm hidden-mobile">
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-3 form-size">
                                    <div className="text-center text-lg-center">
                                        <img src={theme.status.imgLogin} alt="" sx={{ display: { xs: 'none', md: 'flex' } }} />
                                    </div>
                                    <Formik
                                        initialValues={initalValues}
                                        validationSchema={object({
                                            username: string().required(""),
                                            password: string().required(""),
                                        })}
                                        onSubmit={(values, formikHelpers) => {
                                            submit(values);

                                        }}
                                    >
                                        {({ errors, isValid, touched, dirty }) => (
                                            <Form>
                                                <Field
                                                    name="username"
                                                    type="username"
                                                    as={TextField}
                                                    variant="standard"
                                                    color="primary"
                                                    label="Usuario"
                                                    fullWidth
                                                    error={Boolean(errors.username) && Boolean(touched.username)}
                                                    helperText={Boolean(touched.username) && errors.username}
                                                />
                                                <Box height={14} />
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    as={TextField}
                                                    variant="standard"
                                                    color="primary"
                                                    label="Contraseña"
                                                    fullWidth
                                                    error={Boolean(errors.password) && Boolean(touched.password)}
                                                    helperText={Boolean(touched.password) && errors.password}
                                                />
                                                <Box height={14} />

                                                <LoadingButton
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    disabled={!isValid || !dirty}
                                                    loading={loading}
                                                    sx={{
                                                        py: '0.8rem',
                                                        mt: 3,
                                                        width: '100%',
                                                        marginInline: 'auto',
                                                        color: '#fff',
                                                        padding: '8px'
                                                    }}
                                                >
                                                    Ingresar
                                                </LoadingButton>
                                                <Grid container>
                                                    <Grid item xs>
                                                    </Grid>
                                                    <Grid item>
                                                        <Link href="#" variant="body2" onClick={() => navigate('/registrarme')}>
                                                            {'Registrarme'}
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue py-4" style={{ background: theme.palette.primary.main }}>
                        <div className="row px-3 center-mobile">
                            <small className="ml-4 ml-sm-5 mb-2"><span style={{ fontWeight: 100 }}>&copy; 2022 DPY. Asunción, Paraguay. Powered by</span> <a href="https://www.kiga.com.py/">kiga</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}