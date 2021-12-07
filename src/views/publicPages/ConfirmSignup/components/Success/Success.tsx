/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';
import TravelIllustration from '../../../../../svg/illustrations/Travel';

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
          Confirmation complete
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          Your account confirmation is complete
          <br />
          We look forward to working together
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={4}
          marginTop={4}
        >
          <Box height={'100%'} width={'100%'} maxWidth={600}>
            <TravelIllustration height={'100%'} width={'100%'} />
          </Box>
        </Box>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}>
          <Button
            size={'large'}
            variant={'contained'}
            component={Link}
            href={'../secure/home'}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Success;

interface IProps { }
