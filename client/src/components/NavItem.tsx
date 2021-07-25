import React from 'react';
import { Button, ListItem } from '@material-ui/core';
import { matchPath, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';

type NavItemProps = {
  href: string;
  icon: any; // / TODO typing
  title: string;
};

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const { pathname } = useLocation();
  const active = href
    ? !!matchPath(
        href,
        pathname
      )
    : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
      {...rest}
    >
      <Link
        variant={'h6'}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main'
          }),
          '& svg': {
            mr: 1
          }
        }}
        href={href}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Link>
    </ListItem>
  );
};

export default NavItem;
