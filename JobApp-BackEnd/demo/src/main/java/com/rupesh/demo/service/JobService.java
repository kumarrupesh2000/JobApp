package com.rupesh.demo.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.rupesh.demo.model.Jobs;
import com.rupesh.demo.repo.JobRepo;

@Component
public class JobService {

    @Autowired
    private JobRepo repo;
    public List<Jobs> getAllJobs() {
        return repo.findAll();
    }


    public void addJob(Jobs job) {
        repo.save(job);
    }


    public Jobs getJobById(int jobId) {
        return repo.findById(jobId).orElse(null);
    }


    public void deleteJob(int jobId) {
        repo.deleteById(jobId);
    }

    public void loadJob(){
        List<Jobs> jobs = new ArrayList<>(Arrays.asList(
            new Jobs(1, "Software Engineer", "Develop and maintain software applications", "New York", "2-5 years", Arrays.asList("Java", "Spring Boot", "SQL")),
            new Jobs(2, "Data Scientist", "Analyze data and build predictive models", "San Francisco", "3-6 years", Arrays.asList("Python", "Machine Learning", "Statistics")),
            new Jobs(3, "DevOps Engineer", "Manage infrastructure and deployment pipelines", "Austin", "4-7 years", Arrays.asList("Docker", "Kubernetes", "AWS"))
        ));
        repo.saveAll(jobs);

    }


    


    




}
