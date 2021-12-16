/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { alpha } from '@material-ui/core';

class Success extends React.Component<IProps, {}> {
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
            component={Avatar}
            width={'100%'}
            height={'100%'}
            marginBottom={2}
            bgcolor={alpha(this.props.theme.palette.primary.main, 0.0)}
            color={this.props.theme.palette.primary.main}
          >
            <svg
              height={200}
              width={200}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>            
          </Box>
        </Box>      

        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
        >
          Password has been reset
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          Your password has been reset. Please login with that new password.     
        </Typography>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}>
          <Button
            size={'large'}
            variant={'outlined'}
            component={Link}
            href={'/login'}
          >
            Go to login page
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Success;

interface IProps {
  theme: Theme;
}
