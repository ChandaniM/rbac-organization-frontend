import axios from "axios";
import endpoints from "../../endpoints";


const BASE_URL = 'http://localhost:3000/api';

export const getOrgDetails = async (tenantId: string,)=>{
    try {
        console.log("URL : " , `${BASE_URL}/${tenantId}${endpoints.getAllJobs}`)
          const response = await axios.get(`${BASE_URL}/${tenantId}${endpoints.getAllJobs}`);
          return {
            jobs: response.data.data,
            pagination: response.data.pagination,
          };
        } catch (error: any) {
          console.error("Fetch Error:", error.response?.data || error.message);
          throw error;
        }
}