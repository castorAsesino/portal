import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../../service/service"
import React, { useEffect, useContext } from "react";
import { UserInfoContext } from "../../service/UserInfoContext";
import { dispatches as dispatchesSnackbarAlert } from '../../components/snackbarAlert/actions';
import { useDispatch } from "react-redux";
import { message_types } from '../../utils/constants';
import { useLocation } from "react-router-dom";



export default function RedirectAccessToken({ match, location }) {
    const navigate = useNavigate();
    const userInfoContext = useContext(UserInfoContext);
    const { snackBarOpen } = dispatchesSnackbarAlert(useDispatch());
    let query = useQuery();

    useEffect(() => {
        /* se obtiene el token del query param, y se verifica que sea un token valido */
        let token = query.get("token");
        let ruc = query.get("ruc");

        if (token !== null) {
            localStorage.clear();
            localStorage.setItem('accessToken', token);
            localStorage.setItem('isLoggin', true);
            getUserInfo(token).then(response => {
                /* si el token es valido, se redirecciona al listado de facturas */
                localStorage.setItem('user', JSON.stringify(response.data[0]));
                userInfoContext.update({ ...response.data[0] });
                navigate(`/listacomprobantes?ruc=${ruc}`);
            }).catch(error => {
                /* si el token es invalido, se redirecciona al login  */
                console.error(error);
                snackBarOpen(message_types.ERROR, 'Token inválido.');
                navigate('/');

            })
        }
    }, []);


    return (null)
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function useQuery2() {
    return new URLSearchParams(window.location.search);
}