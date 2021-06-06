import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FlashMessage = ( {message,success} ) => {

    const [open, setOpen] = useState(true);
    const vertical= 'top';
    const horizontal= 'center';

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="">
            <Snackbar anchorOrigin = {{vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose}   severity={success ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FlashMessage;