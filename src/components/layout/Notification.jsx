import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/uiSlice/uiSlice";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.ui.notification);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(uiActions.clearNotification());
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
          {notification.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
