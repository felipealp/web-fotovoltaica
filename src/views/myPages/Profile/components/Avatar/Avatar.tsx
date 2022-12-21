import React from 'react';
import MyAvatar from 'common/components/Avatar/Avatar';
import { Box, Button, Container, Input, Skeleton, Typography } from '@material-ui/core';

class Avatar extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    action: 'normal',
    status: 'loading',
    name: '',
    url: '',    
    msg: '', 
  }  

  componentDidMount() {
  
  }

  componentDidUpdate(prevProps: any) {      
    if (prevProps.name !== this.props.name || prevProps.url !== this.props.url) {
      this.setState({       
        name: this.props.name,  
        url: this.props.url,
        status: 'normal'  
      });        
    }      
  }  

  handleClick(e: React.FormEvent<HTMLButtonElement>) {
    console.log('change');
  }

  render() {
    return (
      <Box>
        <Box justifyContent={'center'} sx={this.state.status === 'loading' ? { display: 'flex' } : { display: 'none' }}>     
          <Box width={600} position="relative" zIndex={2}>            
            <Box justifyContent={'center'} display={'flex'} sx={{paddingBottom: '20px'}}>
              <Skeleton width={'30%'} height={40} />
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
              <Skeleton variant="circular" width={this.props.size} height={this.props.size} />
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
              <Skeleton width={'25%'} height={70} />
            </Box>
          </Box>           
        </Box>       
        
        <Container sx={this.state.status === 'normal' ? { display: 'block' } : { display: 'none' }}>
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
            <MyAvatar name={this.state.name} size={this.props.size} url={this.props.url} />
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
  url: string;
  size: number;
}

interface IForm {
  action: string,
  status: string,
  name: string,
  url: string,
  msg: string;
}

export default Avatar;