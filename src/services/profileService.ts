import axios from "axios";

export const updateProfileService = async (data: {
  username: string;
}) => {
  const token = localStorage.getItem("token");

  return axios.put(
    "http://localhost:3000/api/user/profile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
