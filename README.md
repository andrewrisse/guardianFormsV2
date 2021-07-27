# Guardian Forms

## client: React project
## backend: Node.JS/Express

## How to use

```sh
cd server
yarn install
yarn start
```
### In New Terminal

```sh
cd client
yarn install
yarn start
```

## Deployed on AWS via kubernetes.

# Note: Frontend deployed on Kubernetes does not run due to need to run it over https for auth0 to work.
# I believe this is outside the scope of the project, so please note that kubernetes is configured correctly
# to serve the frontend. Run the app locally to see authentication working

## Frontend: http://a0286a493619f45fa8d84a25fb6163cf-1686302866.us-east-2.elb.amazonaws.com
## Backend: http://a794faa41dceb4715a81f2c900e3e04f-173631228.us-east-2.elb.amazonaws.com

### This project is connected to Travis CI. Pushes to master will trigger a build and will deploy new dockerfiles to:
#### dockerhub at andrewrisse/guardian-forms
#### dockerhub at andrewrisse/guardian-forms-api

### There is also a reverse-proxy docker image, but it does not get auto-deployed. It also isn't necessary to use a 
### reverse proxy because there is only one backend running


### To run locally .env files are required in the root of client and backend folders. 



## Current Functionality:
### Create new survey
### Edit survey questions
### Delete questions
### View all surveys
