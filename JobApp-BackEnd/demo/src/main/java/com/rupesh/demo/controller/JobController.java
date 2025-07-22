package com.rupesh.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rupesh.demo.model.Jobs;
import com.rupesh.demo.service.JobService;
import org.springframework.web.bind.annotation.PostMapping;





@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JobController {
    @Autowired
    private JobService service;
    @GetMapping("/")
    public String home(){
        return "Welcome to Job Application";
    }

    @GetMapping("/jobs")
    public List<Jobs>jobs(){
        return service.getAllJobs();
        
    }

    @GetMapping("/load")
    public String loadJobs(){
        service.loadJob();
        return "Jobs loaded successfully";
    }

    // Will work for
    @PostMapping("/jobs")
    public List<Jobs> postMethodName(@RequestBody Jobs job) {
        service.addJob(job);
        
        return service.getAllJobs();
    }

    @GetMapping("jobs/{param}")
    public  Jobs getJobbyId(@PathVariable("param") int param) {

        return service.getJobById(param);
       
        
    }

    @DeleteMapping("/jobs/{jobId}")
    public String deleteJob(@PathVariable int jobId){
        Jobs job = service.getJobById(jobId);
        if (job != null) {
            service.deleteJob(jobId);
            return "Job with ID " + jobId + " deleted successfully.";
        } else {
            return "Job with ID " + jobId + " not found.";
        }
    }
    

    

}
