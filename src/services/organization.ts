import axios from "axios";
import endpoints from "../../endpoints";

const BASE_URL = "http://localhost:3000/api";

export const getOrgDetails = async () => {
  try {
    const url = `${BASE_URL}${endpoints.organizationwithuser}`;
    console.log("URL:", url);

    const response = await axios.get(url);
    console.log(response)
    return {
      orgs: response.data.data,
      pagination: response.data.pagination ?? null,
    };
  } catch (error: any) {
    console.error(
      "Fetch Org Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
