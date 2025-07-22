import React, { useEffect, useState } from 'react';
import { getAllJobs, deleteJob, addJob, updateJob } from '../services/jobService';
import './JobList.css';

const initialFormState = {
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    experience: '',
    salary: '',
};

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [editId, setEditId] = useState(null);

    const fetchJobs = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await deleteJob(jobId);
                setJobs(jobs.filter(job => job.jobId !== jobId));
            } catch (err) {
                alert('Failed to delete job: ' + err.message);
            }
        }
    };

    const handleEdit = (job) => {
        setFormData({
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            jobLocation: job.jobLocation,
            experience: job.experience,
            salary: job.salary || '',
        });
        setEditId(job.jobId);
        setShowForm(true);
    };

    const handleAdd = () => {
        setFormData(initialFormState);
        setEditId(null);
        setShowForm(true);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateJob(editId, formData);
                await fetchJobs(); // Refresh the list from backend
            } else {
                const newJob = await addJob(formData);
                setJobs([...jobs, newJob]);
            }
            setShowForm(false);
        } catch (err) {
            alert('Failed to save job: ' + err.message);
        }
    };

    if (loading) {
        return <div className="joblist-container">Loading jobs...</div>;
    }

    if (error) {
        return <div className="joblist-container">Error fetching jobs: {error}</div>;
    }

    return (
        <div className="joblist-container">
            <button className="joblist-btn add" onClick={handleAdd}>+ Add Job</button>
            <h2 className="joblist-title">Job List</h2>
            <ul className="joblist-list">
                {jobs.map((job) => (
                    <li key={job.jobId} className="joblist-card">
                        <div className="joblist-button-group">
                            <button
                                className="joblist-btn"
                                onClick={() => handleEdit(job)}
                                title="Edit"
                            >
                                ✏️
                            </button>
                            <button
                                className="joblist-btn delete"
                                onClick={() => handleDelete(job.jobId)}
                                title="Delete"
                            >
                                🗑️
                            </button>
                        </div>
                        <h3 style={{ margin: 0, color: '#1976d2' }}>{job.jobTitle}</h3>
                        <p><strong>Description:</strong> {job.jobDescription}</p>
                        <p><strong>Location:</strong> {job.jobLocation}</p>
                        <p><strong>Experience:</strong> {job.experience}</p>
                        {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
                    </li>
                ))}
            </ul>

            {showForm && (
                <div className="joblist-form-modal" onClick={() => setShowForm(false)}>
                    <form
                        className="joblist-form"
                        onClick={e => e.stopPropagation()}
                        onSubmit={handleFormSubmit}
                    >
                        <label>
                            Title
                            <input
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Description
                            <textarea
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Location
                            <input
                                name="jobLocation"
                                value={formData.jobLocation}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Experience
                            <input
                                name="experience"
                                value={formData.experience}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Salary
                            <input
                                name="salary"
                                value={formData.salary}
                                onChange={handleFormChange}
                                type="number"
                                min="0"
                            />
                        </label>
                        <div className="joblist-form-actions">
                            <button className="joblist-btn" type="submit">
                                {editId ? 'Update' : 'Add'}
                            </button>
                            <button
                                className="joblist-btn delete"
                                type="button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default JobList;