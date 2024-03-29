/*
  1. Only submit on valid input fields. DONE!
  2. Red outlines for missing input fields. DONE!
  3. Better modal for confirmation on submit.
  4. Add ErrorOutlineOutlinedIcon to inputadornment??? when error 
  5. Fix useState error attribute for textfields. Only accepting 1 char at a time 
      for email
*/

import React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { alpha, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../images/logo.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { createUser } from '../actions/posts';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const theme = createTheme();

export default function SignUp() {
  var changeThis = document.getElementsByClassName('signupresponse');
  const [open, setOpen] = React.useState(false);
  const [text1, setText1] = React.useState('');
  const [text2, setText2] = React.useState('');
  const [text3, setText3] = React.useState('');
  const [text4, setText4] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData(event.currentTarget);

    console.log(event.currentTarget.email);
    //using user results in empty req.body
    const newuser = { name: '', email: '', phone: '', password: '' };
    newuser.name = user.get('name').trim();
    newuser.email = user.get('email').trim();
    newuser.password = user.get('password').trim();
    newuser.confirmPassword = user.get('confirmpassword').trim();

    if (
      newuser.name.length > 0 &&
      newuser.email.length > 0 &&
      newuser.password.length > 0 &&
      newuser.password === user.get('confirmpassword').trim()
    ) {
      dispatch(createUser(newuser));
      changeThis[0].innerHTML = ' ';

      handleClickOpen();
    } else {
      if (
        newuser.name.length === 0 ||
        newuser.email.length === 0 ||
        newuser.password.length === 0 ||
        newuser.confirmPassword.length === 0
      ) {
        if (newuser.name.length === 0) {
          // document.getElementById('name').required = 'required';
          // document.querySelector('label[for="name"]').textContent =
          //   'Full Name *';
          // document.querySelector('label[for="name"]').style.color = 'red';
        }
        if (newuser.email.length === 0) {
          // document.getElementById('email').required = 'required';
          // document.querySelector('label[for="email"]').textContent =
          //   'Email Address *';
          // document.querySelector('label[for="email"]').style.color = 'red';
        }
        if (newuser.password.length === 0) {
          // document.getElementById('password').required = 'required';
          // document.querySelector('label[for="password"]').textContent =
          //   'Password *';
          // document.querySelector('label[for="password"]').style.color = 'red';
        }
        if (newuser.confirmPassword.length === 0) {
          // document.getElementById('confirmpassword').required = 'required';
          // document.querySelector('label[for="confirmpassword"]').textContent =
          //   'Confirm Password *';
          // document.querySelector('label[for="confirmpassword"]').style.color =
          //   'red';
        }

        changeThis[0].innerHTML = '* Please fill in required text *';
      } else if (newuser.password !== newuser.confirmPassword)
        changeThis[0].innerHTML = '* Passwords do not match *';
    }
  };

  // const ValidationTextField = styled(TextField)({
  //   '& input:valid:placeholder-shown + fieldset': {
  //     borderColor: '#1976d2',
  //     borderWidth: '1.3px',
  //   },
  //   '& input:valid:not(:placeholder-shown) + fieldset': {
  //     borderColor: '#1976d2',
  //     borderWidth: '1.3px',
  //   },
  //   '& input:empty + fieldset': {
  //     borderColor: 'red',
  //     borderWidth: '1.3px',
  //   },
  //   '& input:invalid:hover + fieldset': {
  //     borderColor: 'red',
  //     borderWidth: '2.5px',
  //   },
  //   '& input:invalid:focus + fieldset': {
  //     borderColor: 'red',
  //     borderWidth: '2.5px',
  //   },
  //   '& input:valid:hover + fieldset': {
  //     borderWidth: '2.5px',
  //   },
  // });

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
                {/* <ValidationTextField */}
                <TextField
                  key='text1'
                  fullWidth
                  name='name'
                  label='Full Name'
                  id='name'
                  autoFocus
                  placeholder=' '
                  variant='outlined'
                  // onChange={(e) => setText1(e.target.value)}
                  // value={text1}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <ValidationTextField */}
                <TextField
                  key='text2'
                  fullWidth
                  id='email'
                  // type='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  placeholder=' '
                  // onChange={(e) => setText2(e.target.value)}
                  // value={text2}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <ValidationTextField */}
                <TextField
                  key='text3'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  inputProps={{ minLength: 3 }}
                  placeholder=' '
                  // onChange={(e) => setText3(e.target.value)}
                  // value={text3}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <ValidationTextField */}
                <TextField
                  key='text4'
                  fullWidth
                  name='confirmpassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmpassword'
                  autoComplete='new-password'
                  inputProps={{ minLength: 3 }}
                  placeholder=' '
                  // onChange={(e) => setText4(e.target.value)}
                  // value={text4}
                />
              </Grid>
            </Grid>

            <Container>
              <Typography
                style={{ color: 'red' }}
                justifyContent='center'
                align='center'
                sx={{ mt: 1, mb: 0 }}
                className='signupresponse'
              ></Typography>
            </Container>

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
            ></Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
