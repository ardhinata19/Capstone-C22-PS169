# CLOUD COMPUTING

Cloud Computing design the architecture for Google Cloud and build an environment to store resources and provide servers to perform processes on google cloud services. We use the Compute Engine service to deploy backend services. Then we create a database with Posgresql using Cloud Sql services to integrate and control the input and output of processes on the server and create a Rest Api with the Hapi framework to simplify communication between the database and android to serve input and output data.

##Architecture GCP
![alternate text](./img/GCP%20arsitektur%20capstone.jpg)

## Dependencies

~ [hapi](https://www.npmjs.com/package/@hapi/hapi)
~ [nodemon](https://www.npmjs.com/package/nodemon)
~ [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate)
~ [pg](https://www.npmjs.com/package/pg)
~ [joi](https://www.npmjs.com/package/joi)
~ [nanoid](https://www.npmjs.com/package/nanoid)
~ [jWT](https://www.npmjs.com/package/@hapi/jwt)
~ [bcrypt](https://www.npmjs.com/package/bcrypt)
~ [dotenv](https://www.npmjs.com/package/dotenv)


## Deploy Backend Service
* Creating a Postgresql database in Cloud Sql
* Setting PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT in .Env file
```
    # database
    PGUSER= <database username>
    PGHOST= <database host>
    PGPASSWORD= <database password>
    PGDATABASE= <database name>
    PGPORT= <database port>
 ```
* Create a firewall rule that allows port 8989
* Create a Instance on Compute Engine and clone repository [github](https://github.com/ardhinata19/Capstone-C22-PS169.git)
* Install all dependencies and deploy backend service
* Testing backend service connection in Postman : [Documentation](https://blue-rocket-370020.postman.co/workspace/fitid-project~d7938928-6317-4e43-a6e5-a07d7c2de6b1/overview)

##Contributors

####[Ardhi Nata](https://github.com/ardhinata19) -  (C2240F2150)
####[Abhista Rizqi Ramadan](https://github.com/sibeha) - (C7009G0946)
