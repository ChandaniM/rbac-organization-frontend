import axios from "axios";
import endpoints from '../../endpoints';
const BASE_URL = 'http://localhost:3000/api';

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
        `${BASE_URL}${endpoints.login}`,
      data
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login error");
  }
};
