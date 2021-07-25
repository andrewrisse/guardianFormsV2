import { withStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import theme from "../theme/theme";

export const styles = () => ({
  root: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
  },
});

export default withStyles(styles)(Toolbar);
