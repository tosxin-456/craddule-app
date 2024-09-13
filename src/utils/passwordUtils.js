// signUpUtils.js
import API_BASE_URL from '../config/apiConfig';

export const sendOTP = async (data, setUserId, setLoading, setPage, navigate, toast) => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/sendotp`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      const responseData = await response.json();
      const { userId } = responseData.data;
      setUserId(userId)
      setLoading(false);
      setPage(2)
      toast.success('Check mail for the OTP sent')
    } else {
      const {error} = await response.json();
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  } catch (error) {
    setLoading(false);
    console.error('An error occurred:', error);
  }
};

export const confirmOTP = async (data, userId, setLoading, setPage, navigate, toast) => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/confirmotp/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setLoading(false);
      setPage(3)
    } else {
      const result = await response.json();
      setLoading(false);
      toast.error(result.error);
    }
  } catch (error) {
    setLoading(false);
    console.error('An error occurred:', error);
  }
};

export const resetPassword = async (data, userId, setLoading, setPage, navigate, toast) => {
  setLoading(true);
  try {
    if (data.password !== data.cpassword) {
      setLoading(false);
      toast.error('Passwords do not match');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/resetPassword/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      const { access_token } = responseData.data;
      localStorage.setItem('access_token', access_token);
      setLoading(false);
      setPage(3)
      navigate(`/card`);
    } else {
      const result = await response.json();
      setLoading(false);
      toast.error(result.error);
    }
  } catch (error) {
    setLoading(false);
    console.error('An error occurred:', error);
  }
};
