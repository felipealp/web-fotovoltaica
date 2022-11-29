import React from 'react';
import MyAvatar from '@material-ui/core/Avatar';
import { Box, Button, Container, Input, Skeleton, Typography } from '@material-ui/core';
import { stringToColor } from 'helpers/string.helper';
import { IMyProfile } from 'interfaces/user.profile.interfaces';

class Avatar extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    action: 'loading',
    errorMsg: '',
    data: [],
  }

  stringAvatar(name: string, size: number) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size,
        height: size,
      },
      //children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  handleClick(e: React.FormEvent<HTMLButtonElement>) {
    console.log('change');
  }

  render() {
    return (
      <Box>
        <Box justifyContent={'center'} sx={this.state.action === 'loading' ? { display: 'flex' } : { display: 'none' }}>     
          <Box width={600} position="relative" zIndex={2}>            
            <Box justifyContent={'center'} display={'flex'} sx={{paddingBottom: '20px'}}>
              <Skeleton width={'30%'} height={40} />
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
              <Skeleton variant="circular" width={300} height={300} />
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
              <Skeleton width={'25%'} height={70} />
            </Box>
          </Box>           
        </Box>       
        
        <Container sx={this.state.action === 'normal' ? { display: 'block' } : { display: 'none' }}>
          <Box position="relative" zIndex={2} >
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
              }}
              gutterBottom
              color={'textSecondary'}
              align={'center'}
              paddingBottom={'20px'}
            >
              Avatar
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <MyAvatar {...this.stringAvatar(this.props.name, 300)} />
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ paddingTop: '20px' }}>
            <label htmlFor="upload-photo">
              <Input
                id="upload-photo"
                name="upload-photo"
                type="file"
                style={{ display: 'none' }}
                onChange={(e: any) => this.handleClick(e)}
              />
              <Button variant="contained" component="span">Change avatar</Button>
            </label>
          </Box>
        </Container>
      </Box>
    );
  }
}

interface IProps {
  name: string;
  size: number;
}

interface IForm {
  action: string,
  errorMsg: string;
  data: IMyProfile[],
}

export default Avatar;