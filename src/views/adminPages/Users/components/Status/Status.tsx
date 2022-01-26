import React from 'react';
import InActiveIcon from '@material-ui/icons/VisibilityOff';
import BlockedIcon from '@material-ui/icons/Block';

const Status = ({ status }: IProps) => {
  
  if (status === 3)
  {
    return (      
      <BlockedIcon color="disabled" />     
    );
  }  
  else if(status === 4) {  
    return (      
      <InActiveIcon color="disabled" />     
    );
  }
  else{
    return (<div></div>);
  }
};

interface IProps {
  status: number;
}

export default Status;