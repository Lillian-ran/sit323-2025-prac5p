# Calculator Microservice (Enhanced Error Handling)

## Overview
This microservice extends the functionality of the simple calculator from Task 4.1P by implementing enhanced error handling. It provides clear and standardized error responses for invalid inputs, missing parameters, and edge cases like division by zero.

---

## Environment Setup
1. **Install Node.js**  
   Download and install the LTS version from [Node.js Official Website](https://nodejs.org/en/download/).  
   Verify installation:
   node -v
   npm -v
2.**Clone the Repository**
git clone https://github.com/Lillian-ran/sit323-2025-prac4c.git
cd sit323-2025-prac4c
3.**Install Dependencies**
npm install

Running the Service
Start the microservice:
node app.js
The service will run at http://localhost:3000.

## API Endpoints
### Basic Arithmetic Operations
| Endpoint      | Parameters          | Example Request                     | Example Response           |
|---------------|---------------------|-------------------------------------|----------------------------|
| **GET /add**  | `num1`, `num2`      | `/add?num1=5&num2=3`               | `{ "result": 8 }`          |
| **GET /subtract** | `num1`, `num2`  | `/subtract?num1=10&num2=4`         | `{ "result": 6 }`          |
| **GET /multiply** | `num1`, `num2`  | `/multiply?num1=5&num2=3`          | `{ "result": 15 }`         |
| **GET /divide**   | `num1`, `num2`  | `/divide?num1=10&num2=2`           | `{ "result": 5 }`          |

---

## Enhanced Error Handling
### Error Response Format
All errors return a standardized JSON response:
{
  "status": 400,
  "message": "Error description"
}

### Error Scenarios
| Error Type               | Example Request                 | Status Code | Response Message                                                                 |
|--------------------------|----------------------------------|-------------|----------------------------------------------------------------------------------|
| **Missing Parameters**   | `/add?num1=5`                   | 400         | `Missing required parameters: 'num1' and 'num2'`                                |
| **Invalid Numbers**      | `/add?num1=5&num2=abc`          | 400         | `Invalid input: 'num2' is not a valid number (received 'abc')`                  |
| **Division by Zero**     | `/divide?num1=10&num2=0`        | 422         | `Division by zero is not allowed`                                               |
| **Invalid Endpoint**     | `/invalid`                      | 404         | `Endpoint not found. Valid endpoints: /add, /subtract, /multiply, /divide`      |


## Testing Examples
### Valid Request
curl "http://localhost:3000/add?num1=10&num2=5"
# Response: { "result": 15 }


### Error Cases
1. **Missing Parameter**  

   curl "http://localhost:3000/add?num1=5"
   # Response: { "status": 400, "message": "Missing required parameters: 'num1' and 'num2'" }


2. **Invalid Number**  

   curl "http://localhost:3000/multiply?num1=5&num2=abc"
   # Response: { "status": 400, "message": "Invalid input: 'num2' is not a valid number (received 'abc')" }


3. **Division by Zero**  

   curl "http://localhost:3000/divide?num1=10&num2=0"
   # Response: { "status": 422, "message": "Division by zero is not allowed" }


4. **Invalid Endpoint**  

   curl "http://localhost:3000/invalid"
   # Response: { "status": 404, "message": "Endpoint not found. Valid endpoints: /add, /subtract, /multiply, /divide" }


### **Key Updates**
1. Standardized error responses with `status` and `message` fields.
2. Clear documentation for error scenarios and testing examples.
3. Simplified setup and usage instructions in English.