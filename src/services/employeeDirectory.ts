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