export const configData = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
});

export const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-type': 'application/json; charset=UTF-8',
  }
});
