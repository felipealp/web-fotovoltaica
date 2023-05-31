import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { CoreInformation } from './components';
import { IStandardApiResponse } from 'interfaces/api-response.interface';
import CourseService from 'services/course.service';

const Course = () => {
  const theme: any = useTheme();
  const id : string = '0a682b57-bad8-4fdb-b2e5-a662bd1b3d12';
  
  return (<Box>
    <Box bgcolor={theme.palette.alternate.main} position={'relative'}>
      <Container position="relative" zIndex={2}>
        <CoreInformation theme={theme} id={id} />
      </Container>
    </Box>    
  </Box>
  );
};

export default Course;
