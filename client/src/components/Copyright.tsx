import React from 'react';
import Image from "material-ui-image";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  centeredFlexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftMargin: {
    marginLeft: '0.5rem',
  }
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.centeredFlexBox}
      >
        {'Created by AFOTEC'}

        <span className={clsx(classes.centeredFlexBox, classes.leftMargin)}>
          <Image
            src="/static/afotec.png"
            alt="AFOTEC Logo"
            width={35}
            height={35}
          />
        </span>
      </Typography>
    </div>
  );
}
