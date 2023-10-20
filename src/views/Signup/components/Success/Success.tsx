/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';
import GlobeIllustration from '../../../../layouts/svg/illustrations/Globe';
import { Theme } from '@material-ui/core/styles';

class Success extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  componentDidMount() { }

  render() {
    return (
      <Box marginBottom={4}>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
        >
          Thank you for signing up
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          We are sending you an email to confirm that you are you. Click that link to finalize the sign up process and get started.  
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={4}
          marginTop={4}
        >
          <Box height={'100%'} width={'100%'} maxWidth={600}>
            <GlobeIllustration height={'100%'} width={'100%'} />
          </Box>
        </Box>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}>
          <Button
            size={'large'}
            variant={'contained'}
            component={Link}
            href={'../secure/home'}
          >
            Back to home page
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
