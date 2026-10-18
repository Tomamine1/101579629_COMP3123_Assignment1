# COMP3123 – Assignment 1
## Rate Limiting Documentation

**Student Name:** Mohamed Amine OUATAR  
**Student ID:** 101579629  
**Course:** COMP3123

### 1. What Is Rate Limiting?
Rate limiting restricts the number of requests a user can make within a specific time period. It helps prevent abuse and protects the API.

### 2. Which Endpoints Are Protected?
The following endpoints are protected:
- `POST /api/v1/user/signup`
- `POST /api/v1/user/login`

Each endpoint allows up to **10 attempts every 15 minutes**.

### 3. What Happens When the Limit Is Exceeded?
When the limit is exceeded, the API returns **429 Too Many Requests** and displays an error message asking the user to try again later.

### 4. Rate Limiting Test Result
I tested the login endpoint using Postman by sending repeated requests. After exceeding the limit, the API returned **429 Too Many Requests**, confirming that rate limiting works correctly.