import React from 'react';
import { IconButton } from '@material-ui/core';
import InActiveIcon from '@material-ui/icons/VisibilityOff';
import BlockedIcon from '@material-ui/icons/Block';
import { red } from '@material-ui/core/colors';

const IsActive = ({ isactive, status }: IProps) => {
  
  if (status === 3)
  {
    return (
      <IconButton aria-label="blocked">
        <BlockedIcon sx={{ color: red[500] }} />
      </IconButton>
    );
  }  
  else if(! isactive) {  
    return (
      <IconButton aria-label="inactive">
        <InActiveIcon color="disabled" />
      </IconButton>
    );
  }
  else{
    return (<div></div>);
  }
};

interface IProps {
  isactive: boolean; 
  status: number;
}

export default IsActive;