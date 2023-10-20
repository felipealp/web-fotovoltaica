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
      <Box>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
          textAlign={'center'}
        >
          Obrigado por inscrever-se
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          Para prosseguir com simulador de energia solar realize o login com os dados registrados.  
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={4}
          marginTop={4}
        >
          <Box height={'100%'} width={'100%'} maxWidth={230}>
            <GlobeIllustration height={'80%'} width={'100%'} />
          </Box>
        </Box>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}>
          <Button
            size={'large'}
            variant={'contained'}
            component={Link}
            href={'/login'}
          >
            Realizar Login
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
