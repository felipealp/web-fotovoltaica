import React from 'react';
import MyAvatar from '@material-ui/core/Avatar';
import { Box, Button, Input, Typography } from '@material-ui/core';
import { stringToColor } from 'helpers/string.helper';


function stringAvatar(name: string, size: number) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
    },
    //children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function handleClick(e: React.FormEvent<HTMLButtonElement>)
{
  console.log('change');
}

const Avatar = ({ name, role, size = 300 }: IProps) => {
  return (
    <Box>
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
        <MyAvatar {...stringAvatar(name, size)} />
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ paddingTop: '20px' }}>
        <label htmlFor="upload-photo">
          <Input
            id="upload-photo"
            name="upload-photo"
            type="file"     
            style={{ display: 'none' }}       
            onChange={(e: any) => handleClick(e)}
          />
          <Button variant="contained" component="span">Change avatar</Button>
        </label>
      </Box>
    </Box>
  );
};

interface IProps {
  name: string;
  role: string;
  size?: number;
}

export default Avatar;