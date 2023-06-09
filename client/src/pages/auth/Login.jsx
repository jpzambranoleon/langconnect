import { Google, LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { publicRequest } from "../../requestMethods";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../redux/userSlice";
import { InfoContext } from "../../utils/InfoProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const { setStatus } = useContext(InfoContext);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginRequest());
      const response = await publicRequest.post("/auth/login", {
        email,
        password,
      });
      dispatch(loginSuccess(response.data.user));
      navigate("/");
    } catch (error) {
      let message = error.response
        ? error.response.data.message
        : error.message;
      setStatus({ open: true, message: message, severity: "error" });
      dispatch(loginFailure());
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <Container maxWidth="xs">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disableElevation
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              onClick={handleLogin}
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
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }}>
              <Typography fontSize="14px">OR</Typography>
            </Divider>
            <Button
              disableElevation
              startIcon={<Google />}
              fullWidth
              variant="outlined"
            >
              Continue with Google
            </Button>
          </Container>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
