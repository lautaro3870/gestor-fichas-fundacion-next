'use client';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Tooltip,
  CardMedia,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

const pages = ['Nuevo proyecto', 'Areas', 'Personal'];

export default function NavigationBar() {
  const router = useRouter();

  const handleNavigation = (e: any) => {
    switch (e.target.innerText) {
      case 'PERSONAL':
        router.push('/personal');
        break;
      case 'AREAS':
        router.push('/areas');
        break;
      case 'NUEVO PROYECTO':
        router.push('/new-project');
        break;
    }
  };

  const handleLogout = () => {
    window.localStorage.setItem('token', '');
    router.push('/login');
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CardMedia
            component="img"
            image="https://fundacionbariloche.org.ar/wp-content/uploads/2023/09/LOGO-FB-WEB.png"
            alt="Fundación Bariloche Logo"
            sx={{
              height: '3rem',
              width: '10rem',
              marginRight: '3rem',
              cursor: 'pointer'
            }}
            onClick={() => {
              router.push('/proyectos');
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, display: 'block', color: 'black' }}
                onClick={(e) => handleNavigation(e)}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleLogout}>
              <Tooltip title="Logout">
                <LogoutIcon sx={{ p: 0 }} />
              </Tooltip>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
