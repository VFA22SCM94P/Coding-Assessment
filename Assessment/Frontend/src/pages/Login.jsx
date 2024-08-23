import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginApi } from '../services/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const userLogin = {
          username: data.get('username'),
          password: data.get('password'),
          role: data.get('role')
        };
        await LoginApi(userLogin).then((data) => {
            console.log("data",data.data);
            if( data.data.message == "Login successful"){
            navigate('/',{ state:{
                user: data.data.user.username,
                role: data.data.user.role,
                userid: data.data.user.id
            }
            })
        }
            
        })
      };
      const [role, setRole] = React.useState('');

      const handleChange = (event) => {
        setRole(event.target.value);
      };
const defaultTheme = createTheme();

    return (<>
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <div className='d-flex justify-content-end align-items-end mt-2 mb-0'>
                    <Button variant="outlined" size="small" onClick={() => {
          navigate("/")
        }} >
          Home
        </Button>
        </div>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /><InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={role}
    label="Role"
    name='role'
    onChange={handleChange}
    fullWidth
  >
    <MenuItem value={'admin'}>Admin</MenuItem>
    <MenuItem value={'blogger'}>Blogger</MenuItem>
  </Select>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/create-account" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
        </>
    );
};

export default Login;