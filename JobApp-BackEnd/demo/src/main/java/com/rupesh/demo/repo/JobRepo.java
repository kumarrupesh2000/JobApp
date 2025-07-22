package com.rupesh.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rupesh.demo.model.Jobs;

public interface JobRepo extends JpaRepository<Jobs, Integer> {
    // This interface will automatically provide CRUD operations for Jobs entity

}
