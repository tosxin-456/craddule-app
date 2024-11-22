// signUpUtils.js
import {API_BASE_URL} from '../config/apiConfig';
import { toast } from 'sonner';

export const handleTogglePassword = (showPassword, setShowPassword) => {
  setShowPassword(!showPassword);
};

export const handleToggleCPassword = (showCPassword, setShowCPassword) => {
  setShowCPassword(!showCPassword);
};

export const validatePassword = (password, setPasswordValid) => {
  const length = password.length >= 8;
  const number = /\d/.test(password);
  const capital = /[A-Z]/.test(password);
  const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  setPasswordValid({ length, number, capital, special });
};

export const createUser = async (data, referralCode, setLoading, toast, navigate) => {
  setLoading(true);
  try {
    if (data.password !== data.cpassword) {
      setLoading(false);
      toast.error('Passwords do not match');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/user/${referralCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      const { access_token, id } = responseData.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('id', id);
      setLoading(false);
      navigate(`/home`);
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
