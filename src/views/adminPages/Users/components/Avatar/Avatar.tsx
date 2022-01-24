import React from 'react';
import MyAvatar from '@material-ui/core/Avatar';
import { Box, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, size: number) {
  return {
    sx: {
      bgcolor: stringToColor(name),    
      width: size,
      height: size,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Avatar = ({ name, role, size = 40 }: IProps) => {
  return (
    <Box component={ListItem} disableGutters width={'auto'}>
      <ListItemAvatar>
        <MyAvatar {...stringAvatar(name, size)} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={role}
      />
    </Box>
  );
};

interface IProps {
  name: string;
  role: string;
  size?: number;
}

export default Avatar;