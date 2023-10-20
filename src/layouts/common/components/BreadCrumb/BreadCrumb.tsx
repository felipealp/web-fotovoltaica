import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Breadcrumbs, Link } from '@material-ui/core';

const BreadCrumb = ({ items = [], name = 'placeholder text' }: any) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container>
      <Grid item container alignItems={'center'} xs={12} md={12}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Breadcrumbs aria-label="breadcrumb">
            {items.map((item: IBreadCrumb, i: any) => {
              return (
                <Link underline="hover" color="inherit" href={item.url} key={i}>
                  {item.title}
                </Link>
              );
            })}
            <Typography color="text.primary">{name}</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
    </Grid>
  );
};

BreadCrumb.propTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.node.isRequired,
};

export default BreadCrumb;

export interface IBreadCrumb {
  title: string;
  url: string;
}
