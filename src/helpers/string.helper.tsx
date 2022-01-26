
export const stringToColor = (string: string) => {
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
};

export const formatDate = (value: Date | null, empty: string = 'None'): string => {
  
  if (value == null) {
    return empty;
  }
  
  const date_value = new Date(value);
  
  if (isNaN(date_value.getTime())) {
    return empty;
  }
  
  const new_date: string = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',   
  }).format(date_value);

  return new_date;  
};