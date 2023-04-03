import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { dispatches } from "./actions";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarAlert() {
    const { open, message_type, message } = useSelector(state => state.snackbar);
    const { snackBarClose } = dispatches(useDispatch());

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        snackBarClose();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {message && message_type && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={message_type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}
        </Stack>
    );
}