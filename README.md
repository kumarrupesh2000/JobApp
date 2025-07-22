# Job Application Project

This repository contains both the backend and frontend for a Job Application management system.

## Project Structure

```
JobApp-BackEnd/      # Spring Boot backend (Java, PostgreSQL)
JobApp-Frontend/     # React frontend
```

---

## Backend ([JobApp-BackEnd](JobApp-BackEnd/demo/pom.xml))

- **Tech Stack:** Java, Spring Boot, PostgreSQL, Maven
- **Location:** `JobApp-BackEnd/demo`

### Setup

1. **Configure Database:**
   - Ensure PostgreSQL is running.
   - Update credentials in [`application.properties`](JobApp-BackEnd/demo/src/main/resources/application.properties) if needed.

2. **Build & Run:**
   ```sh
   cd JobApp-BackEnd/demo
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

3. **API Endpoints:**
   - `GET /jobs` — List all jobs
   - `POST /jobs` — Add a job
   - `GET /jobs/{id}` — Get job by ID
   - `DELETE /jobs/{id}` — Delete job
   - `GET /load` — Load sample jobs

---

## Frontend ([JobApp-Frontend](JobApp-Frontend/job-app-frontend/package.json))

- **Tech Stack:** React, Axios, React Router
- **Location:** `JobApp-Frontend/job-app-frontend`

### Setup

1. **Install dependencies:**
   ```sh
   cd JobApp-Frontend/job-app-frontend
   npm install
   ```

2. **Run the app:**
   ```sh
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

3. **Usage:**
   - View, add, edit, and delete job listings.
   - Ensure the backend is running for API operations.

---

## Essential Notes

- **CORS:** The backend allows requests from `http://localhost:3000` for frontend integration.
- **Environment:** Java 17+, Node.js 14+ recommended.

---

## Contributing

Feel free to open issues or submit pull requests for improvements.

---

