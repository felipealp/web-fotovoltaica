/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Link, Stack } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { alpha } from '@material-ui/core';

class Error extends React.Component<IProps, {}> {
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
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
          Houston, we have a problem...
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          {this.props.message}     
        </Typography>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}>
          <Stack spacing={2} direction="row">            
            <Button
              size={'large'}
              variant={'contained'}
              component={Link}
              href={'/send-code'}
            >
              Resend code
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default Error;

interface IProps {
  theme: Theme;
  message: string;
}
