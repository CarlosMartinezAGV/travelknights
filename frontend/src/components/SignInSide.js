import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import ri from '../images/randomimage';
import Logo from '../images/logo.png';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/posts';
import { createUser } from '../actions/posts';
import { googcreateUser } from '../actions/posts';
import { googgetUser } from '../actions/posts';
import { waitUntil } from 'async-wait-until';
import { sizeHeight } from '@mui/system';

const theme = createTheme();
var response = 'A';
export default function SignInSide() {
  var changeThis = document.getElementsByClassName('loginresponse');

  const loginresult = '';
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  //console.log(user);

  function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    const googuser = { email: '', password: '' };
    //console.log(userObject);
    googuser.email = userObject.email;
    googuser.password = userObject?.sub;
    googuser.name = userObject.name;
    googuser.emailVerified = true;
    //googuser.verified = true;
    console.log(googuser); //jti is token

    dispatch(getUser(googuser));

    setTimeout(() => {
      const checkuser = JSON.parse(localStorage.getItem('profile'));
      console.log(checkuser);

      //dispatch(createUser(googuser));

      if (checkuser.payload.user == null) {
        dispatch(createUser(googuser));
        setTimeout(() => {
          dispatch(getUser(googuser));
          setTimeout(() => {
            dispatch(getUser(googuser));

            const checkuser2 = JSON.parse(localStorage.getItem('profile'));
            console.log(checkuser2);
            if (checkuser2.payload.user != null) {
              navigate('/Map');
            }
          }, 500);
        }, 500);
      } else if (checkuser.payload.user) {
        //console.log(checkuser.payload);
        navigate('/Map');
      } else {
        console.log('Else');
        console.log(checkuser.payload);
        response = checkuser.payload;

        changeThis[0].innerHTML = response;

        //figure out how to update and send to div
      }
    }, 500);

    /*
    setTimeout(() => {
      const checkuser = JSON.parse(localStorage.getItem("profile"));
      console.log(checkuser);

      if (checkuser.payload == "*User is not registered*") {
        console.log("no user");
        dispatch(googcreateUser(googuser));
        setTimeout(() => {
          if (checkuser.payload != "*User is not registered*") {
            dispatch(getUser(googuser));
          }
        }, 1000);
      } else if (checkuser.payload.user) {
        //console.log(checkuser.payload);
        navigate("/Map");
      } else {
        console.log("Else");
        console.log(checkuser.payload);
        response = checkuser.payload;

        changeThis[0].innerHTML = response;

        //figure out how to update and send to div
      }
    }, 1000);
*/
    /*
    setUser(userObject);
    try {
      dispatch({ type: "AUTH", data: { result } });

      navigate("/Map");
    } catch (error) {
      console.log(error);
    }
*/
    //implement signin logic like getuser and set user for google
    //users.js has to have a new function for google signin
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '527171615531-lir17eijsj2fi41toef1ro3gauenpdnh.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      alignItems: 'center',
      width: 400,
    });
  }, []);

  const randomImage = ri[Math.floor(Math.random() * ri.length - 1)];
  const navigate = useNavigate();
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );
  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = (googleData) => {
    alert(googleData);
  };
  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newuser = { email: '', password: '' };
    newuser.email = data.get('email');
    newuser.password = data.get('password');
    //console.log(newuser);

    dispatch(getUser(newuser));
    setTimeout(() => {
      const checkuser = JSON.parse(localStorage.getItem('profile'));
      console.log(checkuser);

      if (checkuser == null) {
        if (checkuser.payload != null) console.log(checkuser.payload);

        console.log('payload is not null ');
        console.log(checkuser);
      } else if (checkuser.payload.user) {
        //console.log(checkuser.payload);
        navigate('/Map');
      } else {
        console.log('Else');
        console.log(checkuser.payload);
        response = checkuser.payload;

        changeThis[0].innerHTML = response;

        //figure out how to update and send to div
      }
    }, 1000); //Waits a little bit to grab user
  };

  const clicktest = async (event) => {
    const checkuser = JSON.parse(localStorage.getItem('profile'));
    console.log(checkuser);
  };

  function check() {
    const checkuser = JSON.parse(localStorage.getItem('profile'));
    const qwe = JSON.parse(localStorage.getItem('profile'));
    console.log(qwe);
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          sx={{ backgroundColor: '#f8f4e3' }}
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
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
                  justify='center'
                  align='center'
                  sx={{ mt: 0, mb: 0 }}
                  className='loginresponse'
                ></Typography>
              </Box>
              <Button
                style={{ backgroundColor: '#65743A' }}
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href='Forgot' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='SignUp' variant='body2'>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 3, mb: 3 }}>
                <Grid item xs={5} sm={5} md={5}>
                  <ColoredLine color='#666666' />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Typography color='#666666'>OR</Typography>
                  </Box>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <ColoredLine color='#666666' />
                </Grid>
              </Grid>
              <Grid
                container
                display='flex'
                style={{ alignItems: 'center' }}
                justifyContent='center'
              >
                <div
                  justify='center'
                  style={{ alignItems: 'center' }}
                  id='signInDiv'
                  data-width='328'
                ></div>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}