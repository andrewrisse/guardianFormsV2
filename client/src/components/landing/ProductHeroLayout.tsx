import React, {ReactNode, FC} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import theme from "../../theme/theme";

const useStyles = makeStyles(() => ({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
}));

type ProductHeroLayoutProps = {
    backgroundClassName: string,
    children: ReactNode,
}
const ProductHeroLayout: FC<ProductHeroLayoutProps> = (props) => {
    const { backgroundClassName, children } = props;
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                {children}
                <div className={classes.backdrop} />
                <div className={clsx(classes.background, backgroundClassName)} />

            </Container>
        </section>
    );
}



export default ProductHeroLayout;
