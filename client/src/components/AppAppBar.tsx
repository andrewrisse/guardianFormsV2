import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import AppBar from './AppBar';
import theme from '../theme/theme';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  placeholder: toolbarStyles().root,
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.text.primary
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
}));

const AppAppBar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/dashboard"
          >
            {'GUARDIANFORMS'}
          </Link>
          <div className={classes.right}>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/dashboard"
            >
              {'Dashboard'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
};

export default AppAppBar;
