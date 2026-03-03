import axios from "axios";
import { ModifyData } from "../utils/helper";
const BASE_URL = 'http://localhost:3000/api';

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
  export const updateUser = async (
    tenantId: string,
    userId: string,
    payload: any
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${tenantId}/users/${userId}`,
        payload
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
      const response = await axios.delete(
        `${BASE_URL}/${tenantId}/users/${userId}`
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
    