import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { crearUsuario } from "../../service/service"
import { dispatches as dispatchesSnackbarAlert } from '../../components/snackbarAlert/actions';
import { useDispatch } from "react-redux";
import { message_types } from '../../utils/constants';
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Logo from "../../assets/img/logologin.png";
import Logodpy from "../../assets/img/logokiga.png";
import "../Login/login.scss";

export default function SignUp() {
    const navigate = useNavigate();
    const { snackBarOpen } = dispatchesSnackbarAlert(useDispatch());
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const location = window.location.origin;
    const [idEmpresa, setIdEmpresa] = useState(null);
    /* regex para validar ruc ej. 5209665-1 */
    const validationRegex = new RegExp(/(^[0-9]{6,7}(-[0-9]{1})?$)/g);
    /* se obtiene de la URL el nombre de la empresa */
    const pathEmpresa = `${window.location.origin}`.substring(8).split('.');
    const initalValues = {
        username: '',
        password: '',
        nombre: '',
        apellido: '',
        email: '',
        ruc: '',
        empresa: pathEmpresa[0]
    };

    useEffect(() => {
        if (location.includes("modiga")) {
            setIdEmpresa(64);
        } else if (location.includes("antell")) {
            setIdEmpresa(50);
        }
      }, []);
    
    /* se realiza la peticion para crear el usuario. */
    const submit = (data) => {
        setLoading(true);
        let user = {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            usuario: {
                roles: [{ id: 1 }],
                username: data.username,
                password: data.password,
                activo: true,
                personalizado: false
            },
            empresa: { id: idEmpresa },
            ruc: data.ruc
        }
        crearUsuario(user).then(response => {
            setLoading(false);
            snackBarOpen(message_types.SUCCESS, "Se creó el usuario correctamente.");
        }).catch(error => {
            setLoading(false);
            console.error(error);
            snackBarOpen(message_types.ERROR, error.error);
        });
    };




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
                                            nombre: string().required("Campo Requerido."),
                                            apellido: string().required("Campo Requerido."),
                                            username: string().required("Campo Requerido."),
                                            password: string().required("Campo Requerido."),
                                            email: string().required("Campo Requerido.").email("Ingrese un email válido."),
                                            ruc: string()
                                                .min(7, "Ruc inválido.")
                                                .required("Campo Requerido")
                                                .matches(validationRegex, "Ruc inválido.")

                                        })}
                                        onSubmit={(values, formikHelpers) => {
                                            console.log(values)
                                            submit(values);

                                        }}
                                    >
                                        {({ errors, isValid, touched, dirty }) => (

                                            <>
                                                <Form>
                                                    <Grid container spacing={2}>
                                                        <Grid item sm={6} xs={12}>
                                                            <Field
                                                                name="nombre"
                                                                type="nombre"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Nombre"
                                                                fullWidth
                                                                error={Boolean(errors.nombre) && Boolean(touched.nombre)}
                                                                helperText={Boolean(touched.nombre) && errors.nombre} />
                                                        </Grid>
                                                        <Grid item sm={6} xs={12}>
                                                            <Field
                                                                name="apellido"
                                                                type="apellido"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Apellido"
                                                                fullWidth
                                                                error={Boolean(errors.apellido) && Boolean(touched.apellido)}
                                                                helperText={Boolean(touched.apellido) && errors.apellido} />
                                                        </Grid>
                                                        <Grid item sm={6} xs={12}>
                                                            <Field
                                                                name="username"
                                                                type="username"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Usuario"
                                                                fullWidth
                                                                error={Boolean(errors.username) && Boolean(touched.username)}
                                                                helperText={Boolean(touched.username) && errors.username} />
                                                        </Grid>
                                                        <Grid item sm={6} xs={12}>
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
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Field
                                                                name="email"
                                                                type="email"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Correo electrónico"
                                                                fullWidth
                                                                error={Boolean(errors.email) && Boolean(touched.email)}
                                                                helperText={Boolean(touched.email) && errors.email} />
                                                        </Grid>
                                                        <Grid item sm={6} xs={12}>
                                                            <Field
                                                                name="ruc"
                                                                type="ruc"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Ruc"
                                                                fullWidth
                                                                error={Boolean(errors.ruc) && Boolean(touched.ruc)}
                                                                helperText={Boolean(touched.ruc) && errors.ruc} />
                                                        </Grid>

                                                        <Grid item sm={6} xs={12}>
                                                            <Field
                                                                disabled
                                                                name="empresa"
                                                                type="empresa"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Empresa"
                                                                fullWidth
                                                                error={Boolean(errors.empresa) && Boolean(touched.empresa)}
                                                                helperText={Boolean(touched.empresa) && errors.empresa} />
                                                        </Grid>
                                                    </Grid>
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
                                                        Guardar
                                                    </LoadingButton>
                                                    <Grid container>
                                                        <Grid item xs>
                                                        </Grid>
                                                        <Grid item>
                                                            <Link href="#" variant="body2" onClick={() => navigate('/')}>
                                                                {'Iniciar Sesión'}
                                                            </Link>
                                                        </Grid>
                                                    </Grid>

                                                </Form>

                                            </>
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