import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { obtenerComprobantes } from "../../service/service"
import { dispatches as dispatchesSnackbarAlert } from '../../components/snackbarAlert/actions';
import { useDispatch } from "react-redux";
import { message_types } from '../../utils/constants';
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Logo from "../../assets/img/logologin.png";
import Logodpy from "../../assets/img/logokiga.png";
import "../Login/login.scss";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function Consulta() {
    const navigate = useNavigate();
    const { snackBarOpen } = dispatchesSnackbarAlert(useDispatch());
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const initalValues = {
        timbrado: '',
        nroComprobante: '',
        tipoComprobante: '',
    };
    const [tipoComprobante, setTipoComprobante] = useState("1");

    const handleChange = (event) => {
        initalValues.tipoComprobante = event.target.value;
        setTipoComprobante(event.target.value);
    };

    /* se realiza la peticion para crear el usuario. */
    const submit = (data) => {
        setLoading(true);
        obtenerComprobantes(data).then(response => {
            setLoading(false);
            if (response.data[0].pdfLink === null) {
                snackBarOpen(message_types.ERROR, response.data[0].info);
            } else{
                download(response.data[0]);
            }
        }).catch(error => {
            setLoading(false);
            console.error(error);
            snackBarOpen(message_types.ERROR, error.error);
        });
    };

    const download = (data) => {
        setLoading(true);
        fetch(data.pdfLink).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = data.numeroComprobante;
                alink.click();
                setLoading(false);
                snackBarOpen(message_types.SUCCESS, "Se descargo el comprobante correctamente.");
            })
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
                                                <span>Factura <b>Electónica</b></span>
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
                                            timbrado: string().required("Campo Requerido."),
                                            nroComprobante: string().required("Campo Requerido."),
                                        })}
                                        onSubmit={(values, formikHelpers) => {
                                            values.tipoComprobante = tipoComprobante;
                                            console.log(values)
                                            submit(values);

                                        }}
                                    >
                                        {({ errors, isValid, touched, dirty }) => (

                                            <>
                                                <Form>
                                                    <Grid container spacing={2}>
                                                        <Grid item sm={12} xs={12}>
                                                            <Field
                                                                name="timbrado"
                                                                type="timbrado"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Nro. Timbrado"
                                                                fullWidth
                                                                error={Boolean(errors.timbrado) && Boolean(touched.timbrado)}
                                                                helperText={Boolean(touched.timbrado) && errors.timbrado}
                                                            />
                                                        </Grid>
                                                        <Grid item sm={12} xs={12}>
                                                            <Field
                                                                name="nroComprobante"
                                                                type="nroComprobante"
                                                                as={TextField}
                                                                variant="standard"
                                                                color="primary"
                                                                label="Nro. Comprobante"
                                                                fullWidth
                                                                error={Boolean(errors.nroComprobante) && Boolean(touched.nroComprobante)}
                                                                helperText={Boolean(touched.nroComprobante) && errors.nroComprobante} />
                                                        </Grid>
                                                        <Grid item sm={12} xs={12}>
                                                            <FormControl fullWidth variant="standard">
                                                                <InputLabel>Tipo Comprobante</InputLabel>
                                                                <Select
                                                                    name="tipoComprobante"
                                                                    value={tipoComprobante}
                                                                    onChange={handleChange}
                                                                >
                                                                    <MenuItem value={"1"}>Factura electrónica</MenuItem>
                                                                    <MenuItem value={"2"}>Factura electrónica de exportación (Futuro)</MenuItem>
                                                                    <MenuItem value={"4"}>Autofactura electrónica</MenuItem>
                                                                    <MenuItem value={"5"}>Nota de crédito electrónica</MenuItem>
                                                                    <MenuItem value={"6"}>Nota de débito electrónica</MenuItem>
                                                                    <MenuItem value={"7"}>Nota de remisión electrónica</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <LoadingButton
                                                        endIcon={<LocalPrintshopIcon />}
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
                                                        Descargar Factura
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