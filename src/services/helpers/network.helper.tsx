
export const fetchIpAddress = async () => {
  try {
    const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0');
    return response.json();
  } catch (error) {
    return (error);
  }
};