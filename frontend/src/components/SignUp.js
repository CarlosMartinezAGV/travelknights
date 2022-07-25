import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createUser } from '../actions/posts';
var response = '';
const theme = createTheme();
export default function SignUp() {
  var changeThis = document.getElementsByClassName('signupresponse');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData(event.currentTarget);
    console.log({
      email: user.get('email'),
      password: user.get('password'),
      name: user.get('name'),
    });
    //using user results in empty req.body
    const newuser = { name: '', email: '', phone: '', password: '' };
    newuser.name = user.get('name');
    newuser.email = user.get('email');
    newuser.password = user.get('password');

    if (newuser.password == user.get('confirmpassword')) {
      console.log('passwords match');
      dispatch(createUser(newuser));
      handleClickOpen();
      changeThis[0].innerHTML = '';
    } else {
      console.log('passwords dont match');
      changeThis[0].innerHTML = '*Passwords do not match*';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: '#f8f4e3',
              width: 120,
              height: 120,
              fontSize: 70,
            }}
          >
            <img src={Logo} alt='Logo' height='70' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmpassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmpassword'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              style={{ backgroundColor: '#65743A' }}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              //onClick={handleClickOpen}
            >
              Sign Up
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              onBackdropClick={false}
              PaperProps={{ sx: { bottom: 200 } }}
            >
              <DialogContent>
                <DialogContentText component='h1' variant='h5'>
                  We have sent you a link to the email provided. Please check
                  you email to finish setting up your account
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>OK</Button>
              </DialogActions>
            </Dialog>

            <Box display='flex' justifyContent='center' alignItems='center'>
              <Link href='/' variant='body2' sx={{ mt: 3 }}>
                Already have an account? Sign in
              </Link>
            </Box>
            <Box
              sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                style={{ color: 'red' }}
                justifyContent='center'
                align='center'
                sx={{ mt: 0, mb: 0 }}
                className='signupresponse'
              ></Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
