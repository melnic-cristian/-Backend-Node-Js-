## Installing

# A step-by-step series of examples that tell you how to get a development environment running.
## Setup on Local
1) Create a .env File:
      - Navigate to the root directory of the project.
      - Create a .env file if it does not exist.

2) Copy Data from dev.env:
      - Copy the contents of the dev.env file to your .env file.

3) Change Credentials:
      - Modify the necessary environment variables in the .env file to match your local setup.

4) Start the Application:
      -  Run the following commands in your terminal:

bash
 ```
   npm install
   npm run start
 ```        

  - Your application should now be running on localhost (or the port you specified).


## Setup with Docker

  1) Ensure Docker is Installed:
       - Make sure Docker and Docker Compose are installed on your machine.


  2) Change Credentials:
      - Modify the necessary environment variables in the docker-compose.yml file to match your local setup.


   3) Start the Application:
      -  Run the following commands in your terminal:

 bash
   ```
   docker-compose build
   docker-compose up
 ```        

Use Case 1: Getting IP Info

  Current Approach:

    You're making a GET request to http://localhost:3000/api/ip-lookup/user_ip.
    This seems to be designed to retrieve information about an IP address (user_ip).


Use Case 2: Removing/Deleting IP from Cache

Current Approach:

    Using Postman to send a DELETE request to http://localhost:3000/api/ip-lookup/cache/user_ip.
    It appears that this endpoint is designed to remove a specific IP from a cache.
     
