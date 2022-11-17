import React from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// Local imports
import { uiActions } from "../../redux/uiSlice/uiSlice";
// Mui imports
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { RootState } from "../../redux/store";

type AlertProps = {
  children: string;
  onClose: any;
  severity: any;
  sx: { width: string };
};

const Alert = React.forwardRef(function Alert(props: AlertProps, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref as React.RefObject<HTMLDivElement>}
      variant="filled"
      {...props}
    >
      {props.children}
    </MuiAlert>
  );
});

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const CustomizedSnackbars: React.FC<null> = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.ui.notification);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(uiActions.clearNotification(null));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={notification.message}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity={notification.level}
          sx={{ width: "100%" }}
        >
          {notification.message as string}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
