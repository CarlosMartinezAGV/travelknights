import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Alert, SpeedDialIcon } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
const theme = createTheme();

export default function Verified() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      //dispatch(forgotEmail(email));
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 3,
              color: "white",
              bgcolor: "black",
              width: 66,
              height: 66,
              fontSize: 54,
            }}
          >
            <MarkEmailReadIcon fontSize="70px" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Email Verified
          </Typography>
          <Typography
            component="h1"
            variant="body2"
            align="center"
            sx={{ m: 3 }}
          >
            Please use the link below to sign in to your account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Button
              style={{ backgroundColor: "#65743A" }}
              type="submit"
              variant="contained"
              href="/"
              sx={{
                mt: 3,
                mb: 2,
                height: 50,
                width: 500,
                textTransform: "none",
              }}
              onClick={handleClickOpen}
            >
              Go to Sign In page
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
