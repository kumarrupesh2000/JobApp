import axios from 'axios';
// Add at the end of jobService.js

const API_URL = 'http://localhost:8080/jobs';

export const getAllJobs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching jobs: ' + error.message);
    }
};

export const getJobById = async (jobId) => {
    try {
        const response = await axios.get(`${API_URL}/${jobId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching job: ' + error.message);
    }
};

export const addJob = async (job) => {
    try {
        const response = await axios.post(API_URL, job);
        return response.data;
    } catch (error) {
        throw new Error('Error adding job: ' + error.message);
    }
};

export const deleteJob = async (jobId) => {
    try {
        await axios.delete(`${API_URL}/${jobId}`);
    } catch (error) {
        throw new Error('Error deleting job: ' + error.message);
    }
};

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await axios.put(`${API_URL}/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating job: ' + error.message);
    }
};
// Add at the end of jobService.js
