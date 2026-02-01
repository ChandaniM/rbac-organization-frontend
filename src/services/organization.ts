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

export const createOrg = async (
  authToken : any ,
  details: {
  org: {
    name: string;
    display_name?: string;
    description?: string;
    status?: string;
    created_by?: string;
  };
  user: {
    email: string;
    username: string;
    password: string;
  };
}) => {
  try {
    const url = `${BASE_URL}${endpoints.organizationwithuser}`;
    console.log("Create Org URL:", url);
    console.log("Payload:", details);

    const response = await axios.post(url, details, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data; // { success, data, message }
  } catch (error: any) {
    console.error(
      "Create Org Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllOrganizations = async (token: any) => {
  const url = `${BASE_URL}${endpoints.organizationData}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data; 
};