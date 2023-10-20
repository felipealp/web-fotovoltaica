/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, LinearProgress, Link } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core';

class Processing extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  render() {
    return (

      <Box marginBottom={4}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={2}
        >
          <Box
            width={'100%'}
            height={'100%'}
            marginBottom={2}
            bgcolor={alpha(this.props.theme.palette.primary.main, 0.0)}
            color={this.props.theme.palette.primary.main}
          >
            <LinearProgress />
          </Box>
        </Box>
        
        <Typography
          variant={'h4'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          Please wait a moment while we validate your code
        </Typography>
        <Box marginTop={10} display={'flex'} justifyContent={'center'}>
          <Button
            size={'large'}
            variant={'outlined'}
            component={Link}
            href={'/'}
          >
            Back to home page
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Processing;

interface IProps {
  theme: Theme;
}
