import React from 'react';
import MaterialAvatar from '@material-ui/core/Avatar';
import { stringToColor } from 'services/helpers/string.helper';

class Avatar extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};  

  stringAvatar(name: string, size: number, url: string) {
    if (url.length > 0) {
      return {
        src: url,       
      };
    }
    else {    
      return {
        sx: {
          bgcolor: stringToColor(name),         
        },      
      };
    }
  }

  render() {
    return (
      <MaterialAvatar {...this.stringAvatar(this.props.name, this.props.size, this.props.url)} sx={{width: this.props.size, height: this.props.size}} />
    );
  }
}

interface IProps {
  name: string;
  url: string;
  size: number;
}

export default Avatar;
