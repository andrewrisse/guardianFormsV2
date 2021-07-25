import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import theme from "../theme/theme";

const styles = () => ({
  root: {
    color: theme.palette.text.primary,
  }
});

type AppBarProps = { classes: { [key: string]: any } };

const AppBar: FC<AppBarProps> = (props) => {
  return <MuiAppBar elevation={0} position="static" {...props} />;
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBar);
