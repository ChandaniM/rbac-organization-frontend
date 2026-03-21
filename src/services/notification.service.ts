import axios from "axios";
import endpoints from "../../endpoints";

const BASE_URL = "http://localhost:3000/api";

export const sendInviteEmail = async (
  token: string,
  payload: {
    to: string;
    event: string;
    data: Record<string, unknown>;
  }
) => {
  const response = await axios.post(
    `${BASE_URL}${endpoints.testEmail}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
