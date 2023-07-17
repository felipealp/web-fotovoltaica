/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';

class CoreInformation extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    name: '',
    email: '',
    action: 'normal',
    status: 'loading',
    message: '',
    blurErrors: [],
  }

  componentDidMount() {
    console.log('componentDidMount');
  }  
  
  render() {
    return (
      <Box>
        <Box>Core information</Box>
      </Box>
    );
  }
}

export default CoreInformation;

interface IProps {
  theme: Theme;
  id: string;
}

interface IForm {
  name: string,
  email: string,
  action: string,
  status: string,
  //data: IMyProfile | null,
  message: string;
  blurErrors: string[],
}