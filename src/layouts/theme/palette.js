import { light as lightGreen, dark as darkGreen } from './palette--green';

const palette = (themeMode = 'light', paletteType = 'green') => {
  return themeMode === 'dark' ? darkGreen : lightGreen;
};

export default palette;
