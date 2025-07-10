'use client';
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material';
import LoginHook from './hooks/LoginHook';

export default function Login() {
  const { email, setEmail, password, setPassword, login, loading } =
    LoginHook();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CardMedia
        component="img"
        image="https://fundacionbariloche.org.ar/wp-content/uploads/2023/09/LOGO-FB-WEB.png"
        alt="Fundación Bariloche Logo"
        sx={{
          height: '4rem',
          width: '17rem',
          mb: 4,
        }}
      />
      <FormControl sx={{ width: '20rem' }}>
        <TextField
          id="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size='small'
        />
        <br />
      </FormControl>
      <FormControl sx={{ width: '20rem' }}>
        <TextField
          type="password"
          id="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              login();
            }
          }}
          size='small'
        />
        <br />
      </FormControl>
      <Button variant="contained" onClick={login}>
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <span>Login</span>
        )}
      </Button>
    </Box>
  );
}
