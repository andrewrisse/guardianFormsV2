import React, { useState } from 'react';
import theme from '../theme/theme';

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from "./Logo";
import { useAuth0 } from '@auth0/auth0-react';

type DashboardNavbarProps = {
  onMobileNavOpen: () => void;
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
                                                           onMobileNavOpen
                                                         }) => {
  const {logout} = useAuth0();
  const [notifications] = useState([]);
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <IconButton aria-label="Guardian Forms Logo">
          <Logo />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {!hidden && (
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        )}
        <IconButton color="inherit" onClick={() => logout({returnTo: process.env.REACT_APP_HOME_URL})}>
          <InputIcon />
        </IconButton>

        {hidden && (
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
