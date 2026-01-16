import axios from 'axios';
import endpoints from '../../endpoints';
import { ModifyData } from '../utils/helper';

const BASE_URL = 'http://localhost:3000/api';

export const getAllJobs = async ( tenantId: string, page = 1, limit = 10 , search:string) => {
    try {
    const params: any = { page, limit };
    if (search && search.trim() !== "") {
        params.search = search;
    }   
    console.log("URL : " , `${BASE_URL}/${tenantId}${endpoints.getAllJobs}`)
      const response = await axios.get(`${BASE_URL}/${tenantId}${endpoints.getAllJobs}`, {
        params,
      });
  
      return {
        jobs: ModifyData(response.data.data),
        pagination: response.data.pagination,
      };
    } catch (error: any) {
      console.error("Fetch Error:", error.response?.data || error.message);
      throw error;
    }
  };
  
// 2. CREATE A NEW JOB
export const createJob = async (tenantId :string, jobData:any) => {
    try {
        const response = await axios.post(`${BASE_URL}/${tenantId}${endpoints.addNewJob}`, jobData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error:any) {
        console.error("Create Error:", error.response?.data || error.message);
        throw error;
    }
};

// 3. DELETE A JOB
export const deleteJob = async (tenantId :string , jobId:string) => {
    try {
        console.log(`${BASE_URL}/${tenantId}/${jobId}` , "deleteJob");
        const response = await axios.delete(`${BASE_URL}/${tenantId}/${jobId}`);
        return response.data;
    } catch (error:any) {
        console.error("Delete Error:", error.response?.data || error.message);
        throw error;
    }
};

// 4. UPDATE A JOB (e.g., Change status to 'Closed')
export const updateJob = async (tenantId : string , jobId:string, updateData:any) => {
    try {
        const response = await axios.put(`${BASE_URL}/${tenantId}/${jobId}`, updateData);
        return response.data;
    } catch (error:any) {
        console.error("Update Error:", error.response?.data || error.message);
        throw error;
    }
};