import { Snackbar, Alert } from "@mui/material";

interface SnackbarNotificationProps {
    open: boolean;
    message: string;
    severity: "success" | "error";
    onClose: () => void;
}

export function SnackbarNotification({
                                         open,
                                         message,
                                         severity,
                                         onClose,
                                     }: SnackbarNotificationProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
