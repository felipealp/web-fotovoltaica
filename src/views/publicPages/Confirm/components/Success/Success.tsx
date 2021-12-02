/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';

class Success extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  componentDidMount() { } 

  public handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();    

    // this.setState({ action: 'processing' });  
    this.props.callback();  
  }    

  render() {
    return (
      <Box>
        <Box marginBottom={4}>          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Success
          </Typography>
          <Typography color="text.secondary">
            Enter the confirmation code below we'll get your account activated.
          </Typography>
        </Box>        
      </Box>
    );
  }
}

export default Success;

interface IProps {
  callback: () => void;
  theme: Theme;
}
