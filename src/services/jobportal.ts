import axios from 'axios';
import endpoints from '../../endpoints';
import { ModifyJobData } from '../utils/helper';

const BASE_URL = 'http://localhost:3000/api';

export const getAllJobs = async (page = 1, limit = 10 , search:string) => {
    try {
    const params: any = { page, limit };
    if (search && search.trim() !== "") {
        params.search = search;
    }
      const response = await axios.get(`${BASE_URL}/getJob`, {
        params,
      });
  
      return {
        jobs: ModifyJobData(response.data.data),
        pagination: response.data.pagination,
      };
    } catch (error: any) {
      console.error("Fetch Error:", error.response?.data || error.message);
      throw error;
    }
  };
  
// 2. CREATE A NEW JOB
export const createJob = async (jobData:any) => {
    try {
        const response = await axios.post(`${BASE_URL}${endpoints.addNewJob}`, jobData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error:any) {
        console.error("Create Error:", error.response?.data || error.message);
        throw error;
    }
};

// 3. DELETE A JOB
export const deleteJob = async (jobId:string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${jobId}`);
        return response.data;
    } catch (error:any) {
        console.error("Delete Error:", error.response?.data || error.message);
        throw error;
    }
};

// 4. UPDATE A JOB (e.g., Change status to 'Closed')
export const updateJob = async (jobId:string, updateData:any) => {
    try {
        const response = await axios.put(`${BASE_URL}/${jobId}`, updateData);
        return response.data;
    } catch (error:any) {
        console.error("Update Error:", error.response?.data || error.message);
        throw error;
    }
};