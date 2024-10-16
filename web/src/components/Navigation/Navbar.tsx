import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Links to be shown in the navbar
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' },
    { title: 'Logout', path: '/login' }
  ];

  // Drawer for mobile view
  const drawer = (
    <div className="w-64">
      <IconButton onClick={handleDrawerToggle} className="m-2">
        <CloseIcon />
      </IconButton>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} component={Link} to={item.path} onClick={handleDrawerToggle}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="sticky" className="bg-ultraviolett">
      <Toolbar className="flex justify-between">
        {/* Logo or Brand Name */}
        <Typography variant="h6" component={Link} to="/" className="text-white font-bold">
          Ninoko
        </Typography>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((item) => (
            <Button key={item.title} color="inherit" component={Link} to={item.path}>
              {item.title}
            </Button>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          className="md:hidden"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="md:hidden"
        PaperProps={{ className: 'bg-white' }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
