export const RefreshToken = async (axiosInstance) => {
  // 1. Get the refresh token from local storage.
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    // If there's no refresh token, we can't do anything.
    // Rejecting this promise will let the interceptor's `catch` block handle the failure.
    return Promise.reject(new Error("No refresh token available"));
  }

  // 2. Make the API call to the refresh endpoint.
  // The correct structure for a POST request is: post(URL, data, config)
  // We send `null` for the data/body and put the headers in the config object.
  const response = await axiosInstance.post('/auth/refresh', null, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  });

  return response;
};
