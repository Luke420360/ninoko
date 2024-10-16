import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Info, Work, ContactMail, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { title: 'Home', path: '/', icon: <Home /> },
    { title: 'About', path: '/about', icon: <Info /> },
    { title: 'Services', path: '/services', icon: <Work /> },
    { title: 'Contact', path: '/contact', icon: <ContactMail /> },
    { title: 'Register', path: '/register', icon: <ContactMail /> },
    { title: 'Login', path: '/login', icon: <ContactMail /> }
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        className="md:hidden"
      >
        <Menu />
      </IconButton>

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <div className="w-64" role="presentation" onClick={toggleDrawer}>
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index} component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
