# Serverless-Koa-Boilerplate

This boilerplate helps you quickly create the koa-based serverless app.

## Stack 

* MongoDB
* Koa
* Serverless-http

## Feature

* Simple User Signup/login 
* JWT Based Authentication

## How to Use

Clone this project 

`https://github.com/y0c/serverless-koa-boilerplate.git`

Install yarn module 

`yarn`

Write Configuration file to `src/config/env/env.json`

```javascript
//Sample Use 
{
    //development config
    "dev" : {
        "jwtSecret" : "",
        "hashSecret" : "",
        "mongoUrl" : "",
        //starting local server port
        "port": ""
    },
    //production config
    "prod" : {
        "jwtSecret" : "",
        "hashSecret" : "",
        "mongoUrl" : ""
    }
}
```

It will be selected according to the serverless stage value


reset pacakge.json & serverless.yml 

`npm init & serverless create -t aws-nodejs`

## Scripts

* `yarn start` - starting local server
* `yarn deploy` - deploy aws lambda (prod stage)
* `yarn deploy:dev` - deploy aws lambda(dev stage)

## License

MIT 

