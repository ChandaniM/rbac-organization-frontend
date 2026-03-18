import axios from "axios";
import { ModifyData } from "../utils/helper";
const BASE_URL = 'http://localhost:3000/api';

const mapUserToViewModel = (user: any) => ({
  id: user._id,
  name: user.username,
  email: user.email,
  isActive: user.is_active,
  emailVerified: user.email_verified,
  createdAt: user.created_at,
  jobTitle: user.job_title || "",
  department: user.department || "",
  location: user.location || "",
  phone: user.phone || "",
  businessUnit: user.business_unit || "",
  avatar: user.avatar || "",
});

const mapUsersToViewModel = (users: any[]) => users.map(mapUserToViewModel);

export const getAllEmployees = async (page:number,limit:number,search:string) => {
    try {
        const params: any = { page, limit };
        if (search && search.trim() !== "") {
            params.search = search;
        }
        const response = await axios.get(`${BASE_URL}/getJob`, {
            params,
          });
      
          return {
            jobs: ModifyData(response.data.data),
            pagination: response.data.pagination,
          };
      
    } catch (error:any) {
        console.error("Fetch Error:", error.response?.data || error.message);
        throw error;
        
    }
};

export const getAllUsers = async (
    tenantId: string,
    page: number,
    limit: number,
    search: string
  ) => {
    try {
      const params: any = { page, limit };
  
      if (search && search.trim() !== "") {
        params.search = search;
      }
  
      const response = await axios.get(
        `${BASE_URL}/${tenantId}/users`,
        { params }
      );
  
      return {
        users: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error: any) {
      console.error(
        "Fetch Users Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

// UI-friendly: returns mapped view model + pagination
export const getUsersByTenant = async (
  tenantId: string,
  page: number,
  limit: number,
  search: string
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const params: any = { page, limit };
  if (search && search.trim() !== "") params.search = search;

  const response = await axios.get(`${BASE_URL}/${tenantId}/users`, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    users: mapUsersToViewModel(response.data.data),
    pagination: response.data.pagination,
  };
};

export const createUser = async (tenantId: string, payload: any) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await axios.post(`${BASE_URL}/${tenantId}/users`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
  export const updateUser = async (
    tenantId: string,
    userId: string,
    payload: any
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.put(
        `${BASE_URL}/${tenantId}/users/${userId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Update User Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  export const deleteUser = async (
    tenantId: string,
    userId: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.delete(
        `${BASE_URL}/${tenantId}/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Delete User Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
    