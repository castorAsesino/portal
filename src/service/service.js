import axios from 'axios';

/* se obtiene el location de la url */
const location = window.location.origin;
let baseURL = process.env.REACT_APP_API_URL;


/* se configura la cabecera para que axios pueda realizar las peticiones utilizando el token correspondiente */
if (location.includes("modiga")) {
    baseURL = process.env.REACT_APP_API_URL;
} else if (location.includes("antell")) {
    baseURL = process.env.REACT_APP_API_URL_ANTELL;
}
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-type': 'application/json'
    }
});

instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
});

instance.interceptors.response.use(response => {
    return response;
}, error => {

    return Promise.reject(error.response.data);
});

export const signup = (data) => {
    return instance.post('/login', data)
        .then((response) => {
            /* se almacenan los datos del usuario logueado en el localstorage */
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isLoggin', true);
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        });

};

export const getUserInfo = (token) => {
    return instance.get(`/usuarios/consultausuario?accessToken=${token}`);
}

export const getListaComprobantes = (idEmpresa, ruc) => {
    return instance.get(`/comprobantes/consultacomprobanteempresaruc?idEmpresa=${idEmpresa}&ruc=${ruc}`);
}

export const crearUsuario = (body) => {
    return instance.post(`/usuarios`, body);
}

export const obtenerComprobantes = (body) => {
    return instance.get(`/comprobantes/consultaportal?nrocomprobante=${body.nroComprobante}&nrotimbrado=${body.timbrado}&tipoComprobante=${body.tipoComprobante}`);
}

