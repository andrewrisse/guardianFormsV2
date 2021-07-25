# Guardian Forms

## Uses Next.js

## How to use

```sh
npm install
npm run dev
```

### This project is connected to Travis CI. Pushes to master will trigger a build and will deploy a new dockerfile to
### dockerhub at andrewrisse/guardian-forms


## A .env.local file is required in the root of the project. It contains the keys for connecting to MongoDB.


## The api is contained in pages/api. Next.js creates an api based on the files in this folder. Serverless 
## turns the endpoints into Lambda functions


# Current Functionality:
## Create new survey
## Edit survey questions
## Delete questions
## View all surveys
