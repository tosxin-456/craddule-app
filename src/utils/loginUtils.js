// utils.js
import { API_BASE_URL } from '../config/apiConfig.js';

export const handleTogglePassword = (showPassword, setShowPassword) => {
  setShowPassword(!showPassword);
};

export const login = async (data, setLoading, navigate, rememberMe, toast) => {
  setLoading(true);
  console.log(API_BASE_URL);
  try {
    const response = await fetch(API_BASE_URL + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      const { token } = responseData;
      console.log(responseData);

      if (responseData.user.status === 'deactivated') {
        toast.error("This Account has been Deactivated");
      } else {
        if (rememberMe) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("password", data.password);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }

        localStorage.setItem("paid", responseData.user.authCode);
        localStorage.setItem("gottenThrough", responseData.user.howDidYouKnowUs || false);
        localStorage.setItem('access_token', token);

        // Navigate based on the 'paid' value
        if (responseData.user.authCode) {
          navigate(`/home`);
        } else {
          navigate(`/card`);
        }
      }
    } else {
      const result = await response.json();
      toast.error(result.error);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    setLoading(false);
  }
};

